#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EnvironmentVariables, runFromFile, TestResult, WorkflowResult } from '@stepci/runner'
import exit from 'exit'
import chalk from 'chalk'
import os from 'os'
import { EventEmitter } from 'node:events'
import { PostHog } from 'posthog-node'
import { randomUUID } from 'crypto'
import ci from 'ci-info'
import isDocker from 'is-docker'
import Conf from 'conf'
import { checkOptionalEnvArrayFormat, parseEnvArray } from './lib/utils'
import { renderStep, renderSummary, renderStepSummary } from './lib/render'

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
  console.log((test.passed ? chalk.bgGreenBright(' PASS ') : chalk.bgRed(' FAIL ')) + ' ' + chalk.bold(test.name || test.id))
  if (!test.passed) {
    renderStepSummary(test.steps)
    test.steps.forEach(renderStep)
  }
})

ee.on('workflow:result', ({ workflow, result, path }: WorkflowResult) => {
  renderSummary(result)
  if (!result.passed) exit(5)
})

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

        return true
      })
  }, (argv) => {
    loadWorkflow(argv.workflow, {
      env: parseEnvArray(argv.e),
      secrets: parseEnvArray(argv.s)
    })
  })
  .parse()

posthog.shutdown()
