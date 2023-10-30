# Getting started

1. Install the CLI

    **Using [Node.js](https://nodejs.org/en/)**

    ```
    npm install -g stepci
    ```

    > Make sure you're using the LTS version of Node.js

    **Using [Homebrew](https://brew.sh/)**

    ```
    brew install stepci
    ```

2. Create example workflow

    **workflow.yml**

    ```yaml
    version: "1.1"
    name: Status Check
    env:
      host: example.com
    tests:
      example:
        steps:
          - name: GET request
            http:
              url: https://${{env.host}}
              method: GET
              check:
                status: /^20/
    ```

    ::: info
    You can also also use JSON format to configure your workflow
    :::

3. Run the workflow

    ```
    stepci run workflow.yml
    ```

    ```
    PASS  example

    Tests: 0 failed, 1 passed, 1 total
    Steps: 0 failed, 1 passed, 1 total
    Time:  0.559s, estimated 1s

    Workflow passed after 0.559s
    ```
