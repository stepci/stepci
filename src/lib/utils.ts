import { WorkflowEnv } from '@stepci/runner'

// Check if env format matches the convention e.g. `variable=VARIABLE`
export const checkEnvFormat = (str: string) => str.match(/^(\w+=.+)$/)

// Check if all optional env variables match the required format
export const checkOptionalEnvArrayFormat = (envs?: string[]) =>
  envs?.length && !envs.every(checkEnvFormat)

// Parse every entry in optional env array to a key value pair and return as object
export const parseEnvArray = (env?: string[]): WorkflowEnv =>
  Object.fromEntries(env?.map((opt) => opt.split('=')) ?? [])
