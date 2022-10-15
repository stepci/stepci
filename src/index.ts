#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { runFromFile, StepResult, TestResult, WorkflowResult } from '@stepci/runner'
import exit from 'exit'
import chalk from 'chalk'
import { EventEmitter } from 'node:events'
import { labels } from './labels.json'

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
  console.log(chalk.bgWhite.bold(` ${step.request?.method} `) + ' ' + step.request?.url + ' ' + chalk.bgGray.bold(` ${step.response?.status} ${step.response?.statusText} `))
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

// Load workflow files
function loadWorkflow (path: string) {
  runFromFile(path, { ee })
}

yargs(hideBin(process.argv))
  .command('run [workflow]', 'run workflow', (yargs) => {
    return yargs
      .positional('workflow', {
        describe: 'workflow path (file)',
        type: 'string',
        default: 'workflow.yml'
      })
  }, (argv) => loadWorkflow(argv.workflow))
  .parse()
