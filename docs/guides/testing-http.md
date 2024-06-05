---
outline: [2, 3]
---

# Testing HTTP APIs

Testing HTTP APIs involves verifying that the API functions properly and that it can handle various types of input and output data

This typically involves sending requests to the API and examining the responses to ensure that they are correct and meet the expectations of the developer

Testing HTTP APIs is important for ensuring the reliability and functionality of the API and can help identify and fix any issues before the API is released to the public

## Workflow

```yaml
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
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

```yaml{6-10}
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
tests:
  example:
    name: Example test
```

Tests describe different test suites. Tests can have multiple steps. Tests are executed concurrently. Each test has a separate context, shared across steps

Tests can have their own configuration options, overwriting the options specified in the workflow

[→ More tests options](/reference/workflow-syntax#tests)

## Steps

```yaml{9-19}
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
tests:
  example:
    name: Example test
    steps:
      - name: Example step
        http:
          url: https://${{env.host}}/${{env.resource}}
          method: POST
          headers:
            Content-Type: application/json
          json:
            title: Hello Step CI!
            body: This is the body
            userId: 1
```

Steps are the instructions to be executed by the runner. Steps contain the request parameters, captures and checks. Steps are executed in a sequence. If one step fails, all the following steps are skipped. Steps have access to shared context

### Auth

#### Basic

```yaml
- http:
    url: https://example.com/protected
    method: GET
    auth:
      basic:
        username: hello
        password: world
```

#### Bearer

```yaml
- http:
    url: https://example.com/protected
    method: GET
    auth:
      bearer:
        token: hello
```

#### Certificate

```yaml
- http:
    url: https://example.com/protected
    method: GET
    auth:
      certificate:
        ca:
          file: file.cert
        cert:
          file: file.cert
        key:
          file: file.key
        passphrase: password
```

### Query Params

```yaml
- http:
    url: https://example.com
    method: GET
    params:
      hello: world
      world: hello
```

### Body

#### Plain

```yaml
- http:
    url: https://httpbin.org/post
    method: POST
    body: {}
```

#### JSON

```yaml
- http:
    url: https://httpbin.org/post
    method: POST
    json:
      hello: world
```

### Forms

#### URL-encoded

```yaml
- http:
    url: https://httpbin.org/post
    method: POST
    form:
      hello: world
```

#### Multi-part

```yaml
- http:
    url: https://httpbin.org/post
    method: POST
    formData:
      email: hello@example.com      # simple field value
      example:
        file: file.txt              # file attachment
      idDocument:
        file: password.pdf          # file attachment with specific content-type
        type: application/pdf
      personInfo:
        value: '{ "name": "john" }' # form field with specific content-type
        type: application/json
```

### File uploads

```yaml
- http:
    url: https://httpbin.org/post
    method: POST
    body:
      file: file.txt
```

### Cookies

Once set or received, the cookies are saved and reused throughout the test

```yaml
- http:
    url: https://httpbin.org/cookies
    method: GET
    cookies:
      hello: world
```

### Conditions

```yaml
- if: captures.title != "Example Domain"
  http:
    url: https://example.com
    method: GET
```

[→ More steps options](/reference/workflow-syntax#tests-test-steps-step-http)

## Captures

```yaml{19-21}
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
tests:
  example:
    steps:
      - name: Post a post
        http:
          url: https://${{env.host}}/${{env.resource}}
          method: POST
          headers:
            Content-Type: application/json
          json:
            title: Hello Step CI!
            body: This is the body
            userId: 1
          captures:
            id:
              jsonpath: $.id
```

Steps can specify captures to capture data from responses into named variables that can later be used in consequent requests. Also known as "request chaining"

[→ More captures options](/reference/workflow-syntax#tests-test-steps-step-http-captures)

### Chaining requests

Template interpolation allows you to use captured data as a value

```yaml
- http:
    url: https://${{env.host}}/${{env.resource}}/${{captures.id}}
    method: GET
```

[→ More about Templating](/reference/templating)

## Checks

```yaml{22-23}
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
tests:
  example:
    steps:
      - name: Post a post
        http:
          url: https://${{env.host}}/${{env.resource}}
          method: POST
          headers:
            Content-Type: application/json
          json:
            title: Hello Step CI!
            body: This is the body
            userId: 1
          captures:
            id:
              jsonpath: $.id
          check:
            status: 201
```

Steps can include checks to validate responses

### Status code

```yaml
- http:
    url: https://example.com
    method: GET
    check:
      status: /^20/
```

### Headers

```yaml
- http:
    url: https://jsonplaceholder.typicode.com/posts
    method: GET
    check:
      headers:
        Content-Type: application/json
```

### JSONPath

```yaml
- http:
    url: https://jsonplaceholder.typicode.com/posts/1
    method: GET
    check:
      jsonpath:
        $.id: 1
```

### JSON Schema

```yaml
- http:
    url: https://jsonplaceholder.typicode.com/posts/1
    method: GET
    check:
      schema:
        type: object
        properties:
          userId:
            type: integer
          id:
            type: integer
          title:
            type: string
          body:
            type: string
        required:
          - userId
          - id
          - title
          - body
```

### CSS Selectors

```yaml
- http:
    url: https://example.com
    method: GET
    check:
      selectors:
        title: Example Domain
```

### Hash

```yaml
- http:
    url: https://httpbin.org/image
    headers:
      accept: image/webp
    method: GET
    check:
      sha256: 567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63
```

[→ More check options](/reference/workflow-syntax#tests-test-steps-step-http-check)

## Matchers

```yaml{26-27}
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
tests:
  example:
    steps:
      - name: Post a post
        http:
          url: https://${{env.host}}/${{env.resource}}
          method: POST
          headers:
            Content-Type: application/json
          json:
            title: Hello Step CI!
            body: This is the body
            userId: 1
          captures:
            id:
              jsonpath: $.id
          check:
            status: 201
            jsonpath:
              $.id:
                - eq: 101
                - isNumber: true
```

Matchers can be used to match values against a pre-defined set of rules

[→ More about Matchers](/reference/matchers)

## Reusables

```yaml{6-11,20}
version: "1.1"
name: My Workflow
env:
  host: jsonplaceholder.typicode.com
  resource: posts
components:
  credentials:
    example:
      basic:
        username: hello
        password: world
tests:
  example:
    steps:
      - name: Post a post
        http:
          url: https://${{env.host}}/${{env.resource}}
          method: POST
          auth:
            $ref: "#/components/credentials/example"
          headers:
            Content-Type: application/json
          json:
            title: Hello Step CI!
            body: This is the body
            userId: 1
          captures:
            id:
              jsonpath: $.id
          check:
            status: 201
            jsonpath:
              $.id:
                - eq: 101
                - isNumber: true
```

Reusables allow you to reuse content such as schemas and credentials without repetition

[→ More about Reusables](/reference/reusables)
