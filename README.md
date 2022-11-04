![Step CI CLI Demo](https://i.imgur.com/QgC0cRr.gif)

# Welcome

Step CI is an open-source tool, which helps you automate API testing and monitoring

- **Language-agnostic**. Configure easily using YAML
- **REST, GraphQL, gRPC**. Test different API types at once
- **Self-hosted**. Test services on local network
- **Integrated**. Play nicely with others

[→ **Read the Docs**](https://docs.stepci.com)

[→ **Try the Online Playground**](https://stepci.com)

[→ **Join us on GitHub Discussions**](https://github.com/stepci/stepci/discussions)

## Get started

1. Install the CLI from [NPM](https://www.npmjs.com/package/stepci)

    ```sh
    npm install -g stepci
    ```

    > **Note**: Make sure you're using the LTS version of [Node.js](https://nodejs.org/en/)

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
              url: https://{{env.host}}
              method: GET
              check:
                status: /^20/
    ```

    > **Note**: You can also also use JSON format to configure your workflow

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

## Documentation

Documentation is available on [docs.stepci.com](https://docs.stepci.com)

## Example tests

You can find a collection of Step CI example tests under [`examples/`](examples/)

## License

Step CI is distributed under Mozilla Public License terms

## [Privacy](https://docs.stepci.com/legal/privacy)
