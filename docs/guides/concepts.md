# Concepts

## Hierarchy

StepCI follows a three-level hierarchical structure for organizing API tests:

```
Workflow (Suite)
├── Test 1
│   ├── Step 1
│   ├── Step 2
│   └── Step 3
├── Test 2
│   ├── Step 1
│   └── Step 2
└── Test 3
    └── Step 1
```

**Key relationships:**
- A **Workflow** can contain **one or more Tests** (inline or imported)
- A **Test** can contain **one or more Steps** (inline or imported)
- A **Step** defines a **single test action** (HTTP request, GraphQL query, gRPC call, etc.)

## Core Concepts

### Workflows

**Workflows** (also called **Suites**) are the top-level container for your API tests. A workflow file defines:
- Meta information (name, version)
- Configuration and environment settings
- One or more tests to execute
- Default configuration applied to all tests

Workflows can import tests from external files using `$ref`, allowing you to organize complex test suites across multiple files.

**Example:**
```yaml
version: "1.1"
name: "API Test Workflow"
tests:
  userTests:
    steps:
      - name: Get user
        http:
          url: https://api.example.com/users/1
          method: GET
```

### Tests

**Tests** describe distinct test scenarios within a workflow. Key characteristics:
- Can contain multiple steps that execute sequentially
- Execute **concurrently** with other tests (parallel execution)
- Each test has its own isolated context, shared across its steps
- Tests can be defined inline or imported from external files using `$ref`
- A test file can contain either a single test or multiple tests

**Use tests to:**
- Group related API calls into logical scenarios (e.g., "User Registration Flow", "Payment Processing")
- Run independent test scenarios in parallel
- Isolate test data and context

**Example:**
```yaml
tests:
  createUserTest:
    name: Create and verify user
    steps:
      - name: Create user
        # ... step definition
      - name: Verify user exists
        # ... step definition
```

### Steps

**Steps** are the individual instructions executed by the test runner. Each step:
- Defines a single API operation (HTTP, GraphQL, gRPC, etc.)
- Contains request parameters (URL, method, headers, body)
- Can include captures to extract data from responses
- Can include checks to validate responses
- Executes **sequentially** within its test
- Has access to the test's shared context

If a step fails, all following steps in that test are skipped.

Steps can be defined inline or imported from external files using `$ref`, enabling reusable step definitions.

**Example:**
```yaml
steps:
  - name: Login
    http:
      url: https://api.example.com/auth/login
      method: POST
      json:
        email: user@example.com
        password: secret123
    captures:
      token:
        jsonpath: $.token
    checks:
      - jsonpath: $.success
        eq: true
```

### Composability

StepCI supports composable, modular test design:

- **Workflows can import Tests:** Reference external test files to organize large test suites
- **Tests can import Steps:** Reuse common step definitions across multiple tests
- **Steps can be referenced:** Create libraries of reusable API calls

This allows you to:
- Keep test files focused and maintainable
- Reuse common test patterns
- Organize tests by feature, service, or domain
- Share test components across teams

See [Organising Workflows](./organising-workflows.md) for detailed examples of composable test structures.

### Captures

Steps can specify captures to capture data from responses into named variables that can later be used in consequent requests. Also known as "request chaining"

### Checks

Steps can include checks to validate responses

### Matchers

Matchers can be used to match values against a pre-defined set of rules

### Reusables

Reusables allow you to reuse content such as schemas and credentials without repetition
