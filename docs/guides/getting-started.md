# Getting started

1. Install the CLI from [NPM](https://www.npmjs.com/package/stepci)

    ```sh
    npm install -g stepci
    ```

    or If you're a [Homebrew](https://brew.sh/) user, you can install [stepci](https://formulae.brew.sh/formula/stepci) via:

    ```sh
    $ brew install stepci
    ```

    ::: tip
    Make sure you're using the LTS version of [Node.js](https://nodejs.org/en/)
    :::

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

    ```sh
    stepci run workflow.yml
    ```

    ```
    PASS  example

    Tests: 0 failed, 1 passed, 1 total
    Steps: 0 failed, 1 passed, 1 total
    Time:  0.559s, estimated 1s

    Workflow passed after 0.559s
    ```
