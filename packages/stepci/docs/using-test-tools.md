# Using in test tools

Step CI runner can be integrated directly with JavaScript test tools

## Preparation

1. Put your Step CI workflows under `test/stepci/`

2. Install `@stepci/runner` dependency

    ```
    npm install --save-dev @stepci/runner
    ```

## Usage

### General

Your workflows can be run using Step CI test runner by using `runFromFile` or `run` methods

### Mocha

**Example: Run workflow from file**

```js
const assert = require('assert')
const { runFromFile } = require('@stepci/runner')
const path = require('path')

it('Check Response Status', async () => {
  const result = await runFromFile(path.join(__dirname, './stepci/status.yml'))
  assert.equal(result.passed, true)
})
```

**Example: Run workflow from config**

```js
const assert = require('assert')
const { run } = require('@stepci/runner')

it('Check Response Status', async () => {
  const workflow = {
    version: "1.0",
    name: "Status Test",
    env: {
      host: "example.com"
    },
    tests: {
      example: {
        steps: [{
          name: "GET request",
          url: "https://{{env.host}}",
          method: "GET",
          check: {
            status: "/^20/"
          }
        }]
      }
    }
  }

  const result = await run(workflow)
  assert.equal(result.passed, true)
})
```

### Jest

**Example: Run workflow from file**

```js
const { runFromFile } = require('@stepci/runner')
const path = require('path')

test('Check Response Status', async () => {
  const result = await runFromFile(path.join(__dirname, './stepci/status.yml'))
  expect(result.passed).toBe(true)
})
```

**Example: Run workflow from config**

```js
const { run } = require('@stepci/runner')

test('Check Response Status', async () => {
  const workflow = {
    version: "1.0",
    name: "Status Test",
    env: {
      host: "example.com"
    },
    tests: {
      example: {
        steps: [{
          name: "GET request",
          url: "https://{{env.host}}",
          method: "GET",
          check: {
            status: "/^20/"
          }
        }]
      }
    }
  }

  const result = await run(workflow)
  expect(result.passed).toBe(true)
})
```

### Ava

**Example: Run workflow from file**

```js
import test from 'ava'
import { runFromFile } from '@stepci/runner'

test('Check Response Status', async t => {
  const result = await runFromFile(new URL('stepci/status.yml', import.meta.url))
  t.is(result.passed, true)
})
```

**Example: Run workflow from config**

```js
import test from 'ava'
import { run } from '@stepci/runner'

test('Check Response Status', async t => {
  const workflow = {
    version: "1.0",
    name: "Status Test",
    env: {
      host: "example.com"
    },
    tests: {
      example: {
        steps: [{
          name: "GET request",
          url: "https://{{env.host}}",
          method: "GET",
          check: {
            status: "/^20/"
          }
        }]
      }
    }
  }

  const result = await run(workflow)
  t.is(result.passed, true)
})
```
