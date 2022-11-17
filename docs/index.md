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

Step CI is an open-source framework, which helps you automate API testing and monitoring

- **Language-agnostic**. Configure easily using YAML
- **REST, GraphQL, gRPC**. Test different API types at once
- **Self-hosted**. Test services on local network
- **Integrated**. Play nicely with others

### Development

The Development is happening on our repository on GitHub

https://github.com/stepci/stepci

### Community

Join our community on GitHub Discussions

https://github.com/stepci/stepci/discussions

### Newsletter

Subscribe to our newsletter on Google Groups

https://groups.google.com/g/stepci

### Team

<VPTeamMembers size="small" :members="members" />
