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

// Render output
function render (result, path) {
  console.log((result.passed ? chalk.green('✔ ') : chalk.red('✕ ')) + chalk.white(result.workflow.name) + ' (' + chalk.gray(path) + ')' + ' in ' + result.duration / 1000 + 's')

  result.result.forEach((step, i) => {
    console.log('\n' + chalk.bgWhite.bold.black(` ${step.name} `) + (step.passed ? chalk.bgGreenBright.bold(' PASSED ') : chalk.bgRed.bold(' FAILED ')) + ' in ' + step.duration / 1000 + 's')

    if (step.failed || step.skipped) {
      return console.log('\n' + chalk.yellow('⚠︎ ') + (step.failReason || 'Step was skipped') + '\n')
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
  })
}

// Run workflow files
async function runWorkflows (path) {
  if (fs.lstatSync(path).isDirectory()) {
    const files = fs.readdirSync(path).filter(file => file.includes('yml') || file.includes('yaml'))
    files.forEach(async (file, i) => {
      const workflowFile = fs.readFileSync(path + file).toString()
      const config = yaml.parse(workflowFile)
      const result = await run(config)

      render(result, path + file)
      if (i !== files.length - 1) console.log('-'.repeat(process.stdout.columns))
      if (!result.passed) exit(5)
    })
  } else {
    const workflowFile = fs.readFileSync(path).toString()
    const config = yaml.parse(workflowFile)
    const result = await run(config)

    render(result, path)
    if (!result.passed) exit(5)
  }
}

yargs(hideBin(process.argv))
  .command('run [workflow]', 'run workflow', (yargs) => {
    return yargs
      .positional('workflow', {
        describe: 'workflow path (file or a directory)'
      })
  }, (argv) => runWorkflows(argv.workflow))
  .parse()
