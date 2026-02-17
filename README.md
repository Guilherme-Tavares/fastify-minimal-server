# Fastify Minimal Server

A minimal REST API server built with Fastify and Node.js, demonstrating stateless architecture principles.

## Features

- ✅ Stateless REST API
- ✅ Structured logging with Pino
- ✅ Environment variables support
- ✅ Hot reload with Nodemon

## Requirements

- Node.js 18+ 
- npm

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Usage

### Development (with auto-reload)

```bash
npm run dev:fastify
```

### Production

```bash
npm run start:fastify
```

## Endpoints

### GET /hello

Returns a confirmation message that the REST API is working.

**Response:**
```json
{
  "message": "REST API with Node.js working!"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "uptime": 123.45
}
```

## Testing

Make requests using curl:

```bash
# Simple request
curl http://localhost:3000/hello

# With headers
curl -i http://localhost:3000/health
```

## Technologies

- [Fastify](https://fastify.dev/) - Fast and low overhead web framework
- [Pino](https://getpino.io/) - Fast JSON logger
- [dotenv](https://github.com/motdotla/dotenv) - Environment variables
- [Nodemon](https://nodemon.io/) - Auto-restart during development

## License

ISC
