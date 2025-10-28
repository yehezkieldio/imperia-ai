# Imperia AI

## Overview

Imperia is a Discord bot that integrates multiple AI language models to provide intelligent conversational assistance within Discord servers.

> **⚠️ Note:** This project is no longer actively maintained or being worked on.

## Features

- AI-powered chat capabilities using multiple LLM providers
- Automatic fallback between AI providers for reliability
- Support for multiple AI providers: Groq, Google Gemini, Mistral, Hyperbolic, and Together AI
- Discord slash commands and text commands
- Built with TypeScript and Bun for performance
- Dockerized for easy deployment
- Smart message chunking for long responses

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Discord Bot Token
- API keys for at least one AI provider (Groq, Gemini, Mistral, Hyperbolic, or Together AI)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yehezkieldio/imperia-ai.git
cd imperia-ai
```

2. Install dependencies:
```bash
bun install
```

3. Configure environment variables:
```bash
cp .env.schema .env
```

Edit `.env` and add your credentials:
```env
DISCORD_BOT_TOKEN=your_discord_bot_token
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
MISTRAL_API_KEY=your_mistral_api_key
HYPERBOLIC_API_KEY=your_hyperbolic_api_key
TOGETHER_API_KEY=your_together_api_key
```

4. Run the bot:
```bash
bun run start
```

## Building from Source

### Local Build

```bash
# Install dependencies
bun install

# Run in development mode
bun run start
```

### Docker Build

```bash
# Build the Docker image
docker build -t imperia-ai .

# Run the container
docker run -d --env-file .env imperia-ai
```

### Available Commands

- `/chat <prompt>` - Chat with Imperia using AI
- `/ping` - Check the bot's latency
- `imperia <command>` - Text-based command prefix

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Yehezkiel Dio Sinolungan
