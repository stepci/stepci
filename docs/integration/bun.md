# Integrating with Bun

[Bun](https://bun.sh) ships with a fast, built-in, Jest-compatible test runner

Step CI runner can be used directly in Bun

## Preparation

Put your workflows under `tests/`

Install `@stepci/runner` dependency

```
bun add @stepci/runner
```

## Using in tests

**Example: Run workflow from file**

```js
import { expect, test } from 'bun:test'
import { runFromFile } from '@stepci/runner'

test('Check Response Status', async () => {
  const { result } = await runFromFile(new URL('tests/workflow.yml', import.meta.url))
  expect(result.passed).toBe(true)
})
```

**Example: Run workflow from config**

```js
import { expect, test } from 'bun:test'
import { run } from '@stepci/runner'

test('Check Response Status', async () => {
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
  expect(result.passed).toBe(true)
})
```
