#  Workflow Syntax

## YAML

We choose YAML as a configuration format, because YAML files can be read and written by humans and machines. This allows you to write workflows by hand or generate them with code

::: tip
Learn more about YAML from ["Learn YAML in Y minutes"](https://learnxinyminutes.com/docs/yaml/)
:::

## Syntax

### `version`

Required. Workflow file version

### `name`

Required. Workflow name

### `env`

Optional. Environment Variables

```yaml
env:
  host: example.com
```

**Example: Using environment variables in steps**

```yaml
env:
  host: example.com
steps:
  - name: GET request
    http:
      url: https://${{env.host}}
      method: GET
```

### `config`

Optional. Workflow config

### `config.continueOnFail`

Optional. Continue workflow after step failed

### `config.http`

Optional. HTTP-Client config

### `config.http.rejectUnauthorized`

Optional. Reject if SSL certificate is invalid

### `config.http.baseURL`

Optional. Base URL

### `config.loadTest` <Badge text="Unstable" type="warning" />

Optional. Load-Testing configuration

```yaml
config:
  loadTest:
    phases:
    - duration: 10
      arrivalRate: 1
    - duration: 20
      arrivalRate: 100
    check:
      p99:
      - lte: 500
```

### `config.loadTest.phases` <Badge text="Unstable" type="warning" />

Required. Load-Testing phases

### `config.loadTest.phases.[phase]` <Badge text="Unstable" type="warning" />

Required. Load testing phase

### `config.loadTest.phases.[phase].duration` <Badge text="Unstable" type="warning" />

Required. Load testing phase duration

### `config.loadTest.phases.[phase].arrivalRate` <Badge text="Unstable" type="warning" />

Required. Load testing phase arrival rate (requests per second)

### `config.loadTest.check` <Badge text="Unstable" type="warning" />

Optional. Load testing checks

```yaml
check:
  p99:
    - lte: 500
```

**Available checks:**

- `avg`
- `min`
- `max`
- `med`
- `p95`
- `p99`

### `components`

Optional. OpenAPI components

### `components.schemas`

Optional. OpenAPI schemas

### `components.schemas.<schema>`

Optional. OpenAPI schema

```yaml
components:
  schemas:
    Post:
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

### `tests`

Optional. A list of tests to be executed by runner

### `include` <Badge text="New" />

Optional. A list of tests to be included from other paths

```yaml
include:
  - directory/workflow.yml
```

### `tests.<test>`

Required. A test

**Example: Checking Response Status**

```yaml
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://example.com
          method: GET
          check:
            status: 200
```

### `tests.<test>.name`

Optional. Test name

### `tests.<test>.env`

Optional. Environment Variables

```yaml
tests:
  example:
    env:
      host: example.com
```

### `tests.<test>.config`

Optional. Workflow config

### `tests.<test>.config.continueOnFail`

Optional. Continue workflow after step failed

### `tests.<test>.testdata`

Optional. Provide test data

**Example: From csv file**

```yaml
testdata:
  file: testdata.csv
```

**Example: From csv string**

```yaml
testdata: |
  username,password
  mish,ushakov
```

### `tests.<test>.testdata.file`

Required. Test data file

### `tests.<test>.testdata.options`

Optional. Test data parsing options

```yaml
delimiter: ","
quote: "'"
escape: '"'
headers:
  - one
  - two
```

### `tests.<test>.testdata.options.delimiter`

Optional. The delimiter that will separate columns

### `tests.<test>.testdata.options.quote`

Optional. The character to use to quote fields that contain a delimiter

### `tests.<test>.testdata.options.escape`

The character to used to escape quotes inside of a quoted field

### `tests.<test>.testdata.options.headers`

Optional. The first row is always treated as headers. Otherwise, you can provide a list of headers

### `tests.<test>.steps`

Required. A list of steps to be executed by runner

### `tests.<test>.steps.<step>`

Required. The step to be executed

**Example: Checking Response Status**

```yaml
steps:
  - name: GET request
    url: https://example.com
    http:
      method: GET
      check:
        status: 200
```

### `tests.<test>.steps.<step>.id`

Optional. Step id

### `tests.<test>.steps.<step>.name`

Optional. Step name

### `tests.<test>.steps.<step>.if`

Optional. Condition. For Syntax, see [Filtrex Documentation](https://github.com/joewalnes/filtrex#expressions)

```yaml
if: captures.title == "Example Domain"
```

### `tests.<test>.steps.<step>.http`

Optional. HTTP Step

### `tests.<test>.steps.<step>.http.url`

Required. Request URL

### `tests.<test>.steps.<step>.http.method`

Required. Request method

### `tests.<test>.steps.<step>.http.headers`

Optional. Request headers

```yaml
headers:
  Content-Type: application/json
```

### `tests.<test>.steps.<step>.http.body`

Optional. Request Body

```yaml
body: |
  {
    "title": "Hello Step CI!",
    "body": "This is the body",
    "userId": 1
  }
```

File as a body

```yaml
body:
  file: README.md
```

### `tests.<test>.steps.<step>.http.params`

Optional. Query Params

```yaml
params:
  hello: world
  world: hello
```

### `tests.<test>.steps.<step>.http.auth`

Optional. Auth configuration

### `tests.<test>.steps.<step>.http.auth.basic`

Optional. Basic Auth

```yaml
auth:
  basic:
    username: hello
    password: world
```

### `tests.<test>.steps.<step>.http.auth.bearer`

Optional. Bearer Auth

```yaml
auth:
  bearer:
    token: hello world
```

### `tests.<test>.steps.<step>.http.auth.oauth` <Badge text="New" />

Optional. OAuth

```yaml
auth:
  oauth:
    endpoint: "https://stepci.eu.auth0.com/oauth/token"
    client_id: ""
    client_secret: ""
    audience: ""
```

### `tests.<test>.steps.<step>.http.auth.oauth.endpoint` <Badge text="New" />

Required. OAuth endpoint

### `tests.<test>.steps.<step>.http.auth.oauth.client_id` <Badge text="New" />

Required. OAuth Client ID

### `tests.<test>.steps.<step>.http.auth.oauth.client_secret` <Badge text="New" />

Required. OAuth Client Secret

### `tests.<test>.steps.<step>.http.auth.oauth.audience` <Badge text="New" />

Optional. OAuth Client Audience

### `tests.<test>.steps.<step>.http.auth.certificate` <Badge text="New" />

Optional. Client Certificate auth

```yaml
auth:
  certificate:
    ca: |
      content
    cert: |
      content
    key: |
      content
```

Can be files

```yaml
auth:
  certificate:
    ca:
      file: file.cert
    cert:
      file: file.cert
    key:
      file: file.key
```

### `tests.<test>.steps.<step>.http.auth.certificate.ca` <Badge text="New" />

Optional. Client Certificate Authority

Can be a file

### `tests.<test>.steps.<step>.http.auth.certificate.cert` <Badge text="New" />

Required. Client Certificate

Can be a file

### `tests.<test>.steps.<step>.http.auth.certificate.key` <Badge text="New" />

Required. Client Certificate Key

Can be a file

### `tests.<test>.steps.<step>.http.cookies`

Optional. Set Cookies. Once set, the cookies will be sent in consequent requests

```yaml
cookies:
  wows: world
```

### `tests.<test>.steps.<step>.http.json`

Optional. Request JSON

```yaml
json:
  title: Hello Step CI!
  body: This is the body
  userId: 1
```

### `tests.<test>.steps.<step>.http.form`

Optional. Form submission

```yaml
form:
  email: hello@stepci.com
```

### `tests.<test>.steps.<step>.http.formData`

Optional. Multipart Form submission

```yaml
formData:
  email: hello@stepci.com
  readme:
    file: README.md
```

### `tests.<test>.steps.<step>.http.graphql`

Optional. GraphQL Data

```yaml
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
```

### `tests.<test>.steps.<step>.http.graphql.query`

Optional. GraphQL query

### `tests.<test>.steps.<step>.http.graphql.variables`

Optional. GraphQL variables

### `tests.<test>.steps.<step>.http.trpc` <Badge text="New" />

Optional. tRPC request

### `tests.<test>.steps.<step>.http.trpc.query.<procedure>` <Badge text="New" />

Optional. tRPC query

```yaml
trpc:
  query:
    greet: Hello
```

### `tests.<test>.steps.<step>.http.trpc.mutation.<procedure>` <Badge text="New" />

Optional. tRPC mutation

```yaml
trpc:
  mutation:
    addUser:
      name: Mish
```

### `tests.<test>.steps.<step>.http.captures`

Optional. Capture response values into named variables

```yaml
captures:
  id:
    jsonpath: $.id
  username:
    cookie: user
```

### `tests.<test>.steps.<step>.http.captures.<capture>.jsonpath`

Optional. JSONPath

```yaml
captures:
  id:
    jsonpath: $.id
```

### `tests.<test>.steps.<step>.http.captures.<capture>.xpath`

Optional. XPath

```yaml
captures:
  id:
    xpath: //ID
```

### `tests.<test>.steps.<step>.http.captures.<capture>.header`

Optional. Response Header

```yaml
captures:
  type:
    header: Content-Type
```

### `tests.<test>.steps.<step>.http.captures.<capture>.selector`

Optional. HTML Selector

```yaml
captures:
  title:
    selector: h1
```

### `tests.<test>.steps.<step>.http.captures.<capture>.cookie`

Optional. Cookie

```yaml
captures:
  user:
    cookie: user
```

### `tests.<test>.steps.<step>.http.captures.<capture>.regex`

Optional. Match Regex

```yaml
captures:
  title:
    regex: <title>(.*?)<\/title>
```

### `tests.<test>.steps.<step>.http.check`

Optional. Provide checks to validate responses

### `tests.<test>.steps.<step>.http.check.status`

Optional. Check status code

```yaml
check:
  status: 200
```

### `tests.<test>.steps.<step>.http.check.statusText`

Optional. Check status text

```yaml
check:
  statusText: OK
```

### `tests.<test>.steps.<step>.http.check.redirected`

Optional. Check redirection status

```yaml
check:
  redirected: true
```

### `tests.<test>.steps.<step>.http.check.redirects`

Optional. Check redirects

```yaml
check:
  redirects:
    - https://example.com/
```

### `tests.<test>.steps.<step>.http.check.headers`

Optional. Check headers

```yaml
check:
  headers:
    Content-Type: application/json
```

### `tests.<test>.steps.<step>.http.check.body`

Optional. Check body

```yaml
check:
  body: "Hello"
```

### `tests.<test>.steps.<step>.http.check.json`

Optional. Check JSON

```yaml
check:
  json:
    hello: world
```

### `tests.<test>.steps.<step>.http.check.schema`

Optional. Check response against JSON Schema

```yaml
check:
  schema:
    type: object
    properties:
      id:
        type: integer
        required: true
```

### `tests.<test>.steps.<step>.http.check.jsonpath`

Optional. Check JSONPath

```yaml
check:
  jsonpath:
    $.id: 1
```

### `tests.<test>.steps.<step>.http.check.xpath`

Optional. Check XPath

```yaml
check:
  xpath:
    //SUCCESS: false
```

### `tests.<test>.steps.<step>.http.check.selectors`

Optional. Check CSS selectors

```yaml
check:
  selector:
    h1: "Example Domain"
```

### `tests.<test>.steps.<step>.http.check.cookies`

Optional. Check cookies

```yaml
check:
  cookies:
    hello: world
```

### `tests.<test>.steps.<step>.http.check.captures`

Optional. Check captures

```yaml
check:
  captures:
    id: 1
```

### `tests.<test>.steps.<step>.http.check.sha256`

Optional. Check SHA-256 Hash (response)

```yaml
check:
  sha256: "567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63"
```

### `tests.<test>.steps.<step>.http.check.md5`

Optional. Check MD5 Hash (response)

```yaml
check:
  md5: "567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63"
```

### `tests.<test>.steps.<step>.http.check.size`

Optional. Check response size (in bytes)

```yaml
check:
  size: 1024
```

### `tests.<test>.steps.<step>.http.check.performance`

Optional. Performance Checking

```yaml
check:
  performance:
    firstByte:
      - lte: 200
    total:
      - lte: 500
```

**Available checks:**

- `wait`
- `dns`
- `tcp`
- `tls`
- `request`
- `firstByte`
- `download`
- `total`

### `tests.<test>.steps.<step>.http.check.ssl`

Optional. SSL Certificate Validation

```yaml
check:
  ssl:
    valid: true
    signed: true
    daysUntilExpiration:
      - gte: 60
```

### `tests.<test>.steps.<step>.http.check.ssl.valid`

Optional

```yaml
check:
  ssl:
    valid: true
```

### `tests.<test>.steps.<step>.http.check.ssl.signed`

Optional

```yaml
check:
  ssl:
    signed: true
```

### `tests.<test>.steps.<step>.http.check.ssl.daysUntilExpiration`

Optional

```yaml
check:
  ssl:
    daysUntilExpiration: 30
```

### `tests.<test>.steps.<step>.http.check.co2`

Optional. Check co2 emissions of the response in grams

```yaml
check:
  co2:
    - lte: 1
```

### `tests.<test>.steps.<step>.http.followRedirects`

Optional. Follow redirects. Enabled by default

### `tests.<test>.steps.<step>.http.timeout`

Optional. Request Timeout

### `tests.<test>.steps.<step>.grpc`

Optional. gRPC Step

```yaml
grpc:
  proto:
    - public/helloworld.proto
  host: 0.0.0.0:50051
  service: helloworld.Greeter
  method: SayHello
  data:
    name: world!
  check:
    jsonpath:
      $.message: Hello world!
```

### `tests.<test>.steps.<step>.grpc.proto`

Required. gRPC protocol buffer file path

### `tests.<test>.steps.<step>.grpc.host`

Required. gRPC proto file

### `tests.<test>.steps.<step>.grpc.service`

Required. gRPC service

### `tests.<test>.steps.<step>.grpc.method`

Required. gRPC method

### `tests.<test>.steps.<step>.grpc.data`

Required. gRPC data

### `tests.<test>.steps.<step>.grpc.metadata`

Optional. gRPC metadata

### `tests.<test>.steps.<step>.grpc.tls`

Optional. gRPC TLS config

```yaml
tls:
  rootCerts: |
    content
  privateKey: |
    content
  certChain: |
    content
```

Can be files:

```yaml
tls:
  rootCerts:
    file: root.cert
  privateKey:
    file: key.cert
  certChain:
    file: chain.cert
```

### `tests.<test>.steps.<step>.grpc.tls.rootCerts`

Optional. gRPC TLS root certificate

Can be a file

### `tests.<test>.steps.<step>.grpc.tls.privateKey`

Optional. gRPC TLS private key

Can be a file

### `tests.<test>.steps.<step>.grpc.tls.certChain`

Optional. gRPC TLS certificate chain

Can be a file

### `tests.<test>.steps.<step>.grpc.captures`

Optional. Capture response values into named variables

```yaml
captures:
  id:
    jsonpath: $.id
```

### `tests.<test>.steps.<step>.grpc.captures.<capture>.jsonpath`

Optional. JSONPath

```yaml
captures:
  id:
    jsonpath: $.id
```

### `tests.<test>.steps.<step>.grpc.check`

Optional. Provide checks to validate responses

### `tests.<test>.steps.<step>.grpc.check.json`

Optional. Check JSON

```yaml
check:
  json:
    hello: world
```

### `tests.<test>.steps.<step>.grpc.check.schema`

Optional. Check response against JSON Schema

```yaml
check:
  schema:
    type: object
    properties:
      id:
        type: integer
        required: true
```

### `tests.<test>.steps.<step>.grpc.check.jsonpath`

Optional. Check JSONPath

```yaml
check:
  jsonpath:
    $.id: 1
```

### `tests.<test>.steps.<step>.grpc.check.captures`

Optional. Check captures

```yaml
check:
  captures:
    id: 1
```

### `tests.<test>.steps.<step>.grpc.check.size`

Optional. Check response size (in bytes)

```yaml
check:
  size: 1024
```

### `tests.<test>.steps.<step>.grpc.check.performance`

Optional. Performance Checking

```yaml
check:
  performance:
    total:
      - lte: 500
```

### `tests.<test>.steps.<step>.grpc.check.performance.total`

Optional

```yaml
check:
  performance:
    total: 20
```

### `tests.<test>.steps.<step>.grpc.check.co2`

Optional. Check co2 emissions of the response in grams

```yaml
check:
  co2:
    - lte: 1
```
