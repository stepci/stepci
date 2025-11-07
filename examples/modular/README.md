# Modular Workflow Example

This example demonstrates how to organize a large StepCI test suite using modular file structure with separate workflow, test, and step files.

## Project Structure

```
modular/
├── api-workflow.yml          # Main workflow file (entry point)
├── .env.example              # Example environment variables
├── tests/                    # Test files
│   ├── auth.yml             # Authentication test
│   ├── product-management.yml # Product CRUD operations
│   ├── product-search.yml   # Search functionality
│   └── order-flow.yml       # Complete order workflow
└── steps/                    # Reusable step files
    ├── login.yml            # Authentication step
    ├── get-products.yml     # Retrieve products
    ├── create-product.yml   # Create new product
    ├── get-product-details.yml # Get product details
    ├── update-product.yml   # Update product
    ├── delete-product.yml   # Delete product
    ├── create-order.yml     # Create order
    └── get-order-status.yml # Check order status
```

## Three-Level Hierarchy

This example demonstrates StepCI's three-level architecture:

```
┌─────────────────────────────────────────────────────────┐
│         Workflow (api-workflow.yml)                     │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Test: Authentication (tests/auth.yml)           │  │
│  │    → Step: login.yml                             │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Test: Product Management                         │  │
│  │    → Step: login.yml                             │  │
│  │    → Step: get-products.yml                      │  │
│  │    → Step: create-product.yml                    │  │
│  │    → Step: get-product-details.yml               │  │
│  │    → Step: update-product.yml                    │  │
│  │    → Step: delete-product.yml                    │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Test: Order Flow (tests/order-flow.yml)        │  │
│  │    → Step: login.yml                             │  │
│  │    → Step: create-product.yml                    │  │
│  │    → Step: create-order.yml                      │  │
│  │    → Step: get-order-status.yml                  │  │
│  │    → Step: delete-product.yml                    │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Level 1: Workflow (`api-workflow.yml`)

The main entry point that:
- Defines environment variables and configuration
- Imports multiple test files using `$ref`
- Includes setup (`before`) and teardown (`after`) hooks
- Orchestrates test execution

### Level 2: Tests (`tests/*.yml`)

Individual test scenarios that:
- Import reusable step files using `$ref`
- Can include inline steps alongside imported ones
- Run concurrently (by default)
- Have isolated contexts (variables, captures, cookies)

### Level 3: Steps (`steps/*.yml`)

Atomic API operations that:
- Define a single HTTP request with checks and captures
- Are reusable across multiple tests
- Execute sequentially within a test
- Share context within their parent test

## Running the Example

### Prerequisites

```bash
# Install StepCI
npm install -g stepci
```

### Run the Workflow

```bash
# From the modular directory
stepci run api-workflow.yml

# Or from the project root
stepci run examples/modular/api-workflow.yml
```

### Run Individual Tests

You can also run individual test files:

```bash
# Run only the authentication test
stepci run tests/auth.yml

# Run only product management test
stepci run tests/product-management.yml
```

### Using Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your values
# Then run with environment variables
export $(cat .env | xargs) && stepci run api-workflow.yml
```

## Key Features Demonstrated

### 1. File References with `$ref`

**Importing tests into workflow:**
```yaml
tests:
  authentication:
    $ref: ./tests/auth.yml
```

**Importing steps into tests:**
```yaml
steps:
  - $ref: ../steps/login.yml
  - $ref: ../steps/get-products.yml
```

### 2. Variable Sharing

**Workflow-level environment variables:**
```yaml
env:
  API_USERNAME: test@example.com
  API_PASSWORD: testpassword123
```

**Captured values shared between steps:**
```yaml
# Step 1: Capture auth token
captures:
  authToken:
    jsonpath: $.token

# Step 2: Use captured token
headers:
  Authorization: Bearer ${{ captures.authToken }}
```

### 3. Reusable Steps

The `login.yml` step is reused across multiple tests:
- `auth.yml` - Tests authentication
- `product-management.yml` - Needs auth for product operations
- `order-flow.yml` - Needs auth for order operations
- `product-search.yml` - Needs auth for searching

### 4. Mixed Inline and Referenced Content

Tests can combine both:
```yaml
steps:
  - $ref: ../steps/login.yml           # Imported step
  - name: Custom Step                   # Inline step
    http:
      url: /custom-endpoint
      method: GET
```

### 5. Setup and Teardown

```yaml
before:
  name: Setup
  steps:
    - name: Health Check
      http:
        url: /health
        method: GET

after:
  name: Teardown
  steps:
    - name: Log Completion
      http:
        url: /logs
        method: POST
```

## Benefits of Modular Structure

### For Small Teams (1-10 tests)
- ✅ Still beneficial for commonly reused steps (login, setup)
- ✅ Easy to understand and maintain
- ✅ Lower barrier to entry

### For Medium Teams (10-50 tests)
- ✅ **Reusability**: Write common steps once, use everywhere
- ✅ **Maintainability**: Update authentication in one place
- ✅ **Organization**: Clear separation of concerns
- ✅ **Collaboration**: Multiple people can work on different tests

### For Large Teams (50+ tests)
- ✅ **Scalability**: Organized structure prevents chaos
- ✅ **DRY Principle**: Don't Repeat Yourself
- ✅ **Easier Debugging**: Find and fix issues in specific files
- ✅ **Version Control**: Cleaner diffs and easier code reviews
- ✅ **Onboarding**: New team members understand structure quickly

## File Naming Conventions

This example follows recommended conventions:

- **Workflows**: `*.yml` or `*-workflow.yml` or `*.stepci.yml`
- **Tests**: `*.yml` in `tests/` directory
- **Steps**: `*.yml` in `steps/` directory

You can also use more explicit naming:
- **Workflows**: `*.stepci.yml`
- **Tests**: `*.stepci-test.yml`
- **Steps**: `*.stepci-step.yml`

## Editor Integration

For autocomplete and validation, configure your editor:

**VSCode (`.vscode/settings.json`):**
```json
{
  "yaml.schemas": {
    "../../schemas/workflow.schema.json": ["api-workflow.yml"],
    "../../schemas/test.schema.json": ["tests/*.yml"],
    "../../schemas/step.schema.json": ["steps/*.yml"]
  }
}
```

**Inline schema directives:**
```yaml
# yaml-language-server: $schema=../../schemas/workflow.schema.json
version: "1.1"
name: My Workflow
```

## Next Steps

### Expand the Structure

As your test suite grows:

```
modular/
├── api-workflow.yml
├── tests/
│   ├── auth/
│   │   ├── login.yml
│   │   ├── logout.yml
│   │   └── password-reset.yml
│   ├── products/
│   │   ├── crud.yml
│   │   └── search.yml
│   └── orders/
│       ├── create.yml
│       └── cancel.yml
└── steps/
    ├── auth/
    │   └── login.yml
    ├── products/
    │   ├── create-product.yml
    │   └── get-products.yml
    └── orders/
        └── create-order.yml
```

### Add CI/CD Integration

```yaml
# .github/workflows/api-tests.yml
name: API Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install StepCI
        run: npm install -g stepci
      - name: Run Tests
        run: stepci run examples/modular/api-workflow.yml
        env:
          API_USERNAME: ${{ secrets.API_USERNAME }}
          API_PASSWORD: ${{ secrets.API_PASSWORD }}
```

## Learn More

- [StepCI Documentation](https://docs.stepci.com)
- [Organizing Workflows Guide](https://docs.stepci.com/guides/organising-workflows.html)
- [Architecture Guide](https://docs.stepci.com/guides/architecture.html)
- [Workflow Syntax Reference](https://docs.stepci.com/reference/workflow-syntax.html)
