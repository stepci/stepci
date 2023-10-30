# Integrating with GitLab CI/CD

[GitLab CI/CD](https://docs.gitlab.com/ee/ci) is a continuous integration and continuous delivery platform for GitLab

**tests/workflow.yml**

```yaml
version: "1.1"
name: Status Check
env:
  host: example.com
tests:
  example:
    steps:
      - name: GET request
        http:
          url: https://${{env.host}}
          method: GET
          check:
            status: /^20/
```

Example GitLab CI/CD configuration:

**.gitlab-ci.yml**

```yaml
stages:
  - test

api_test:
  stage: test
  image: node:lts-alpine
  script:
    - npm install -g stepci
    - stepci run tests/workflow.yml
```
