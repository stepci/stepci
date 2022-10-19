![Step CI Banner](https://i.imgur.com/DiM3Gqg.png)

# Welcome

Step CI is an open-source tool, which makes testing and monitoring APIs simple

Quick overview:

- Language-agnostic. Flexible, declarative configuration language
- REST, GraphQL, XML
- Integrated. Works seamlessly with Node, Docker and GitHub Actions

**[Try Demo on our website](https://stepci.com)**

**[Join us on GitHub Discussions](https://github.com/stepci/stepci/discussions)**

## Get started

### Using Node

Install the CLI

```
npm install -g stepci
```

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        url: https://{{env.host}}
        method: GET
        check:
          status: /^20/
```

Run the workflow

```
stepci run tests/workflow.yml
```

### Using Docker

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        url: https://{{env.host}}
        method: GET
        check:
          status: /^20/
```

Run the Docker image

```
docker run -v "$(pwd)"/tests:/tests ghcr.io/stepci/stepci tests/workflow.yml
```

### Using GitHub Actions

Create example workflow (`tests/workflow.yml`)

```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        url: https://{{env.host}}
        method: GET
        check:
          status: /^20/
```

Add Step CI GitHub Action (`./github/workflows/stepci.yml`)

```yaml
on: [push]
jobs:
  api_test:
    runs-on: ubuntu-latest
    name: API Tests
    steps:
      - uses: actions/checkout@v3
      - name: Step CI Action
        uses: stepci/stepci@main
        with:
          workflow: "tests/workflow.yml"
```

## Documentation

Documentation is accessible under [`docs/`](docs/)

## Example tests

You can find a collection of Step CI example tests under [`examples/`](examples/)

- [Status Check](#status-check)
- [Validating XML](#validating-xml)
- [Validating JSON](#validating-json)
- [JSON Schema](#json-schema)
- [Validating HTML](#validating-html)
- [Validating Bytes](#validating-bytes)
- [Performance](#performance)
- [SSL Certificates](#ssl-certificates)
- [Captures](#captures)
- [Graph QL](#graph-ql)
- [Soap API](#soap-api)
- [Form Submission](#form-submission)
- [File Uploads](#file-uploads)
- [Basic Auth](#basic-auth)
- [Cookies](#cookies)
- [Conditions](#conditions)
- [Using Matchers](#using-matchers)

#### Status Check
```yaml
version: "1.0"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        url: https://{{env.host}}
        method: GET
        check:
          status: /^20/
```
#### Validating XML
```yaml
version: "1.0"
name: Validating XML
tests:
  example:
    steps:
      - name: GET request
        url: https://api-campaign-us-1.goacoustic.com/XMLAPI
        method: GET
        check:
          xpath:
            //SUCCESS: "false"
```
#### Validating JSON
```yaml
version: "1.0"
name: Validating JSON
tests:
  example:
    steps:
      - name: GET request
        url: https://jsonplaceholder.typicode.com/posts/1
        method: GET
        check:
          jsonpath:
            $.id: 1
```
#### JSON Schema
```yaml
version: "1.0"
name: JSON Schema
tests:
  example:
    steps:
      - name: GET request
        url: https://jsonplaceholder.typicode.com/posts/1
        method: GET
        check:
          jsonschema:
            type: object
            properties:
              userId:
                type: integer
                required: true
              id:
                type: integer
                required: true
              title:
                type: string
                required: true
              body:
                type: string
                required: true
```
#### Validating HTML
```yaml
version: "1.0"
name: Validating HTML
tests:
  example:
    steps:
      - name: GET request
        url: https://example.com
        method: GET
        check:
          selector:
            title: Example Domain
```
#### Validating Bytes
```yaml
version: "1.0"
name: Validating Bytes
tests:
  example:
    steps:
      - name: Image
        url: https://httpbin.org/image
        headers:
          accept: image/webp
        method: GET
        check:
          sha256: 567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63
```
#### Performance
```yaml
version: "1.0"
name: Performance
tests:
  example:
    steps:
      - name: GET Request
        url: https://example.com
        method: GET
        check:
          performance:
            firstByte:
              - lte: 200
            total:
              - lte: 500
```
#### SSL Certificates
```yaml
version: "1.0"
name: SSL Certificates
tests:
  example:
    steps:
      - name: GET Request
        method: GET
        url: https://example.com
        check:
          ssl:
            valid: true
            signed: true
            daysUntilExpiration:
              - gte: 60
```
#### Captures
```yaml
version: "1.0"
name: Captures
env:
  host: jsonplaceholder.typicode.com
  resource: posts
tests:
  example:
    steps:
      - name: Post the post
        url: https://{{env.host}}/{{env.resource}}
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
          captures:
            id: 101
      - name: Get post by id
        url: https://{{env.host}}/{{env.resource}}/{{captures.id}}
        method: GET
        headers:
          Content-Type: application/json
        check:
          status: 404
          headers:
            Content-Type: application/json; charset=utf-8
          body: "{}"
```
#### Graph QL
```yaml
version: "1.0"
name: GraphQL
tests:
  example:
    steps:
      - name: Request
        url: https://echo.hoppscotch.io/graphql
        method: POST
        headers:
          Content-Type: application/json
        graphql:
          query: |
            query Request {
              method
              url
              headers {
                key
                value
              }
            }
          variables:
            id: 1
        check:
          status: 200
          jsonpath:
            $.data.method: POST
```
#### Soap API
```yaml
version: "1.0"
name: SOAP API
tests:
  example:
    steps:
      - name: POST request
        url: https://www.dataaccess.com/webservicesserver/NumberConversion.wso
        method: POST
        headers:
          Content-Type: text/xml
          SOAPAction: "#POST"
        body: >
          <?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
              <NumberToWords xmlns="http://www.dataaccess.com/webservicesserver/">
                <ubiNum>500</ubiNum>
              </NumberToWords>
            </soap:Body>
          </soap:Envelope>
        check:
          status: 200
          selector:
            m\:numbertowordsresult: "five hundred "
```
#### Form Submission
```yaml
version: "1.0"
name: Form Submission
tests:
  example:
    steps:
      - name: Submit a form
        url: https://httpbin.org/post
        method: POST
        formData:
          email: hello@stepci.com
          logo:
            file: README.md
        check:
          status: 200
```
#### File Uploads
```yaml
version: "1.0"
name: File Uploads
tests:
  example:
    steps:
      - name: Upload
        url: https://httpbin.org/post
        method: POST
        body:
          file: README.md
        check:
          status: 200
```
#### Basic Auth
```yaml
version: "1.0"
name: Basic Auth
tests:
  example:
    steps:
      - name: Basic Auth
        url: https://httpbin.org/basic-auth/hello/world
        method: GET
        auth:
          basic:
            username: hello
            password: world
        check:
          status: 200
```
#### Cookies
```yaml
version: "1.0"
name: Cookies
tests:
  example:
    steps:
      - name: Cookies
        url: https://httpbin.org/cookies
        method: GET
        cookies:
          wows: world
        check:
          status: 200
          cookies:
            wows: world
```
#### Conditions
```yaml
version: "1.0"
name: Conditions
tests:
  example:
    steps:
      - name: GET request
        url: https://example.com
        method: GET
        check:
          status: 200
        captures:
          title:
            selector: title
      - if: captures.title != "Example Domain"
        name: GET request
        url: https://example.com
        method: GET
        check:
          status: 200
```
#### Using Matchers
```yaml
version: "1.0"
name: Using Matchers
tests:
  example:
    steps:
      - name: GET request
        url: https://jsonplaceholder.typicode.com/posts/1
        method: GET
        check:
          jsonpath:
            $.id:
              - eq: 1
              - isNumber: true
```

# Privacy

By default, the CLI collects anonymous usage data, which includes:

- Unique user ID
- OS Name
- Node Version
- CLI Version
- Environment (Local, Docker, CI/CD)

The usage analytics can be disabled by adding `STEPCI_DISABLE_ANALYTICS` to your env variables

## License

Step CI is distributed under Mozilla Public License terms
