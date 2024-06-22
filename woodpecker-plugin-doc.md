---
name: Step CI
author: Step CI Authors
icon: TODO
description: Automated API Testing and Quality Assurance.
tags: [testing, api, rest, graphql, grpc, trpc, soap]
containerImage: ghcr.io/stepci/stepci-woodpecker
containerImageUrl: https://github.com/stepci/stepci/pkgs/container/stepci-woodpecker
url: https://github.com/stepci/stepci
---

# Step CI

Step CI is an open-source API Quality Assurance framework

- **Language-agnostic**. Configure easily using YAML, JSON or JavaScript
- **REST, GraphQL, gRPC, tRPC, SOAP**. Test different API types in one workflow
- **Self-hosted**. Test services on your network, locally and CI/CD
- **Integrated**. Play nicely with others

```yml
steps:
  test:
    image: ghcr.io/stepci/stepci-woodpecker
    settings:
      env: MODE=prod
      secrets: API_KEY=******
      verbose: true
      load: true
      concurrency: 4
```

![Screen Recording 2023-10-04 at 15 43 17](https://github.com/stepci/stepci/assets/10400064/881efd49-fd93-4ff8-8e99-4b6e24fe1227)
