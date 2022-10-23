#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EnvironmentVariables, gRPCStepRequest, HTTPStepRequest, HTTPStepResponse, runFromFile, StepResult, TestResult, WorkflowResult } from '@stepci/runner'
import exit from 'exit'
import chalk from 'chalk'
import os from 'os'
import { EventEmitter } from 'node:events'
import { PostHog } from 'posthog-node'
import { randomUUID } from 'crypto'
import ci from 'ci-info'
import isDocker from 'is-docker'
import Conf from 'conf'
import { labels } from './labels.json'
import { checkOptionalEnvArrayFormat, parseEnvArray } from './lib/utils'

const config = new Conf()
const posthog = new PostHog(
  'phc_SIwnNDitjnc44ozMtjud1Uz1wXb4cgM63MhtWy1mL2O',
  { host: 'https://eu.posthog.com' }
)

if (!process.env.STEPCI_DISABLE_ANALYTICS) {
  if (!config.get('uid')) config.set('uid', randomUUID())
  const uid = config.get('uid')

  posthog.capture({
    distinctId: uid as string,
    event: 'ping',
    properties: {
      os: os.type(),
      node: process.version,
      version: '2.3.x',
      environment: ci.isCI ? ci.name : isDocker() ? 'Docker' : 'Local'
    }
  })
}

const ee = new EventEmitter()
ee.on('test:result', (test: TestResult) => {
  test.steps.forEach(renderStep)
  console.log('\n' + (test.passed ? chalk.green('✔ ') : chalk.red('✕ ')) + chalk.white(test.name || test.id) + ' ' + (test.passed ? 'passed' :'failed') + ' in ' + test.duration / 1000 + 's')
})

ee.on('workflow:result', ({ workflow, result, path }: WorkflowResult) => {
  console.log('\n' + (result.passed ? chalk.green('✔ ') : chalk.red('✕ ')) + chalk.white(workflow.name) + ' (' + chalk.gray(path) + ') ' + (result.passed ? 'passed' :'failed') + ' in ' + result.duration / 1000 + 's')
  if (!result.passed) exit(5)
})

// Render output
function renderStep (step: StepResult) {
  console.log('\n' + chalk.bgWhite.bold.black(` ${step.name} `) + (step.passed ? chalk.bgGreenBright.bold(' PASSED ') : chalk.bgRed.bold(' FAILED ')) + ' in ' + step.duration / 1000 + 's')

  if (step.errored || step.skipped) {
    return console.log('\n' + chalk.yellow('⚠︎ ') + (step.errorMessage || 'Step was skipped') + '\n')
  }

  console.log(chalk.bold('\nRequest\n'))

  if (step.type === 'http') {
    const stepRequest = step.request as HTTPStepRequest
    const stepResponse = step.response as HTTPStepResponse
    console.log(chalk.bgWhite.bold(` ${stepRequest?.method} `) + ' ' + stepRequest.url + ' ' + chalk.bgGray.bold(` ${stepResponse.status} ${stepResponse.statusText} `))
  }

  if (step.type === 'grpc') {
    const stepRequest = step.request as gRPCStepRequest
    console.log(chalk.bgWhite.bold(` ${stepRequest.service.split('.')[1]} `) + ' ' + stepRequest.host + ' ' + chalk.bgGray.bold(` ${stepRequest.method} `))
  }

  console.log(chalk.bold('\nChecks'))

  const checks = step.checks as {[key: string]: any}
  for (const check in checks) {
    console.log('\n' + (labels as {[key: string]: string})[check])
    if (['jsonpath', 'xpath', 'headers', 'selector', 'cookies', 'performance', 'captures', 'ssl'].includes(check)) {
      for (const component in checks[check]) {
        checks[check][component].passed
          ? console.log(chalk.green('✔ ') + chalk.bold(component) + ': ' + checks[check][component].given)
          : console.log(chalk.red('✕ ') + chalk.bold(component) + ': ' + checks[check][component].given + ' (expected ' + checks[check][component].expected + ')')
      }
    } else {
      checks[check].passed
        ? console.log(chalk.green('✔ ') + chalk.bold(checks[check].given))
        : console.log(chalk.red('✕ ') + chalk.bold(checks[check].given) + ' (expected ' + checks[check].expected + ')')
    }
  }
}

type LoadWorkflowOptions = {
  env?: EnvironmentVariables
  secrets?: EnvironmentVariables
}

// Load workflow files
function loadWorkflow (path: string, options: LoadWorkflowOptions = {}) {
  runFromFile(path, { ...options, ee })
}

yargs(hideBin(process.argv))
  .command('run [workflow]', 'run workflow', (yargs) => {
    return yargs
      .positional('workflow', {
        describe: 'workflow path (file)',
        type: 'string',
        default: 'workflow.yml'
      })
      .option('e', {
        alias: 'env',
        array: true,
        demandOption: false,
        describe: 'env variables to use',
        type: 'string'
      })
      .option('s', {
        alias: 'secret',
        array: true,
        demandOption: false,
        describe: 'secret variables to use',
        type: 'string'
      })
      .check(({ e: envs, s: secrets }) => {
        if (checkOptionalEnvArrayFormat(envs)) {
          throw new Error('env variables have wrong format, use `env=VARIABLE`.')
        }

        if (checkOptionalEnvArrayFormat(secrets)) {
          throw new Error('secret variables have wrong format, use `secret=VARIABLE`.')
        }

        return true;
      })
  }, (argv) => {
    loadWorkflow(argv.workflow, {
      env: parseEnvArray(argv.e),
      secrets: parseEnvArray(argv.s)
    })
  })
  .parse()

posthog.shutdown()
