import chalk from 'chalk'

export const defaultText = `${chalk.blue('Welcome!')}
Step CI is an open-source framework, which helps you automate API testing and monitoring

- ${chalk.bold('Language-agnostic')}. Configure easily using YAML
- ${chalk.bold('REST, GraphQL, gRPC, tRPC, SOAP')}. Test different API types in one workflow
- ${chalk.bold('Self-hosted')}. Test services on local network
- ${chalk.bold('Integrated')}. Play nicely with others

${chalk.cyanBright('Give us your feedback on')} ${chalk.cyanBright.underline('https://step.ci/feedback')}`
