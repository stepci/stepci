# JSON Schemas

StepCI provides JSON Schema definitions for workflows, tests, and steps. These schemas enable validation, editor integration, and programmatic workflow generation.

## Overview

The schemas mirror StepCI's three-level hierarchy:

```
workflow.schema.json (Workflow/Suite)
    ↓ references
test.schema.json (Test)
    ↓ references
step.schema.json (Step)
```

Each schema can be used independently to validate its corresponding file type, or together to validate complete workflow structures.

## Available Schemas

### workflow.schema.json - Workflow Schema

**Purpose**: Defines the top-level workflow (suite) structure

**Location**: [`/schemas/workflow.schema.json`](../../schemas/workflow.schema.json)

**Validates**:
- Workflow files (`.yml`, `.yaml`, `.json`)
- Complete workflow structure with metadata, config, and tests

**Key Properties**:
- `version` - Workflow file version (required)
- `name` - Workflow name (required)
- `env` - Environment variables (optional)
- `config` - Workflow configuration (optional)
- `tests` - Test definitions (required)

**Example usage**:
```yaml
# yaml-language-server: $schema=../../schemas/workflow.schema.json
version: "1.1"
name: "API Test Suite"
tests:
  example:
    steps:
      - name: Test
        http:
          url: https://example.com
```

### test.schema.json - Test Schema

**Purpose**: Defines individual test structure

**Location**: [`/schemas/test.schema.json`](../../schemas/test.schema.json)

**Validates**:
- Standalone test files
- Test definitions within workflows
- Both single-test and multi-test files

**Key Properties**:
- `name` - Test name (optional)
- `steps` - Array of step definitions (required for single test)
- `tests` - Object containing multiple tests (for multi-test files)
- `before` - Setup steps to run before test (optional)
- `after` - Teardown steps to run after test (optional)
- `env` - Test-specific environment variables (optional)
- `config` - Test-specific configuration (optional)

**Example usage** (single test):
```yaml
# yaml-language-server: $schema=../../schemas/test.schema.json
name: "User API Test"
steps:
  - name: Get user
    http:
      url: https://api.example.com/users/1
      method: GET
```

**Example usage** (multiple tests):
```yaml
# yaml-language-server: $schema=../../schemas/test.schema.json
createUser:
  name: "Create User"
  steps:
    - name: Create
      http:
        url: https://api.example.com/users
        method: POST

getUser:
  name: "Get User"
  steps:
    - name: Get
      http:
        url: https://api.example.com/users/1
        method: GET
```

### step.schema.json - Step Schema

**Purpose**: Defines individual step structure

**Location**: [`/schemas/step.schema.json`](../../schemas/step.schema.json)

**Validates**:
- Standalone step files
- Step definitions within tests
- All step types (HTTP, GraphQL, gRPC, etc.)

**Key Properties**:
- `name` - Step name (required)
- Step type properties: `http`, `graphql`, `grpc`, `trpc`, `plugin`
- `captures` - Data extraction from responses (optional)
- `checks` - Response validation rules (optional)

**Example usage**:
```yaml
# yaml-language-server: $schema=../../schemas/step.schema.json
name: Login
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

## Using the Schemas

### 1. Editor Integration

Enable schema validation in your editor for autocomplete, validation, and inline documentation.

**VSCode / YAML Language Server**

Add a schema directive at the top of your YAML files:

```yaml
# yaml-language-server: $schema=path/to/schema.json
version: "1.1"
name: "My Workflow"
```

Or configure in VSCode settings:
```json
{
  "yaml.schemas": {
    "./schemas/workflow.schema.json": ["*workflow.yml", "workflow.yml"],
    "./schemas/test.schema.json": ["**/*.test.yml", "**/tests/*.yml"],
    "./schemas/step.schema.json": ["**/*.step.yml", "**/steps/*.yml"]
  }
}
```

**IntelliJ IDEA / JetBrains IDEs**

1. Go to Settings → Languages & Frameworks → Schemas and DTDs → JSON Schema Mappings
2. Add schema files and map to file patterns

See [Editor Integration](../guides/editor-integration.md) for detailed setup instructions.

### 2. Validation in CI/CD

Validate workflow files as part of your CI/CD pipeline to catch errors before execution.

**Using ajv-cli** (recommended):

```bash
# Install ajv-cli
npm install -g ajv-cli

# Validate a workflow file
ajv validate -s schemas/workflow.schema.json -d workflow.yml

# Validate multiple files
ajv validate -s schemas/test.schema.json -d "tests/*.yml"
```

**Using check-jsonschema**:

```bash
# Install check-jsonschema
pip install check-jsonschema

# Validate workflow
check-jsonschema --schemafile schemas/workflow.schema.json workflow.yml
```

**GitHub Actions Example**:

```yaml
name: Validate Workflows
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install -g ajv-cli
      - run: ajv validate -s schemas/workflow.schema.json -d "*.workflow.yml"
      - run: ajv validate -s schemas/test.schema.json -d "tests/*.yml"
```

### 3. Programmatic Workflow Generation

Use schemas to validate dynamically generated workflows in your code.

**JavaScript/TypeScript**:

```javascript
import Ajv from 'ajv';
import suiteSchema from './schemas/workflow.schema.json';

const ajv = new Ajv();
const validate = ajv.compile(suiteSchema);

const workflow = {
  version: "1.1",
  name: "Generated Workflow",
  tests: {
    example: {
      steps: [
        {
          name: "Test",
          http: {
            url: "https://example.com",
            method: "GET"
          }
        }
      ]
    }
  }
};

const valid = validate(workflow);
if (!valid) {
  console.error('Validation errors:', validate.errors);
}
```

**Python**:

```python
import jsonschema
import yaml

with open('schemas/workflow.schema.json') as f:
    schema = yaml.safe_load(f)

workflow = {
    'version': '1.1',
    'name': 'Generated Workflow',
    'tests': {
        'example': {
            'steps': [
                {
                    'name': 'Test',
                    'http': {
                        'url': 'https://example.com',
                        'method': 'GET'
                    }
                }
            ]
        }
    }
}

try:
    jsonschema.validate(workflow, schema)
    print("Workflow is valid!")
except jsonschema.ValidationError as e:
    print(f"Validation error: {e.message}")
```

### 4. Type Generation

Generate TypeScript types or other language types from schemas.

**Using json-schema-to-typescript**:

```bash
# Install
npm install -g json-schema-to-typescript

# Generate types
json-schema-to-typescript schemas/workflow.schema.json -o types/workflow.d.ts
json-schema-to-typescript schemas/test.schema.json -o types/test.d.ts
json-schema-to-typescript schemas/step.schema.json -o types/step.d.ts
```

**Generated types example**:
```typescript
import { Workflow } from './types/workflow';

const workflow: Workflow = {
  version: "1.1",
  name: "Type-safe Workflow",
  tests: {
    example: {
      steps: [
        {
          name: "Test",
          http: {
            url: "https://example.com",
            method: "GET"
          }
        }
      ]
    }
  }
};
```

## Schema Relationships

The schemas are designed to work together while remaining independently usable:

```
┌─────────────────────────────────────────┐
│  workflow.schema.json                      │
│  ├─ version: string                     │
│  ├─ name: string                        │
│  ├─ env: object                         │
│  ├─ config: object                      │
│  └─ tests: object                       │
│      └─ [testName]: ───────────────────┼──→ references test.schema.json
└─────────────────────────────────────────┘
                                          │
                ┌─────────────────────────▼────────────┐
                │  test.schema.json                    │
                │  ├─ name: string                     │
                │  ├─ env: object                      │
                │  ├─ config: object                   │
                │  ├─ before: array                    │
                │  ├─ after: array                     │
                │  └─ steps: array                     │
                │      └─ [step]: ─────────────────────┼──→ references step.schema.json
                └──────────────────────────────────────┘
                                                       │
                        ┌──────────────────────────────▼──────┐
                        │  step.schema.json                   │
                        │  ├─ name: string                    │
                        │  ├─ http/graphql/grpc/etc: object   │
                        │  ├─ captures: object                │
                        │  └─ checks: array                   │
                        └─────────────────────────────────────┘
```

This modular design means:
- Each schema can validate its level independently
- Schemas reference each other for complete validation
- You can build workflows from validated components
- Changes to one schema don't require changes to others (unless breaking)

## Common Validation Errors

### Missing Required Fields

```yaml
# ❌ Error: Missing 'version' field
name: "My Workflow"
tests:
  example:
    steps: []

# ✅ Fixed: Added version
version: "1.1"
name: "My Workflow"
tests:
  example:
    steps: []
```

### Invalid Property Types

```yaml
# ❌ Error: 'version' must be a string
version: 1.1
name: "My Workflow"

# ✅ Fixed: Version as string
version: "1.1"
name: "My Workflow"
```

### Unknown Properties

```yaml
# ❌ Error: 'unknownField' is not a valid property
version: "1.1"
name: "My Workflow"
unknownField: "value"

# ✅ Fixed: Removed unknown field
version: "1.1"
name: "My Workflow"
```

### Empty Required Arrays

```yaml
# ❌ Error: 'steps' array cannot be empty
tests:
  example:
    steps: []

# ✅ Fixed: Added at least one step
tests:
  example:
    steps:
      - name: Test
        http:
          url: https://example.com
```

## Best Practices

1. **Enable schema validation in your editor** - Catch errors while writing workflows
2. **Validate in CI/CD** - Prevent invalid workflows from being deployed
3. **Use schema directives** - Add `# yaml-language-server` comments to files
4. **Generate types for programmatic workflows** - Ensure type safety when generating workflows
5. **Keep schemas updated** - If you extend StepCI with plugins, update schemas accordingly
6. **Use specific schemas for specific files** - Use `test.schema.json` for test files, not `workflow.schema.json`

## Terminology: Workflow vs Suite

You may notice the main schema is named `workflow.schema.json` while the documentation uses "Workflow":

- **Workflow** is the preferred term in documentation and CLI
- **Suite** is used in schema filenames for historical reasons
- They refer to the same concept: the top-level container for tests

Both terms are valid, but "Workflow" is recommended for consistency with the rest of the documentation.

## Related Documentation

- [Workflow Syntax](./workflow-syntax.md) - Complete syntax reference
- [Architecture](../guides/architecture.md) - Understanding the three-level hierarchy
- [Editor Integration](../guides/editor-integration.md) - Setting up schema validation in editors
- [Organising Workflows](../guides/organising-workflows.md) - File organization examples
