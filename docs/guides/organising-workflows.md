# Organising Workflows

## Overview

StepCI supports composable, modular test design through the `$ref` syntax (similar to OpenAPI). You can organize your test suite across multiple files at all three levels of the hierarchy:

```
Workflow → imports → Tests → imports → Steps
```

This allows you to:
- Keep files focused and maintainable
- Reuse common test patterns and API calls
- Organize tests by feature, service, or domain
- Share test components across teams

Environment variables and context are preserved across imported files.

## Import Hierarchy

### Workflows can import Tests

Import entire tests from external files:

**workflow.yml**
```yaml
version: "1.1"
name: "API Test Suite"
env:
  host: example.com
tests:
  userTest:
    $ref: "./tests/user-test.yml"
  productTest:
    $ref: "./tests/product-test.yml"
```

### Tests can import Steps

Import individual steps or entire test definitions:

**tests/user-test.yml**
```yaml
name: "User API Tests"
steps:
  - $ref: "../steps/login.yml"
  - $ref: "../steps/get-user.yml"
  - $ref: "../steps/logout.yml"
```

### Complete Import Example

Here's a complete example showing the full hierarchy:

**workflow.yml**
```yaml
version: "1.1"
name: "E-commerce API Tests"
env:
  host: api.example.com
  apiKey: ${{secrets.API_KEY}}
tests:
  auth:
    $ref: "./tests/auth.yml"
  products:
    $ref: "./tests/products.yml"
```

**tests/auth.yml**
```yaml
name: "Authentication Tests"
steps:
  - $ref: "../steps/auth/login.yml"
  - $ref: "../steps/auth/verify-token.yml"
  - $ref: "../steps/auth/logout.yml"
```

**steps/auth/login.yml**
```yaml
name: Login
http:
  url: https://${{env.host}}/auth/login
  method: POST
  json:
    email: test@example.com
    password: secret123
  headers:
    X-API-Key: ${{env.apiKey}}
captures:
  token:
    jsonpath: $.token
checks:
  $.success: true
```

## Splitting tests into multiple files

You can split your tests and steps into multiple files and import them into workflows using `$ref` syntax, similar to OpenAPI. This way you can still use defined environment variables and the state will be shared across steps.

**workflow.yml**

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  $ref: tests.yml
```

**tests.yml**

```yaml
example:
  steps:
    - $ref: "status.yml"
```

**status.yml**

```yaml
name: GET request
http:
  url: https://${{env.host}}
  method: GET
  check:
    status: /^20/
```

## Performance tips

For the best performance, we recommend separating requests into separate tests, if these requests don't depend on the outcome of each other. This allows our runner to execute them **concurrently**, enabling greater performance for equal amount of requests

::: warning
Note that separate tests don't share context (like cookies) with each other
:::

**Example: Two status checks (as steps)**

```yaml
version: "1.1"
name: Status Check
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://example.com
          method: GET
          check:
            status: /^20/
      - name: GET request
        http:
          url: https://stepci.com
          method: GET
          check:
            status: /^20/
```

Time:

```
1.267s
```

**Example: Two status checks (as separate tests)**

```yaml
version: "1.1"
name: Status Check
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://example.com
          method: GET
          check:
            status: /^20/
  stepci:
    steps:
      - name: GET request
        http:
          url: https://stepci.com
          method: GET
          check:
            status: /^20/
```

Time

```
0.757s
```

## File Organization Best Practices

### File Naming Conventions

Follow these recommended naming patterns for better organization and editor integration:

**Workflow files:**
- `*.stepci.yml` - Main workflow files (recommended)
- Alternative: `workflow.yml`, `*.workflow.yml`
- Place in project root or dedicated `workflows/` directory
- Example: `api-tests.stepci.yml`, `smoke-tests.stepci.yml`

**Test files:**
- `*.stepci-test.yml` - Individual test files (recommended)
- Alternative: `*.test.yml`, `*-test.yml`
- Group tests in a `tests/` directory
- Example: `tests/user-api.stepci-test.yml`, `tests/payment.stepci-test.yml`

**Step files:**
- `*.stepci-step.yml` - Individual step files (recommended)
- Alternative: `*.step.yml`, `*-step.yml`
- Group steps in a `steps/` directory
- Organize by feature: `steps/auth/`, `steps/users/`, `steps/products/`
- Example: `steps/auth/login.stepci-step.yml`, `steps/users/create.stepci-step.yml`

**Why these conventions?**
- Consistent `.stepci` prefix makes files easily identifiable
- Works well with editor schema integration (see [Editor Integration](./editor-integration.md))
- Clear distinction between file types (`-test`, `-step` suffixes)
- Compatible with existing StepCI examples and tools

### Test File Formats

Test files can be organized in two ways:

**Single Test Format** (recommended for simple scenarios):
```yaml
name: "User API Test"
steps:
  - name: Create user
    http:
      url: https://api.example.com/users
      method: POST
  - name: Get user
    http:
      url: https://api.example.com/users/1
      method: GET
```

**Multiple Tests Format** (for complex scenarios):
```yaml
createUserTest:
  name: "Create User Test"
  steps:
    - name: Create user
      http:
        url: https://api.example.com/users
        method: POST

getUserTest:
  name: "Get User Test"
  steps:
    - name: Get user
      http:
        url: https://api.example.com/users/1
        method: GET
```

### Project Structure Example

Here's an example of a well-organized test suite:

```
my-api-tests/
├── api-tests.stepci.yml                        # Main workflow
├── tests/
│   ├── auth.stepci-test.yml                   # Authentication tests
│   ├── users.stepci-test.yml                  # User management tests
│   └── products.stepci-test.yml               # Product tests
├── steps/
│   ├── auth/
│   │   ├── login.stepci-step.yml             # Reusable login step
│   │   ├── logout.stepci-step.yml            # Reusable logout step
│   │   └── verify-token.stepci-step.yml      # Token verification
│   ├── users/
│   │   ├── create.stepci-step.yml            # Create user step
│   │   ├── get.stepci-step.yml               # Get user step
│   │   └── update.stepci-step.yml            # Update user step
│   └── common/
│       ├── health-check.stepci-step.yml      # Health check step
│       └── error-handling.stepci-step.yml    # Error handling step
└── .env                                        # Environment variables
```

### When to Split Files

**Keep inline when:**
- Test suite is small (< 50 lines)
- Steps are unique and not reused
- Working on a proof of concept

**Split into files when:**
- Test suite grows beyond 100-200 lines
- Steps are reused across multiple tests
- Multiple team members work on different tests
- You need to organize by feature or service
- You want to generate tests programmatically

### Tips

1. **Start simple, refactor later**: Begin with a single workflow file and split as your test suite grows
2. **Group by feature**: Organize tests and steps by API domain (auth, users, products, etc.)
3. **Reuse common steps**: Extract frequently used steps (login, setup, teardown) into the `steps/` directory
4. **Use descriptive names**: Make file names self-documenting (`payment-success.test.yml` vs `test1.yml`)
5. **Document your structure**: Add a README.md explaining your project's organization
