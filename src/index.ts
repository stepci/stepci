#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { EnvironmentVariables, runFromFile, TestResult, WorkflowResult } from '@stepci/runner'
import exit from 'exit'
import chalk from 'chalk'
import { EventEmitter } from 'node:events'
import { checkOptionalEnvArrayFormat, parseEnvArray } from './lib/utils'
import { renderStep, renderSummary, renderStepSummary } from './lib/render'
import { sendAnalyticsEvent } from './lib/analytics'

type LoadWorkflowOptions = {
  env?: EnvironmentVariables
  secrets?: EnvironmentVariables
}

let noContext: boolean | undefined

const ee = new EventEmitter()
ee.on('test:result', (test: TestResult) => {
  console.log((test.passed ? chalk.bgGreenBright(' PASS ') : chalk.bgRed(' FAIL ')) + ' ' + chalk.bold(test.name || test.id))
  if (!test.passed) {
    renderStepSummary(test.steps)
    test.steps.forEach(step => renderStep(step, { noContext }))
  }
})

ee.on('workflow:result', ({ workflow, result, path }: WorkflowResult) => {
  renderSummary(result)
  console.log(chalk.gray(`We'd love to hear your feedback: https://step.ci/Z3KD5g9`))
  if (!result.passed) exit(5)
})

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
      .option('nocontext', {
        boolean: true,
        demandOption: false,
        describe: 'hide context like request/response data',
        type: 'boolean'
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
    noContext = argv.nocontext

    loadWorkflow(argv.workflow, {
      env: parseEnvArray(argv.e),
      secrets: parseEnvArray(argv.s)
    })
  })
  .parse()

sendAnalyticsEvent()
