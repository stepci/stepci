# Integrating with Vitest

[Vitest](https://vitest.dev) is a blazing fast unit test framework powered by Vite, optimized for modern JavaScript and TypeScript projects

Step CI runner can be used directly in JavaScript testing tools

## Preparation

Put your workflows under `tests/`

Install `@stepci/runner` dependency

```
npm install --save-dev @stepci/runner
```

## Using in tests

**Example: Run workflow from file**

```js
import { expect, it } from 'vitest'
import { runFromFile } from '@stepci/runner'

it('Check Response Status', async () => {
  const { result } = await runFromFile(new URL('tests/workflow.yml', import.meta.url))
  expect(result.passed).toBe(true)
})
```

**Example: Run workflow from config**

```js
import { expect, it } from 'vitest'
import { run } from '@stepci/runner'

it('Check Response Status', async () => {
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
