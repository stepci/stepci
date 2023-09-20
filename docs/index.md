<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/113339114?v=4',
    name: 'Sebastian Wißmüller',
    title: 'Business',
    links: [
      { icon: 'linkedin', link: 'https://de.linkedin.com/in/sebastian-wissmueller' },
    ]
  },
  {
    avatar: 'https://avatars.githubusercontent.com/u/10400064?v=4',
    name: 'Mish Ushakov',
    title: 'Technology',
    links: [
      { icon: 'github', link: 'https://github.com/mishushakov' },
    ]
  }
]
</script>

# Step CI Documentation

**APIs, automated**

Step CI is an open-source API Quality Assurance framework

- **Language-agnostic**. Configure easily using YAML, JSON or JavaScript
- **REST, GraphQL, gRPC, tRPC, SOAP**. Test different API types in one workflow
- **Self-hosted**. Test services on your network, locally or with CI/CD
- **Integrated**. Play nicely with others

### Contributing

As an open-source project, we welcome contributions from the community. If you are experiencing any bugs or want to add some improvements, please feel free to open an issue or pull request on GitHub

https://github.com/stepci/stepci

### Community

Join our community on Discord and GitHub

[→ Discord](https://discord.gg/KqJJzJ3BTu)

[→ GitHub Discussions](https://github.com/stepci/stepci/discussions)

## Support

Get support hours covered by SLA, setup and training sessions, prioritized feature requests and bug resolution.

[→ Learn more](https://stepci.com/#pricing)

[→ Schedule a call](https://cal.com/wissmueller/30-minute-call)

<hr />

### Team

<VPTeamMembers size="small" :members="members" />
