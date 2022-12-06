# Integrating with Ava

[Ava](https://github.com/avajs/ava) is a JavaScript testing framework that allows developers to easily write and run tests for their code

Step CI runner can be used directly in JavaScript testing tools

## Preparation

Put your workflows under `test/stepci/`

Install `@stepci/runner` dependency

```
npm install --save-dev @stepci/runner
```

## Using in tests

**Example: Run workflow from file**

```js
import test from 'ava'
import { runFromFile } from '@stepci/runner'

test('Check Response Status', async t => {
  const { result } = await runFromFile(new URL('stepci/status.yml', import.meta.url))
  t.is(result.passed, true)
})
```

**Example: Run workflow from config**

```js
import test from 'ava'
import { run } from '@stepci/runner'

test('Check Response Status', async t => {
  const workflow = {
    version: "1.1",
    name: "Status Test",
    env: {
      host: "example.com"
    },
    tests: {
      example: {
        steps: [{
          name: "GET request",
          http: {
            url: "https://${{env.host}}",
            method: "GET",
            check: {
              status: "/^20/"
            }
          }
        }]
      }
    }
  }

  const { result } = await run(workflow)
  t.is(result.passed, true)
})
```
