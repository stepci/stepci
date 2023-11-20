# Plugins

The "plugin" step type allows you to import custom plugins, which can either implement custom protocols or be based on existing step types. The plugins are written in TypeScript

::: tip
Make sure your plugin is compiled to JavaScript before running it
:::

**Example: Using a plugin**

```yaml
version: "1.1"
name: Hello Plugins
tests:
  example:
    steps:
      - name: Plugin
        plugin:
          id: "@yourcompany/plugin"
          params:
            hello: world
          check:
            reply: world
```

**Example: Plugin boilerplate**

```ts
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
```

**Example: Plugin based on HTTP step type**

```ts
import Ajv from 'ajv'
import { CookieJar } from 'tough-cookie'
import { CapturesStorage } from '@stepci/runner/dist/utils/runner'
import { WorkflowConfig, WorkflowOptions } from '@stepci/runner/dist'
import runHTTPStep, { HTTPStepBase, HTTPStepCheck } from '@stepci/runner/dist/steps/http'

export type YourPlugin = {
  id: "@yourcompany/plugin"
  params: {
    url: string
  }
  check?: HTTPStepCheck
}

export default async function (
  input: YourPlugin,
  captures: CapturesStorage,
  cookies: CookieJar,
  schemaValidator: Ajv,
  options?: WorkflowOptions,
  config?: WorkflowConfig
) {
  return runHTTPStep(
    {
      url: input.params?.url,
      method: 'GET',
      check: input.check,
    },
    captures,
    cookies,
    schemaValidator,
    options,
    config
  )
}
```
