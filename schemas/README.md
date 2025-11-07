# StepCI Schema Files

This directory contains JSON schemas extracted from the main `schema.json` file for editor integration support.

## Generated Files

These files are **auto-generated** from `schema.json` and should not be edited manually:

- **`workflow.schema.json`** - Schema for workflow/suite files (`*.stepci.yml`)
- **`test.schema.json`** - Schema for test files (`*.stepci-test.yml`)
- **`step.schema.json`** - Schema for step files (`*.stepci-step.yml`)

## Source of Truth

The **`schema.json`** file in the project root is the source of truth. It is generated from TypeScript types in the `@stepci/runner` package.

## Regenerating Schemas

The sub-schemas are automatically regenerated when you run:

```bash
npm run build        # Builds TypeScript and generates all schemas
npm run build:schemas # Only regenerates sub-schemas from schema.json
```

## How It Works

1. `schema.json` is generated from the `Workflow` TypeScript type via `typescript-json-schema`
2. The `scripts/extract-schemas.js` script reads `schema.json` and extracts:
   - **workflow.schema.json** - The complete Workflow schema (for `.stepci.yml` files)
   - **test.schema.json** - Extracted from the `tests` property (for `.stepci-test.yml` files)
   - **step.schema.json** - Extracted step definitions (for `.stepci-step.yml` files)

## Editor Integration

These schemas enable autocomplete and validation in editors. Add to your `.vscode/settings.json`:

```json
{
  "yaml.schemas": {
    "./schemas/workflow.schema.json": ["*.stepci.yml"],
    "./schemas/test.schema.json": ["**/*.stepci-test.yml"],
    "./schemas/step.schema.json": ["**/*.stepci-step.yml"]
  }
}
```

## Important Notes

- **Do not manually edit** files in this directory - they will be overwritten
- Modify `schema.json` (via TypeScript types) as the source of truth
- Run `npm run build:schemas` after updating TypeScript types
- The build process automatically runs the extraction script via the `postbuild` hook
