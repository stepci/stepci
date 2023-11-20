import Ajv from 'ajv'
import { CapturesStorage } from '@stepci/runner/dist/utils/runner'
import { WorkflowConfig, WorkflowOptions, StepRunResult } from '@stepci/runner/dist'
import { Matcher, checkResult } from '@stepci/runner/dist/matcher'

export type YourPlugin = {
  id: "@yourcompany/plugin"
  params: {
    hello: string
  }
  check?: {
    reply: string | Matcher[]
  }
}

export default async function (
  input: YourPlugin,
  captures: CapturesStorage,
  cookies: any,
  schemaValidator: Ajv,
  options?: WorkflowOptions,
  config?: WorkflowConfig
) {
  const stepResult: StepRunResult = {
    type: '@yourcompany/plugin',
  }

  if (input.check) {
    stepResult.checks = {}

    if (input.check.reply) {
      stepResult.checks['reply'] = checkResult(input.params.hello, input.check.reply)
    }
  }

  return stepResult
}
