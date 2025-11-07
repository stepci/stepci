# Architecture & File Structure

This guide provides a comprehensive overview of StepCI's architecture, explaining how workflows, tests, and steps work together, and how to organize your test suite effectively.

## Three-Level Hierarchy

StepCI uses a three-level hierarchical structure for organizing API tests:

```
┌─────────────────────────────────────────────────────────┐
│                  Workflow (Suite)                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │               Test 1                              │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐       │  │
│  │  │  Step 1  │→ │  Step 2  │→ │  Step 3  │       │  │
│  │  └──────────┘  └──────────┘  └──────────┘       │  │
│  │  (Sequential execution within test)              │  │
│  └───────────────────────────────────────────────────┘  │
│                          ↓                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │               Test 2                              │  │
│  │  ┌──────────┐  ┌──────────┐                      │  │
│  │  │  Step 1  │→ │  Step 2  │                      │  │
│  │  └──────────┘  └──────────┘                      │  │
│  └───────────────────────────────────────────────────┘  │
│  (Tests run concurrently)                               │
│                          ↓                               │
│  ┌───────────────────────────────────────────────────┐  │
│  │               Test 3                              │  │
│  │  ┌──────────┐                                     │  │
│  │  │  Step 1  │                                     │  │
│  │  └──────────┘                                     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Level 1: Workflow (Suite)

**Purpose**: Top-level container that defines the entire test suite

**Characteristics:**
- Contains metadata (name, version)
- Defines environment variables and configuration
- Orchestrates one or more tests
- Sets default configuration applied to all tests

**File naming**: `*.stepci.yml` (recommended), `workflow.yml`, `*.workflow.yml`

**Example:**
```yaml
version: "1.1"
name: "API Test Suite"
env:
  host: api.example.com
config:
  continueOnFail: false
tests:
  userTest:
    steps:
      - name: Get user
        http:
          url: https://${{env.host}}/users/1
          method: GET
```

### Level 2: Test

**Purpose**: Distinct test scenario with isolated context

**Characteristics:**
- Groups related API calls into logical scenarios
- Has its own context, shared across all its steps
- Runs concurrently with other tests (parallel execution)
- Can define test-specific environment variables and configuration
- Can contain `before` and `after` hooks for setup/teardown

**File naming**: `*.stepci-test.yml` (recommended), `*.test.yml`, `*-test.yml`

**Example:**
```yaml
name: "User Registration Flow"
env:
  testUser: test@example.com
steps:
  - name: Register user
    http:
      url: https://api.example.com/register
      method: POST
  - name: Verify registration
    http:
      url: https://api.example.com/verify
      method: GET
```

### Level 3: Step

**Purpose**: Single API operation or test action

**Characteristics:**
- Performs one API call (HTTP, GraphQL, gRPC, etc.)
- Executes sequentially within its test
- Can capture data from responses for use in subsequent steps
- Can validate responses using checks
- Has access to the test's shared context
- If a step fails, subsequent steps in the test are skipped

**File naming**: `*.stepci-step.yml` (recommended), `*.step.yml`, `*-step.yml`

**Example:**
```yaml
name: Login
http:
  url: https://api.example.com/auth/login
  method: POST
  json:
    email: ${{env.testUser}}
    password: secret123
captures:
  authToken:
    jsonpath: $.token
checks:
  - jsonpath: $.success
    eq: true
```

## Execution Model

### Concurrent vs Sequential Execution

Understanding when things run in parallel vs sequence is crucial:

```
Workflow
  ├─ Test 1 ───┐
  ├─ Test 2 ───┼─→ Run CONCURRENTLY (parallel)
  └─ Test 3 ───┘

Test 1
  ├─ Step 1 ─┐
  ├─ Step 2 ─┼─→ Run SEQUENTIALLY (one after another)
  └─ Step 3 ─┘
```

**Tests run concurrently:**
- Multiple tests execute in parallel
- Tests don't share context (cookies, variables, etc.)
- Total execution time ≈ longest test duration
- Use `config.concurrency` to limit parallel execution

**Steps run sequentially:**
- Steps within a test execute one at a time
- Steps share test context (can use captures from previous steps)
- Total test time = sum of all step durations
- If step N fails, steps N+1, N+2, etc. are skipped

### Context Isolation

Each test has its own isolated context:

```yaml
tests:
  test1:
    steps:
      - name: Login to test1
        # Creates authToken in test1's context
      - name: Use token
        # Can access authToken from test1's context

  test2:
    steps:
      - name: Login to test2
        # Creates authToken in test2's context (separate from test1)
      - name: Use token
        # Can access authToken from test2's context, but NOT test1's
```

**What's shared:**
- Environment variables (from workflow level)
- Configuration settings
- Secrets

**What's NOT shared:**
- Captured variables
- Cookies
- Session state

## Composability

StepCI supports importing components at all three levels using `$ref`:

```
┌─────────────────────────────────────────┐
│  Workflow                               │
│  ├─ Test A (inline)                     │
│  ├─ Test B ($ref: "tests/b.yml")  ─────┼───→ tests/b.yml
│  └─ Test C ($ref: "tests/c.yml")  ─────┼───→ tests/c.yml
└─────────────────────────────────────────┘            │
                                                        ▼
                                              ┌──────────────────┐
                                              │  tests/b.yml     │
                                              │  ├─ Step 1       │
                                              │  ├─ Step 2 ($ref)├─→ steps/login.yml
                                              │  └─ Step 3       │
                                              └──────────────────┘
```

### Benefits of Composability

1. **Reusability**: Define once, use everywhere
2. **Maintainability**: Update in one place, reflected everywhere
3. **Organization**: Separate concerns by file
4. **Collaboration**: Multiple team members can work on different files
5. **Generation**: Programmatically generate workflows from components

### Import Examples

**Workflow imports Test:**
```yaml
# workflow.yml
tests:
  userTest:
    $ref: "./tests/user.yml"
```

**Test imports Steps:**
```yaml
# tests/user.yml
steps:
  - $ref: "../steps/auth/login.yml"
  - $ref: "../steps/users/create.yml"
```

**Mixed inline and imports:**
```yaml
tests:
  quickTest:
    steps:
      - name: Inline step
        http:
          url: https://example.com
      - $ref: "./steps/verify.yml"
```

## Recommended Project Structure

### Small Projects (< 10 tests)

```
my-api-tests/
├── api-tests.stepci.yml  # Single workflow file
└── .env                  # Environment variables
```

Keep everything in one file when starting small.

### Medium Projects (10-50 tests)

```
my-api-tests/
├── api-tests.stepci.yml  # Main workflow
├── tests/
│   ├── auth.stepci-test.yml         # Authentication tests
│   ├── users.stepci-test.yml        # User tests
│   └── products.stepci-test.yml     # Product tests
└── .env
```

Split tests into separate files grouped by feature.

### Large Projects (50+ tests)

```
my-api-tests/
├── workflows/
│   ├── smoke-tests.stepci.yml       # Smoke test workflow
│   ├── regression.stepci.yml        # Full regression workflow
│   └── integration.stepci.yml       # Integration workflow
├── tests/
│   ├── auth/
│   │   ├── login.stepci-test.yml
│   │   ├── logout.stepci-test.yml
│   │   └── password-reset.stepci-test.yml
│   ├── users/
│   │   ├── create.stepci-test.yml
│   │   ├── update.stepci-test.yml
│   │   └── delete.stepci-test.yml
│   └── products/
│       ├── list.stepci-test.yml
│       └── search.stepci-test.yml
├── steps/
│   ├── auth/
│   │   ├── login.stepci-step.yml
│   │   ├── logout.stepci-step.yml
│   │   └── refresh-token.stepci-step.yml
│   ├── users/
│   │   ├── create.stepci-step.yml
│   │   ├── get.stepci-step.yml
│   │   └── update.stepci-step.yml
│   └── common/
│       ├── health-check.stepci-step.yml
│       └── wait-for-ready.stepci-step.yml
├── .env
└── README.md
```

Full separation with multiple workflows, organized by domain.

## Decision Tree: When to Use What

### When to create separate tests?

**Create separate tests when:**
- ✅ Tests are independent (don't share state)
- ✅ You want parallel execution for performance
- ✅ Tests belong to different scenarios/features
- ✅ Tests need different configurations

**Use steps in the same test when:**
- ✅ Operations must share context (cookies, session)
- ✅ Steps depend on previous steps' captured data
- ✅ Steps are part of a single user flow
- ✅ Order matters and must be sequential

### When to split into separate files?

**Keep inline when:**
- ✅ Total file < 100 lines
- ✅ Components not reused elsewhere
- ✅ Rapid prototyping/experimentation

**Split into files when:**
- ✅ File exceeds 100-200 lines
- ✅ Components reused in multiple places
- ✅ Multiple team members editing
- ✅ Want to organize by feature/domain
- ✅ Generating workflows programmatically

## Performance Optimization

### Test-Level Parallelization

Since tests run concurrently, organizing independent operations as separate tests improves performance:

**Slower (sequential):**
```yaml
tests:
  combined:
    steps:
      - name: Check API 1
        # Takes 500ms
      - name: Check API 2
        # Takes 500ms
# Total: ~1000ms
```

**Faster (parallel):**
```yaml
tests:
  api1Check:
    steps:
      - name: Check API 1
        # Takes 500ms
  api2Check:
    steps:
      - name: Check API 2
        # Takes 500ms
# Total: ~500ms (runs in parallel)
```

### Limiting Concurrency

Control parallel execution to avoid overwhelming APIs:

```yaml
config:
  concurrency: 5  # Run max 5 tests in parallel
tests:
  # Even with 20 tests, only 5 run at a time
```

## Integration with JSON Schemas

The architecture is formally defined in JSON Schemas:

- **`workflow.schema.json`** - Defines workflow structure
- **`test.schema.json`** - Defines test structure
- **`step.schema.json`** - Defines step structure

These schemas enable:
- Validation of workflow files
- Editor autocomplete and validation
- Type generation for programmatic workflow creation
- Documentation generation

See [Schemas Reference](../reference/schemas.md) for details.

## Related Documentation

- [Concepts](./concepts.md) - Core concepts overview
- [Organising Workflows](./organising-workflows.md) - Practical organization examples
- [Workflow Syntax](../reference/workflow-syntax.md) - Complete syntax reference
- [Schemas Reference](../reference/schemas.md) - JSON Schema documentation
