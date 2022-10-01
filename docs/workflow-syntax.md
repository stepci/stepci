#  Step CI Workflow Syntax

## YAML

Step CI workflows use YAML syntax. You can learn more about YAML from ["Learn YAML in Y minutes"](https://learnxinyminutes.com/docs/yaml/)

## Syntax

### `version`

Required. Step CI workflow file version

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
    url: https://{{env.host}}
    method: GET
```

### `config`

Optional. Workflow config

### `config.continueOnFail`

Optional. Continue workflow after step failed

### `config.rejectUnauthorized`

Optional. Reject if SSL certificate is invalid

### `config.http2`

Optional. Enable HTTP/2 support

### `steps`

Required. List of steps to be executed by runner

### `steps.<step>`

Required. The step to be executed

**Example: Checking Response Status**

```yaml
steps:
  - name: GET request
    url: https://example.com
    method: GET
    check:
      status: 200
```

### `steps.<step>.id`

Optional. Step id

### `steps.<step>.name`

Optional. Step name

### `steps.<step>.url`

Required. Request URL

### `steps.<step>.method`

Required. Request method

### `steps.<step>.headers`

Optional. Request headers

```yaml
headers:
  Content-Type: application/json
```

### `steps.<step>.body`

Optional. Request Body

```yaml
body: |
  {
    "title": "Hello Step CI!",
    "body": "This is the body",
    "userId": 1
  }
```

### `steps.<step>.params`

Optional. Query Params

```yaml
params:
  hello: world
  world: hello
```

### `steps.<step>.auth`

Optional. Basic auth

```yaml
auth:
  user: hello
  password: world
```

### `steps.<step>.cookies`

Optional. Set Cookies. Once set, the cookies will be sent in consequent requests

```yaml
cookies:
  wows: world
```

### `steps.<step>.json`

Optional. Request JSON

```yaml
json:
  title: Hello Step CI!
  body: This is the body
  userId: 1
```

### `steps.<step>.form`

Optional. Form submission

```yaml
form:
  email: hello@stepci.com
```

### `steps.<step>.formData`

Optional. Multipart Form submission

```yaml
formData:
  email: hello@stepci.com
  readme:
    file: README.md
```

### `steps.<step>.graphql`

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

### `steps.<step>.if`

Optional. Condition. For Syntax, see [Filtrex Documentation](https://github.com/joewalnes/filtrex#expressions)

```yaml
if: captures.title == "Example Domain"
```

### `steps.<step>.captures`

Optional. Capture response values into named variables

```yaml
captures:
  id:
    jsonpath: $.id
  username:
    cookie: user
```

### `steps.<step>.captures.<capture>.jsonpath`

Optional. JSONPath

```yaml
captures:
  id:
    jsonpath: $.id
```

### `steps.<step>.captures.<capture>.xpath`

Optional. XPath

```yaml
captures:
  id:
    xpath: //ID
```

### `steps.<step>.captures.<capture>.header`

Optional. Response Header

```yaml
captures:
  type:
    header: Content-Type
```

### `steps.<step>.captures.<capture>.selector`

Optional. HTML Selector

```yaml
captures:
  title:
    selector: h1
```

### `steps.<step>.captures.<capture>.cookie`

Optional. Cookie

```yaml
captures:
  user:
    cookie: user
```

### `steps.<step>.captures.<capture>.regex`

Optional. Match Regex

```yaml
captures:
  title:
    regex: <title>(.*?)<\/title>
```

### `steps.<step>.check`

Optional. Provide checks to validate responses

### `steps.<step>.check.status`

Optional. Check status code

```yaml
check:
  status: 200
```

### `steps.<step>.check.statusText`

Optional. Check status text

```yaml
check:
  statusText: OK
```

### `steps.<step>.check.redirected`

Optional. Check redirection status

```yaml
check:
  redirected: true
```

### `steps.<step>.check.redirects`

Optional. Check redirects

```yaml
check:
  redirects:
    - https://example.com/
```

### `steps.<step>.check.headers`

Optional. Check headers

```yaml
check:
  headers:
    Content-Type: application/json
```

### `steps.<step>.check.body`

Optional. Check body

```yaml
check:
  body: "Hello"
```

### `steps.<step>.check.json`

Optional. Check JSON

```yaml
check:
  json:
    hello: world
```

### `steps.<step>.check.jsonschema`

Optional. Check JSONSchema

```yaml
check:
  jsonschema:
    type: object
    properties:
      id:
        type: integer
        required: true
```

### `steps.<step>.check.jsonexample`

Optional. Check JSON example

```yaml
check:
  jsonexample:
    hello: string
```

### `steps.<step>.check.jsonpath`

Optional. Check JSONPath

```yaml
check:
  jsonpath:
    $.id: 1
```

### `steps.<step>.check.xpath`

Optional. Check XPath

```yaml
check:
  xpath:
    //SUCCESS: false
```

### `steps.<step>.check.selector`

Optional. Check HTML selector

```yaml
check:
  selector:
    h1: "Example Domain"
```

### `steps.<step>.check.cookies`

Optional. Check cookies

```yaml
check:
  cookies:
    hello: world
```

### `steps.<step>.check.captures`

Optional. Check captures

```yaml
check:
  captures:
    id: 1
```

### `steps.<step>.check.sha256`

Optional. Check SHA-256 Hash (response)

```yaml
check:
  sha256: "567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63"
```

### `steps.<step>.check.md5`

Optional. Check MD5 Hash (response)

```yaml
check:
  md5: "567cfaf94ebaf279cea4eb0bc05c4655021fb4ee004aca52c096709d3ba87a63"
```

### `steps.<step>.check.performance`

Optional. Performance Checking

```yaml
check:
  performance:
    firstByte:
      - lte: 200
    total:
      - lte: 500
```

### `steps.<step>.check.performance.wait`

Optional

```yaml
check:
  performance:
    wait: 20
```

### `steps.<step>.check.performance.dns`

Optional

```yaml
check:
  performance:
    dns: 20
```

### `steps.<step>.check.performance.tcp`

Optional

```yaml
check:
  performance:
    tcp: 20
```

### `steps.<step>.check.performance.tls`

Optional

```yaml
check:
  performance:
    tls: 20
```

### `steps.<step>.check.performance.request`

Optional

```yaml
check:
  performance:
    request: 20
```

### `steps.<step>.check.performance.firstByte`

Optional

```yaml
check:
  performance:
    firstByte: 20
```

### `steps.<step>.check.performance.download`

Optional

```yaml
check:
  performance:
    download: 20
```

### `steps.<step>.check.performance.total`

Optional

```yaml
check:
  performance:
    total: 20
```

### `steps.<step>.check.ssl`

Optional

```yaml
check:
  ssl:
    expired: false
    signed: true
    daysUntilExpiration:
      - gte: 60
```

### `steps.<step>.check.ssl.expired`

Optional

```yaml
check:
  ssl:
    expired: false
```

### `steps.<step>.check.ssl.signed`

Optional

```yaml
check:
  ssl:
    signed: true
```

### `steps.<step>.check.ssl.daysUntilExpiration`

Optional

```yaml
check:
  ssl:
    daysUntilExpiration: 30
```

### `steps.<step>.followRedirects`

Optional. Follow redirects. Enabled by default

### `steps.<step>.timeout`

Optional. Request Timeout

## Using Matchers

Matchers are useful when you want to check whether values match patterns

**Example: Time to first byte to be lower or equal 500ms**

```yaml
steps:
  - name: GET Request
    url: https://example.com
    method: GET
    check:
      performance:
        firstByte:
          - lte: 500
```

Matchers can be chained together

**Example: Chaining matchers**

```yaml
steps:
  - name: GET Request
    url: https://example.com
    method: GET
    check:
      performance:
        firstByte:
          - lte: 500
          - gte: 100
```

Available Matchers:

- `eq` - Equal (===)
- `ne` - Not equal (!==)
- `gt` - Greater than (>)
- `gte` - Greater than or equal (>=)
- `lt` - Lower than (<)
- `lte` - Lower than or equal (<=)
- `in` - Includes
- `nin` - Not includes
- `match` - Regex pattern

Boolean Matchers:

- `isNumber` - Is Number
- `isString` - Is String
- `isBoolean` - Is Boolean
- `isNull` - Is Null
- `isDefined` - Is Defined
- `isObject` - Is Object
- `isArray` - Is Array
