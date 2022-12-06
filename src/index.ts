#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { runFromFile, TestResult, WorkflowResult } from '@stepci/runner'
import { loadTestFromFile }  from '@stepci/runner/dist/loadtesting'
import { generateWorkflowFile, GenerateWorkflowOptions } from '@stepci/plugin-openapi'
import exit from 'exit'
import chalk from 'chalk'
import { EventEmitter } from 'node:events'
import { defaultText } from './lib/constants'
import { checkOptionalEnvArrayFormat, parseEnvArray } from './lib/utils'
import { renderStep, renderSummary, renderStepSummary, renderFeedbackMessage, renderLoadTest, renderAnalyticsMessage } from './lib/render'
import { sendAnalyticsEvent } from './lib/analytics'

let noContext: boolean | undefined
renderAnalyticsMessage()

const ee = new EventEmitter()
ee.on('test:result', (test: TestResult) => {
  console.log((test.passed ? chalk.bgGreenBright(' PASS ') : chalk.bgRedBright(' FAIL ')) + ' ' + chalk.bold(test.name || test.id))
  if (!test.passed) {
    renderStepSummary(test.steps)
    test.steps.forEach(step => renderStep(step, { noContext }))
  }
})

ee.on('workflow:result', ({ result }: WorkflowResult) => {
  renderSummary(result)
  renderFeedbackMessage()
  if (!result.passed) exit(5)
})

yargs(hideBin(process.argv))
  .command('run [workflow]', 'run workflow', (yargs) => {
    return yargs
      .positional('workflow', {
        describe: 'workflow file path',
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
      .option('no-context', {
        alias: 'hide',
        boolean: true,
        demandOption: false,
        describe: 'hide context like request/response data',
        type: 'boolean'
      })
      .option('loadtest', {
        alias: 'load',
        boolean: true,
        demandOption: false,
        describe: 'run workflow in load-testing mode',
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
  }, async (argv) => {
    noContext = argv['no-context']

    if (argv.loadtest) {
      console.log(chalk.yellowBright(`⚠︎ Running a load test. This may take a while`))
      const { result } = await loadTestFromFile(argv.workflow, {
        env: parseEnvArray(argv.e),
        secrets: parseEnvArray(argv.s)
      })

      renderLoadTest(result)
      renderFeedbackMessage()
      if (!result.passed) exit(5)
      return
    }

    runFromFile(argv.workflow, {
      env: parseEnvArray(argv.e),
      secrets: parseEnvArray(argv.s),
      ee
    })
  })
  .command('generate [spec] [path]', 'generate workflow from OpenAPI spec', yargs => {
    return yargs
      .positional('spec', {
        describe: 'openapi file url',
        type: 'string',
        default: 'openapi.json'
      })
      .positional('path', {
        describe: 'output file path',
        type: 'string',
        default: './workflow.yml'
      })
      .positional('generatePathParams', { type: 'boolean', default: true })
      .positional('generateOptionalParams', { type: 'boolean', default: true })
      .positional('generateRequestBody', { type: 'boolean', default: true })
      .positional('useExampleValues', { type: 'boolean', default: true })
      .positional('useDefaultValues', { type: 'boolean', default: true })
      .positional('checkStatus', { type: 'boolean', default: true })
      .positional('checkExamples', { type: 'boolean', default: true })
      .positional('checkSchema', { type: 'boolean', default: true })
      .positional('contentType', { type: 'string', default: 'application/json' })
  }, async (argv) => {
    const generateWorkflowConfig: GenerateWorkflowOptions = {
      generator: {
        pathParams: argv.generatePathParams,
        optionalParams: argv.generateOptionalParams,
        requestBody: argv.generateRequestBody,
        useExampleValues: argv.useExampleValues,
        useDefaultValues: argv.useDefaultValues,
      },
      check: {
        status: argv.checkStatus,
        examples: argv.checkExamples,
        schema: argv.checkSchema
      },
      contentType: argv.contentType
    }

    await generateWorkflowFile(argv.spec, argv.path, generateWorkflowConfig)
    console.log(`${chalk.greenBright('Success!')} The workflow file can be found at ${argv.path}`)
    renderFeedbackMessage()
  })
  .command(['$0'], false, () => {}, () => console.log(defaultText))
  .parse()

sendAnalyticsEvent()
