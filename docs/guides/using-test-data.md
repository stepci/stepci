# Using Test Data

You can load test data from a `.csv` file to use in tests. Each test run a random row will be selected from the dataset. A row can be accessed by `testdata` variable in [templates](/reference/templating)

::: info
See [workflow syntax](/reference/workflow-syntax#tests-test-testdata-options) for data loader options
:::

**Example: Authenticate a user using test credentials**

Test Data (`data.csv`)

```
username,password
mish,12345
```

Workflow

```yaml
version: "1.1"
name: Basic Auth
tests:
  example:
    testdata:
      file: data.csv
    steps:
      - name: Basic Auth
        http:
          url: https://httpbin.org/basic-auth/{{testdata.username}}/{{testdata.password}}
          method: GET
          auth:
            basic:
              username: {{ testdata.username }}
              password: {{ testdata.password }}
          check:
            status: 200
```
