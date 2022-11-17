# Using as a Library

Step CI runner can be used independently in other Node projects

Install `@stepci/runner` dependency

```
npm install --save-dev @stepci/runner
```

**Example: Run workflow from file**

```js
import { runFromFile } from '@stepci/runner'
runFromFile('./examples/status.yml').then(console.log)
```

**Example: Run workflow from config**

```js
import { run } from '@stepci/runner'

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

run(workflow).then(console.log)
```

::: info
See the runner repository for documentation and examples: https://github.com/stepci/runner
:::
