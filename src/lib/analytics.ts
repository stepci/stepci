import { PostHog } from 'posthog-node'
import os from 'os'
import { randomUUID } from 'crypto'
import ci from 'ci-info'
import isDocker from 'is-docker'
import Conf from 'conf'

const config = new Conf()
if (!config.get('uid')) config.set('uid', randomUUID())

const uid = config.get('uid')
const posthog = new PostHog(
  'phc_SIwnNDitjnc44ozMtjud1Uz1wXb4cgM63MhtWy1mL2O',
  {
    host: 'https://eu.posthog.com',
    requestTimeout: 1000
  }
)

export function sendAnalyticsEvent () {
  if (!process.env.STEPCI_DISABLE_ANALYTICS) {
    posthog.capture({
      distinctId: uid as string,
      event: 'ping',
      properties: {
        os: os.type(),
        node: process.version,
        version: '2.5.x',
        command: process.argv.slice(2)[0],
        environment: ci.isCI ? ci.name : isDocker() ? 'Docker' : 'Local'
      }
    })
  }
}

process.on('beforeExit', () => posthog.shutdown())
