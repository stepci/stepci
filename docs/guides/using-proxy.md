# Using Proxies

You can connect through a proxy by adding `HTTP_PROXY` (for http connections) and `HTTPS_PROXY` (for https connections) to your environment variables.

Example:

```
HTTP_PROXY=http://localhost:5000 stepci run workflow.yml
```
