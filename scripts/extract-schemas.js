#!/usr/bin/env node

/**
 * Extract Sub-Schemas from schema.json
 *
 * This script treats schema.json as the source of truth and extracts
 * three sub-schemas for editor integration:
 * - workflow.schema.json (for *.stepci.yml workflow files)
 * - test.schema.json (for *.stepci-test.yml test files)
 * - step.schema.json (for *.stepci-step.yml step files)
 */

const fs = require('fs');
const path = require('path');

// Paths
const SCHEMA_DIR = path.join(__dirname, '..', 'schemas');
const SOURCE_SCHEMA = path.join(__dirname, '..', 'schema.json');
const OUTPUT_FILES = {
  workflow: path.join(SCHEMA_DIR, 'workflow.schema.json'),
  test: path.join(SCHEMA_DIR, 'test.schema.json'),
  step: path.join(SCHEMA_DIR, 'step.schema.json')
};

/**
 * Load the source schema
 */
function loadSourceSchema() {
  if (!fs.existsSync(SOURCE_SCHEMA)) {
    console.error(`Error: Source schema not found at ${SOURCE_SCHEMA}`);
    console.error('Please run "npm run build" first to generate schema.json');
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(SOURCE_SCHEMA, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading source schema: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Deep clone an object
 */
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Extract workflow schema (for workflow files)
 * The workflow schema is essentially the full schema.json since it represents Workflow
 */
function createWorkflowSchema(sourceSchema) {
  const schema = deepClone(sourceSchema);

  // Update metadata for workflow-specific schema
  schema.$id = "https://raw.githubusercontent.com/stepci/stepci/main/schemas/workflow.schema.json";
  schema.title = "StepCI Workflow Schema";
  schema.description = "JSON Schema for StepCI workflow files (also called suites) that orchestrate multiple tests";

  return schema;
}

/**
 * Extract test schema (for test files)
 * A test file contains: name, env, steps, testdata
 */
function createTestSchema(sourceSchema) {
  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://raw.githubusercontent.com/stepci/stepci/main/schemas/test.schema.json",
    "title": "StepCI Test Schema",
    "description": "JSON Schema for StepCI test files with steps or multiple tests",
    "type": "object",
    "properties": {},
    "definitions": {}
  };

  // Extract Test properties from the workflow's tests property if available
  if (sourceSchema.properties && sourceSchema.properties.tests) {
    const testsSchema = sourceSchema.properties.tests;

    // Tests is a map, extract the value schema (individual test)
    if (testsSchema.additionalProperties) {
      schema.properties = deepClone(testsSchema.additionalProperties.properties || {});
      schema.required = testsSchema.additionalProperties.required || [];
    } else if (testsSchema.properties) {
      // Fallback: use test properties if structured differently
      schema.properties = deepClone(testsSchema.properties);
    }
  }

  // If we couldn't extract from tests, create a basic structure
  if (Object.keys(schema.properties).length === 0) {
    schema.properties = {
      name: { type: "string", description: "Test name" },
      env: { type: "object", additionalProperties: true, description: "Test-level environment variables" },
      steps: {
        type: "array",
        description: "Sequential test steps",
        items: {
          type: "object",
          description: "Step definition or reference"
        },
        minItems: 1
      }
    };
  }

  // Copy relevant definitions
  if (sourceSchema.definitions) {
    const relevantDefs = ['HTTPStep', 'GraphQLStep', 'tRPCStep', 'Step'];
    relevantDefs.forEach(defName => {
      if (sourceSchema.definitions[defName]) {
        schema.definitions[defName] = deepClone(sourceSchema.definitions[defName]);
      }
    });
  }

  // Add $ref support for step files
  schema.definitions.stepReference = {
    "type": "object",
    "description": "Reference to an external step file",
    "required": ["$ref"],
    "properties": {
      "$ref": {
        "type": "string",
        "description": "Path to external step file",
        "pattern": "^.*\\.yml$"
      }
    },
    "additionalProperties": false
  };

  return schema;
}

/**
 * Extract step schema (for step files)
 * A step file is an individual step with name and one of: http, graphql, grpc, sse, trpc, plugin, delay
 */
function createStepSchema(sourceSchema) {
  const schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "https://raw.githubusercontent.com/stepci/stepci/main/schemas/step.schema.json",
    "title": "StepCI Step Schema",
    "description": "JSON Schema for StepCI individual step files (atomic test actions)",
    "type": "object",
    "properties": {
      name: { type: "string", description: "Step name" },
      id: { type: "string", description: "Step identifier" }
    },
    "required": ["name"],
    "definitions": {}
  };

  // Copy step type definitions
  if (sourceSchema.definitions) {
    const stepDefs = ['HTTPStep', 'GraphQLStep', 'tRPCStep'];
    stepDefs.forEach(defName => {
      if (sourceSchema.definitions[defName]) {
        schema.definitions[defName] = deepClone(sourceSchema.definitions[defName]);

        // Add the step type as a property
        const propName = defName.replace('Step', '').toLowerCase();
        if (propName === 'trpc') {
          schema.properties.trpc = { "$ref": `#/definitions/${defName}` };
        } else if (propName === 'http') {
          schema.properties.http = { "$ref": `#/definitions/${defName}` };
        } else if (propName === 'graphql') {
          schema.properties.graphql = { "$ref": `#/definitions/${defName}` };
        }
      }
    });
  }

  // Add other step types
  schema.properties.grpc = { type: "object", description: "gRPC request step" };
  schema.properties.sse = { type: "object", description: "Server-Sent Events step" };
  schema.properties.plugin = { type: "object", description: "Plugin execution step" };
  schema.properties.delay = { type: "string", description: "Delay before next step" };

  // Add oneOf constraint - step must have exactly one type
  schema.oneOf = [
    { required: ["http"] },
    { required: ["graphql"] },
    { required: ["grpc"] },
    { required: ["sse"] },
    { required: ["trpc"] },
    { required: ["plugin"] },
    { required: ["delay"] }
  ];

  return schema;
}

/**
 * Write schema to file with pretty formatting
 */
function writeSchema(filePath, schema) {
  try {
    const content = JSON.stringify(schema, null, 2);
    fs.writeFileSync(filePath, content + '\n', 'utf8');
    console.log(`  ✓ ${path.relative(process.cwd(), filePath)}`);
  } catch (error) {
    console.error(`Error writing ${filePath}: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('Extracting sub-schemas from schema.json...\n');

  // Ensure schemas directory exists
  if (!fs.existsSync(SCHEMA_DIR)) {
    fs.mkdirSync(SCHEMA_DIR, { recursive: true });
  }

  // Load source schema
  const sourceSchema = loadSourceSchema();

  // Generate and write sub-schemas
  console.log('Generating schemas:');

  const workflowSchema = createWorkflowSchema(sourceSchema);
  writeSchema(OUTPUT_FILES.workflow, workflowSchema);

  const testSchema = createTestSchema(sourceSchema);
  writeSchema(OUTPUT_FILES.test, testSchema);

  const stepSchema = createStepSchema(sourceSchema);
  writeSchema(OUTPUT_FILES.step, stepSchema);

  console.log('\n✓ All sub-schemas extracted successfully');
}

// Run the script
main();
