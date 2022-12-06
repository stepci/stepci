# Using Test Data

Test data is data that is specifically created and used during the testing phase of software development in order to ensure that the software is working correctly and efficiently.

Test data is typically a subset of the full data set that the software will be working with, and is carefully chosen to exercise the various features and capabilities of the software in a controlled manner.

You can load test data from a csv file/string to be used in tests. Each test run, a random row will be selected from the dataset. A row can be accessed by `testdata` variable in [templates](/reference/templating)

**Example: Authenticate a user using test credentials**

**data.csv**

```
username,password
mish,12345
```

**workflow.yml**

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
          url: https://httpbin.org/basic-auth/${{testdata.username}}/${{testdata.password}}
          method: GET
          auth:
            basic:
              username: ${{ testdata.username }}
              password: ${{ testdata.password }}
          check:
            status: 200
```

::: info
See [Workflow Syntax](/reference/workflow-syntax#tests-test-testdata-options) for data loader options
:::
