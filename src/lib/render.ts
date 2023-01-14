import chalk from 'chalk'
import { highlight, Theme } from 'cli-highlight'
import { HTTPStepRequest, HTTPStepResponse, StepResult, WorkflowResult } from '@stepci/runner'
import { LoadTestResult } from '@stepci/runner/dist/loadtesting'
import { labels } from './../labels.json'

type RenderOptions = {
  noContext?: boolean | undefined
}

const GitHubHighlightTheme: Theme = {
  tag: chalk.hex('#7ee787'),
  name: chalk.hex('#7ee787'),
  meta: chalk.hex('#7ee787'),
  attr: chalk.hex('#7ee787'),
  string: chalk.hex('#79c0ff'),
  number: chalk.hex('#79c0ff'),
  attribute: chalk.hex('#ff7b72'),
  default: chalk.hex('#c9d1d9'),
  'selector-tag': chalk.hex('#ff7b72'),
  'selector-pseudo': chalk.hex('#ff7b72'),
  'selector-id': chalk.hex('#ff7b72')
}

function renderSpaces (spaces: number) {
  return ' '.repeat(spaces)
}

function renderHTTPRequest (request: HTTPStepRequest) {
  const requestHeaders = request.headers ? Object.keys(request.headers).map(header => `${header}: ${request.headers ? request.headers[header] : ''}\n`) : ''
  const requestBody = typeof request.body === 'string' ? '\n' + request.body : ''
  return `${request.method} ${request.url} ${request.protocol}\n${requestHeaders.toString().replace(',', '')}${requestBody}`
}

function renderHTTPResponse (response: HTTPStepResponse) {
  const responseHeaders = response.headers ? Object.keys(response.headers).map(header => `${header}: ${response.headers ? response.headers[header] : ''}\n`) : ''
  const responseBody =  '\n' + Buffer.from(response.body).toString()
  return `${response.protocol} ${response.status} ${response.statusText}\n${responseHeaders.toString().replaceAll(',', '')}${responseBody}`
}

export function renderStepSummary (steps: StepResult[]) {
  console.log(`\n${chalk.bold('Summary')}\n`)
  steps.forEach(step => {
    if (step.passed) {
      console.log(renderSpaces(2) + chalk.green('✔ ') + chalk.bold(step.name || step.id) + ' passed after ' + step.duration / 1000 + 's')
    }

    else if (step.skipped) {
      console.log(renderSpaces(2) + chalk.yellow('⚠︎ ') + chalk.bold(step.name || step.id) + ' skipped after ' + step.duration / 1000 + 's')
    }

    else if (!step.passed) {
      console.log(renderSpaces(2) + chalk.red('✕ ') + chalk.bold(step.name || step.id) + ' failed after ' + step.duration / 1000 + 's')
    }
  })
}

export function renderStep (step: StepResult, options?: RenderOptions) {
  if (step.passed) return

  if (step.errored || step.skipped) {
    console.log(chalk.yellowBright(`\n⚠︎ ${step.testId} › ${step.name}`))
    return console.log('\n' + step.errorMessage + '\n')
  }

  else {
    console.log(chalk.redBright(`\n● ${step.testId} › ${step.name}`))
  }

  if (step.type === 'http' && !options?.noContext) {
    console.log(chalk.bold(`\nRequest ${chalk.bold.bgGray(' HTTP ')}\n`))
    console.log(highlight(renderHTTPRequest(step.request as HTTPStepRequest), { language: 'http', ignoreIllegals: true, theme: GitHubHighlightTheme }))

    console.log(chalk.bold(`Response\n`))
    console.log(highlight(renderHTTPResponse(step.response as HTTPStepResponse), { language: 'http', ignoreIllegals: true, theme: GitHubHighlightTheme }))
  }

  if (step.type === 'grpc' && !options?.noContext) {
    console.log(chalk.bold(`\nRequest ${chalk.bold.bgGray(' GRPC ')}\n`))
    console.log(highlight(JSON.stringify(step.request, null, 2), { language: 'json', ignoreIllegals: true, theme: GitHubHighlightTheme }))

    console.log(chalk.bold(`\nResponse\n`))
    console.log(highlight(JSON.stringify(step.response?.body, null, 2), { language: 'json', ignoreIllegals: true, theme: GitHubHighlightTheme }))
  }

  console.log(chalk.bold('\nChecks'))

  const checks = step.checks as {[key: string]: any}
  for (const check in checks) {
    console.log('\n' + (labels as {[key: string]: string})[check] + '\n')
    if (['jsonpath', 'xpath', 'headers', 'selector', 'cookies', 'performance', 'captures', 'ssl'].includes(check)) {
      for (const component in checks[check]) {
        checks[check][component].passed
          ? console.log(renderSpaces(2) + chalk.green('✔ ') + chalk.bold(component) + ': ' + checks[check][component].given)
          : console.log(renderSpaces(2) + chalk.red('✕ ') + chalk.bold(component) + ': ' + checks[check][component].given + ' (expected ' + checks[check][component].expected + ')')
      }
    } else {
      checks[check].passed
        ? console.log(renderSpaces(2) + chalk.green('✔ ') + chalk.bold(checks[check].given))
        : console.log(renderSpaces(2) + chalk.red('✕ ') + chalk.bold(checks[check].given) + ' (expected ' + checks[check].expected + ')')
    }
  }
}

export function renderSummary (result: WorkflowResult['result']) {
  const passedTests = result.tests.filter(test => test.passed).length
  const failedTests = result.tests.filter(test => !test.passed).length

  const steps = result.tests.map(test => test.steps).flat()
  const passedSteps = steps.filter(step => step.passed).length
  const skippedSteps = steps.filter(step => step.skipped).length
  const failedSteps = steps.filter(step => !step.passed).length

  console.log(`\n${chalk.bold('Tests:')} ${chalk.redBright.bold(failedTests + ' failed')}, ${chalk.greenBright.bold(passedTests + ' passed')}, ${result.tests.length} total`)
  console.log(`${chalk.bold('Steps:')} ${chalk.redBright.bold(failedSteps + ' failed')}, ${chalk.yellowBright.bold(skippedSteps + ' skipped')}, ${chalk.greenBright.bold(passedSteps + ' passed')}, ${steps.length} total`)
  console.log(`${chalk.bold('Time:')}  ${result.duration / 1000}s, estimated ${(result.duration / 1000).toFixed(0)}s`)
  console.log(`${chalk.bold('CO2:')}   ${chalk.greenBright(result.co2.toFixed(5) + 'g')}`)
  console.log(result.passed
    ? chalk.greenBright(`\nWorkflow passed after ${result.duration / 1000}s`)
    : chalk.redBright(`\nWorkflow failed after ${result.duration / 1000}s`)
  )
}

export function renderFeedbackMessage () {
  console.log(chalk.cyanBright(`Give us your feedback on ${chalk.underline('https://step.ci/feedback')}`))
}

export function renderAnalyticsMessage () {
  if (!process.env.STEPCI_DISABLE_ANALYTICS) {
    console.log(chalk.gray(`\nⓘ  Anonymous usage data collected. Learn more on https://step.ci/privacy\n`))
  }
}

function dots (offset: number): string {
  return chalk.gray('.').repeat(60 - offset)
}

export function renderLoadTest (result: LoadTestResult['result']) {
  console.log(`\nresponse_time:`)
  console.log(`  min: ${dots(0)} ${chalk.yellow(result.responseTime.min)}`)
  console.log(`  max: ${dots(0)} ${chalk.yellow(result.responseTime.max)}`)
  console.log(`  avg: ${dots(0)} ${chalk.yellow(result.responseTime.avg)}`)
  console.log(`  med: ${dots(0)} ${chalk.yellow(result.responseTime.med)}`)
  console.log(`  p95: ${dots(0)} ${chalk.yellow(result.responseTime.p95)}`)
  console.log(`  p99: ${dots(0)} ${chalk.yellow(result.responseTime.p99)}`)

  console.log(`steps:`)
  console.log(`  failed: ${dots(3)} ${chalk.yellow(result.stats.steps.failed)}`)
  console.log(`  passed: ${dots(3)} ${chalk.yellow(result.stats.steps.passed)}`)
  console.log(`  skipped: ${dots(4)} ${chalk.yellow(result.stats.steps.skipped)}`)
  console.log(`  errored: ${dots(4)} ${chalk.yellow(result.stats.steps.errored)}`)
  console.log(`  total: ${dots(2)} ${chalk.yellow(result.stats.steps.total)}`)

  console.log(`tests:`)
  console.log(`  failed: ${dots(3)} ${chalk.yellow(result.stats.tests.failed)}`)
  console.log(`  passed: ${dots(3)} ${chalk.yellow(result.stats.tests.passed)}`)
  console.log(`  total: ${dots(2)} ${chalk.yellow(result.stats.tests.total)}`)

  if (result.checks) {
    console.log(`checks`)
    for (const check in result.checks) {
      console.log(`  ${check}: ${dots(0)} ${(result.checks as {[key: string]: any})[check].passed ? chalk.green('pass') : chalk.red('fail')}`)
    }
  }

  console.log(`rps: ${dots(-2)} ${chalk.yellow(result.rps)}`)
  console.log(`iterations: ${dots(5)} ${chalk.yellow(result.iterations)}`)
  console.log(`duration: ${dots(3)} ${chalk.yellow(result.duration)}`)

  console.log(result.passed
    ? chalk.greenBright(`\nWorkflow passed after ${result.duration / 1000}s`)
    : chalk.redBright(`\nWorkflow failed after ${result.duration / 1000}s`)
  )
}
