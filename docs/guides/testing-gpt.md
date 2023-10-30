# Testing ChatGPT

[ChatGPT](https://chat.openai.com) is a text-based conversational AI developed by OpenAI based on the GPT architecture

Testing ChatGPT API involves evaluating its ability to understand and respond accurately to user inputs across various scenarios and ensuring its technical performance, such as response time, consistency and reliability

**Example: GPT-3.5 Query**

```yaml
version: "1.1"
name: ChatGPT Query
env:
  OPENAI_API_KEY: <key>
tests:
  example:
    steps:
      - http:
          method: POST
          url: https://api.openai.com/v1/chat/completions
          headers:
            Content-Type: application/json
          auth:
            bearer:
              token: ${{env.OPENAI_API_KEY}}
          json:
            {
              "model": "gpt-3.5-turbo",
              "messages": [
                {
                  "role": "user",
                  "content": "How many countries are in the world?"
                }
              ],
              "temperature": 1,
              "max_tokens": 256,
              "top_p": 1,
              "frequency_penalty": 0,
              "presence_penalty": 0
            }
          check:
            status: 200
            jsonpath:
              $.choices[0].message.content:
                - in: 195
```

:::tip
See [Testing HTTP APIs](/guides/testing-http) for the full guide on testing HTTP-based APIs
:::
