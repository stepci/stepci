import { EnvironmentVariables } from "@stepci/runner";

export const checkEnvFormat = (str: string) => str.match(/^(\w+=.+)$/)

export const checkOptionalEnvArrayFormat = (envs?: string[]) =>
  envs?.length && !envs.every(checkEnvFormat)

export const parseEnvArray = (env?: string[]): EnvironmentVariables =>
  Object.fromEntries(env?.map((opt) => opt.split("=")) ?? [])
