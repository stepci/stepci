![Screen Recording 2023-10-04 at 15 43 17](https://github.com/stepci/stepci/assets/10400064/881efd49-fd93-4ff8-8e99-4b6e24fe1227)

> **Note**
> We just announced [Pro Plan](https://stepci.com/#pricing) for Step CI

> **Important**
> For users migrating from Postman and Insomnia, see issues [#29](https://github.com/stepci/stepci/issues/29) and [#30](https://github.com/stepci/stepci/issues/30) respectively

# Welcome

Step CI is an open-source API Quality Assurance framework

- **Language-agnostic**. Configure easily using YAML, JSON or JavaScript
- **REST, GraphQL, gRPC, tRPC, SOAP**. Test different API types in one workflow
- **Self-hosted**. Test services on your network, locally and CI/CD
- **Integrated**. Play nicely with others

[→ **Read the Docs**](https://docs.stepci.com)

[→ **Try the Online Playground**](https://stepci.com)

[→ **Join us on Discord**](https://discord.gg/KqJJzJ3BTu)

## Get started

1. Install the CLI

   **Using [Node.js](https://nodejs.org/en/)**

    ```
    npm install -g stepci
    ```

    > **Note**: Make sure you're using the LTS version of Node.js

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

    > **Note**: You can also also use JSON format to configure your workflow

3. Run the workflow

    ```
    stepci run workflow.yml -e host=example.org
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

## Examples

You can find example workflows under [`examples/`](examples/)

## Community

Join our community on [Discord](https://discord.gg/KqJJzJ3BTu) and [GitHub](https://github.com/stepci/stepci/discussions)

## Contributing

As an open-source project, we welcome contributions from the community. If you are experiencing any bugs or want to add some improvements, please feel free to open an issue or pull request

## Pro Plan

Get Pro-level functionality, support (with SLA), onboarding, custom features and plugins.

[→ **Learn more**](https://stepci.com/#pricing)

<a href="https://cal.com/ushakov/step-ci-demo"><img alt="Book us with Cal.com" src="https://cal.com/book-with-cal-dark.svg" /></a>

## Privacy

By default, the CLI collects anonymous usage data, which includes:

- Unique user ID
- OS Name
- Node Version
- CLI Version
- Command (`stepci init`, `stepci run`, `stepci generate`)
- Environment (Local, Docker, CI/CD)

> **Note**
> The usage analytics can be disabled by setting `STEPCI_DISABLE_ANALYTICS` environment variable

## License

The source code is distributed under Mozilla Public License terms
