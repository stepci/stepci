---
outline: [2, 3]
---

# Testing gRPC APIs

[gRPC](https://grpc.io/) is a remote procedure call framework that allows for efficient communication between services

Testing gRPC APIs involves verifying that the API functions properly and that it can handle various types of input and output data

This typically involves sending requests to the API and examining the responses to ensure that they are correct and meet the expectations of the developer

## Workflow

```yaml
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
```

Workflows contain meta information, tests and default configuration

A minimal Workflow should at least define a `version` and a `name`

Optionally, you can also specify reusables, such as `env` in this example, which you can use throughout the workflow

:::tip
Your workflows will share a similar structure, think about a workflow like a LEGO-set that you assemble step-by-step
:::

:::warning
By default, the test runner will skip subsequent steps after the previous ones have failed. Add `continueOnFail` to your workflow, if you want to continue test execution after a failed step
:::

[→ More workflow options](/reference/workflow-syntax)

## Tests

```yaml{5-9}
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
tests:
  example:
    name: Example test
```

Tests describe different test suites. Tests can have multiple steps. Tests are executed concurrently. Each test has a separate context, shared across steps

Tests can have their own configuration options, overwriting the options specified in the workflow

[→ More tests options](/reference/workflow-syntax#tests)

## Steps

```yaml{10-17}
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
tests:
  example:
    name: Example test
    steps:
      - name: Example step
        grpc:
          proto:
            - public/helloworld.proto
          host: ${{env.host}}
          service: helloworld.Greeter
          method: SayHello
          data:
            name: world!
```

Steps are the instructions to be executed by the runner. Steps contain the request parameters, captures and checks. Steps are executed in a sequence. If one step fails, all the following steps are skipped. Steps have access to shared context

### Auth

#### TLS

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    auth:
      tls:
        rootCerts:
          file: root.cert
        privateKey:
          file: key.cert
        certChain:
          file: chain.cert
```

### Data

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    data:
      hello: world
```

### Metadata

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    metadata:
      hello: world
```

### Conditions

```yaml
- if: captures.message != "Hello World!"
  name: gRPC request
  grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
```

[→ More steps options](/reference/workflow-syntax#tests-test-steps-step-grpc)

## Captures

```yaml{18-20}
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
tests:
  example:
    name: Example test
    steps:
      - name: Example step
        grpc:
          proto:
            - public/helloworld.proto
          host: ${{env.host}}
          service: helloworld.Greeter
          method: SayHello
          data:
            name: world!
          captures:
            message:
              jsonpath: $.message
```

Steps can specify captures to capture data from responses into named variables that can later be used in consequent requests. Also known as "request chaining"

[→ More captures options](/reference/workflow-syntax#tests-test-steps-step-grpc-captures)

### Chaining requests

Template interpolation allows you to use captured data as a value

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    data:
      message: ${{captures.message}}
```

[→ More about Templating](/reference/templating)

## Checks

```yaml{21-23}
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
tests:
  example:
    name: Example test
    steps:
      - name: Example step
        grpc:
          proto:
            - public/helloworld.proto
          host: ${{env.host}}
          service: helloworld.Greeter
          method: SayHello
          data:
            name: world!
          captures:
            message:
              jsonpath: $.message
          check:
            jsonpath:
              $.message: Hello world!
```

Steps can include checks to validate responses

### JSONPath

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    data:
      message: ${{captures.message}}
    check:
      jsonpath:
        $.id: 1
```

### JSON Schema

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    data:
      message: ${{captures.message}}
    check:
      schema:
        type: object
        properties:
          message:
            type: string
        required:
          - message
```

### Performance

```yaml
- grpc:
    proto: public/helloworld.proto
    host: 0.0.0.0:50051
    service: helloworld.Greeter
    method: SayHello
    data:
      message: ${{captures.message}}
    check:
      performance:
        total:
          - lte: 200
```

[→ More check options](/reference/workflow-syntax#tests-test-steps-step-grpc-check)

## Matchers

```yaml{24-25}
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
tests:
  example:
    name: Example test
    steps:
      - name: Example step
        grpc:
          proto:
            - public/helloworld.proto
          host: ${{env.host}}
          service: helloworld.Greeter
          method: SayHello
          data:
            name: world!
          captures:
            message:
              jsonpath: $.message
          check:
            jsonpath:
              $.message:
                - eq: Hello world!
                - isString: true
```

Matchers can be used to match values against a pre-defined set of rules

[→ More about Matchers](/reference/matchers)

## Reusables


```yaml{5-14,26-27}
version: "1.1"
name: My Workflow
env:
  host: 0.0.0.0:50051
components:
  credentials:
    example:
      tls:
        rootCerts:
          file: root.cert
        privateKey:
          file: key.cert
        certChain:
          file: chain.cert
tests:
  example:
    name: Example test
    steps:
      - name: Example step
        grpc:
          proto:
            - public/helloworld.proto
          host: ${{env.host}}
          service: helloworld.Greeter
          method: SayHello
          auth:
            $ref: "#/components/credentials/example"
          data:
            name: world!
          captures:
            message:
              jsonpath: $.message
          check:
            jsonpath:
              $.message:
                - eq: Hello world!
                - isString: true
```

Reusables allow you to reuse content such as schemas and credentials without repetition

[→ More about Reusables](/reference/reusables)
