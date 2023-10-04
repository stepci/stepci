https://github.com/stepci/stepci/assets/10400064/9962abaa-a2f5-40c2-96a2-3ad90a695fac

> **Note**
> We just announced [Enterprise Support Tier](#support) for Step CI

> **Important**
> For users migrating from Postman and Insomnia, see issues [#29]([respectively](https://github.com/stepci/stepci/issues/29)) and [#30](https://github.com/stepci/stepci/issues/30) respectively

# Welcome

Step CI is an open-source API Quality Assurance framework

- **Language-agnostic**. Configure easily using YAML, JSON or JavaScript
- **REST, GraphQL, gRPC, tRPC, SOAP**. Test different API types in one workflow
- **Self-hosted**. Test services on your network, locally or with CI/CD
- **Integrated**. Play nicely with others

[→ **Read the Docs**](https://docs.stepci.com)

[→ **Try the Online Playground**](https://stepci.com)

[→ **Join us on Discord**](https://discord.gg/KqJJzJ3BTu)

## Get started

1. Install the CLI

   **Using [Node.js](https://nodejs.org/en/)**

    ```sh
    npm install -g stepci
    ```

    > **Note**: Make sure you're using the LTS version of Node.js

    **Using [Homebrew](https://brew.sh/)**

    ```sh
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

## Examples

You can find example workflows under [`examples/`](examples/)

## Community

Join our community on [Discord](https://discord.gg/KqJJzJ3BTu) and [GitHub](https://github.com/stepci/stepci/discussions)

## Contributing

As an open-source project, we welcome contributions from the community. If you are experiencing any bugs or want to add some improvements, please feel free to open an issue or pull request

## Support

Get support hours covered by SLA, setup and training sessions, prioritized feature requests and bug resolution.

[→ Learn more](https://stepci.com/#pricing)

[→ Schedule a call](https://cal.com/wissmueller/30-minute-call)

## Privacy

By default, the CLI collects anonymous usage data, which includes:

- Unique user ID
- OS Name
- Node Version
- CLI Version
- Command (`stepci run`, `stepci generate`)
- Environment (Local, Docker, CI/CD)

> **Note**: The usage analytics can be disabled by setting `STEPCI_DISABLE_ANALYTICS` environment variable

## License

The source code is distributed under Mozilla Public License terms
