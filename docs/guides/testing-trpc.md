# Testing tRPC APIs

:::warning
Batching is currently not supported
:::

[tRPC](https://trpc.io) is a library, that enables you to build typesafe APIs using TypeScript

We have added useful helpers to reduce the burden for testing tRPC-powered APIs with our tool

**Example: Greeting**

```yaml
version: "1.1"
name: tRPC
tests:
  example:
    steps:
      - name: Query
        http:
          url: http://localhost:2022/trpc
          trpc:
            query:
              greet: Mish
          check:
            status: /^20/
```

**Example: Modifiying a user**

```yaml
version: "1.1"
name: tRPC
tests:
  example:
    steps:
      - name: Mutation
        http:
          url: http://localhost:2022/trpc
          trpc:
            mutation:
              updateUser:
                name: Mish
          check:
            status: /^20/
```

:::info
See [Workflow Syntax Reference](/reference/workflow-syntax#tests-test-steps-step-http-trpc) for more request options
:::
