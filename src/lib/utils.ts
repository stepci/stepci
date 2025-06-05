import { WorkflowEnv } from '@stepci/runner'

// Check if env format matches the convention e.g. `variable=VARIABLE`
export const checkEnvFormat = (str: string) => str.match(/^(\w+=.+)$/)

// Check if all optional env variables match the required format
export const checkOptionalEnvArrayFormat = (envs?: string[]) =>
  envs?.length && !envs.every(checkEnvFormat)

// Parse every entry in optional env array to a key value pair and return as object
export function parseEnvArray(env?: string[]): WorkflowEnv {
  const entries = env?.map((opt) => {
    const eq = opt.indexOf('=')
    const key = opt.substring(0, eq)
    const value = opt.substring(eq + 1)
    return [key, value]
  })
  return Object.fromEntries(entries ?? [])
}

export function isJSON (input: string | object) {
  if (typeof input === 'object') return true
  try {
    JSON.parse(input as string)
    return true
  } catch (e) {
    return false
  }
}

// Mask secret values in text
export function maskSecrets(text: string, secrets: WorkflowEnv): string {
  if (!secrets || Object.keys(secrets).length === 0) {
    return text
  }
  
  let maskedText = text
  Object.values(secrets).forEach(secretValue => {
    if (secretValue && typeof secretValue === 'string' && secretValue.length > 0) {
      // Replace all occurrences of the secret value with fixed mask
      const regex = new RegExp(escapeRegExp(secretValue), 'g')
      maskedText = maskedText.replace(regex, '********')
    }
  })
  
  return maskedText
}

// Mask secrets in object properties
export function maskObject<T extends Record<string, any>>(obj: T, secrets: WorkflowEnv): T {
  if (!secrets || Object.keys(secrets).length === 0 || !obj) {
    return obj
  }
  
  const masked = { ...obj } as any
  
  for (const [key, value] of Object.entries(masked)) {
    if (typeof value === 'string') {
      masked[key] = maskSecrets(value, secrets)
    } else if (typeof value === 'object' && value !== null) {
      masked[key] = maskObject(value, secrets)
    }
  }
  
  return masked as T
}

// Escape special regex characters
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
