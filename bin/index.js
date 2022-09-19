#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { run } from '@stepci/runner'
import fs from 'fs'
import exit from 'exit'
import yaml from 'yaml'
import chalk from 'chalk'

const labels = {
  status: "Status",
  duration: "Duration",
  jsonpath: "JSONPath",
  xpath: "XPath",
  headers: "Headers",
  body: "Body",
  selector: "Selector"
}

function render (result, path) {
  console.log((result.passed ? chalk.green('✔ ') : chalk.red('✕ ')) + chalk.white(result.workflow.name) + ' (' + chalk.gray(path) + ')' + ' in ' + result.duration / 1000 + 's\n')

  result.result.forEach((step, i) => {
    console.log(chalk.bgWhite.bold.black(` ${step.name} `) + (step.passed ? chalk.bgGreenBright.bold(' PASSED ') : chalk.bgRed.bold(' FAILED ')) + ' in ' + step.duration / 1000 + 's')

    if (step.failed || step.skipped) {
      return console.log('\n' + chalk.yellow('⚠︎ ') + step.failReason + '\n')
    }

    console.log(chalk.bold('\nRequest\n'))
    console.log(chalk.bgWhite.bold(` ${step.request.method} `) + ' ' + step.request.url + ' ' + chalk.bgGray.bold(` ${step.response.status} ${step.response.statusText} `))
    console.log(chalk.bold('\nChecks'))

    for (const check in step.checks) {
      console.log('\n' + labels[check])
      if (['jsonpath', 'xpath', 'headers', 'selector'].includes(check)) {
        for (const component in step.checks[check]) {
          step.checks[check][component].passed
            ? console.log(chalk.green('✔ ') + chalk.bold(component) + ': ' + step.checks[check][component].given)
            : console.log(chalk.red('✕ ') + chalk.bold(component) + ': ' + step.checks[check][component].given + ' (expected ' + step.checks[check][component].expected + ')')
        }
      } else {
        step.checks[check].passed
          ? console.log(chalk.green('✔ ') + chalk.bold(step.checks[check].given))
          : console.log(chalk.red('✕ ') + chalk.bold(step.checks[check].given) + ' (expected ' + step.checks[check].expected + ')')
      }
    }

    console.log('\n')
  })
}

async function runWorkflow (path) {
  if (fs.existsSync(path)) {
    const workflowFile = fs.readFileSync(path).toString()
    const config = yaml.parse(workflowFile)
    const result = await run(config)

    render(result, path)
    if (!result.passed) exit(5)
  } else {
    console.error('Workflow File not found')
    exit(2)
  }
}

yargs(hideBin(process.argv))
  .command('run [workflow]', 'run workflow', (yargs) => {
    return yargs
      .positional('workflow', {
        describe: 'workflow file'
      })
  }, (argv) => runWorkflow(argv.workflow))
  .parse()
