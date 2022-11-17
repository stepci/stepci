# Integrating with Jest

Step CI runner can be used directly in JavaScript test tools

## Preparation

Put your workflows under `test/stepci/`

Install `@stepci/runner` dependency

```
npm install --save-dev @stepci/runner
```

## Using in tests

**Example: Run workflow from file**

```js
const { runFromFile } = require('@stepci/runner')
const path = require('path')

test('Check Response Status', async () => {
  const { result } = await runFromFile(path.join(__dirname, './stepci/status.yml'))
  expect(result.passed).toBe(true)
})
```

**Example: Run workflow from config**

```js
const { run } = require('@stepci/runner')

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
