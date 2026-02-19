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

---

## Statelessness Validation (Academic Assignment)

> **Assignment:** Introdução à Arquitetura REST e ao Node.js - Parte C, Item 7  
> **Note:** This section is written in Portuguese as part of the academic assignment requirement.

### Teste de Requisições Simultâneas

Para demonstrar o princípio de **statelessness** da arquitetura REST, foi desenvolvido um script de teste que realiza duas requisições simultâneas ao endpoint `/hello`.

#### Executando o Teste

```bash
node src/double-requests.js
```

#### Logs Registrados

**Saída do Cliente:**

```
C:\...\fastify-minimal-server>node src/double-requests.js
Making 2 simultaneous requests...

Response 1: { message: 'REST API with Node.js working!' }
Response 2: { message: 'REST API with Node.js working!' }

Requests processed independently.
```

**Logs do Servidor:**

```
C:\...\fastify-minimal-server>npm run dev:fastify

> fastify-minimal-server@1.0.0 dev:fastify
> nodemon src/server.fastify.js

[nodemon] 3.1.11
[nodemon] starting `node src/server.fastify.js`
[11:09:12.472] INFO (2064): Server listening at http://[::1]:3000
[11:09:12.473] INFO (2064): Server listening at http://127.0.0.1:3000

[11:09:52.477] INFO (2064): incoming request
    reqId: "req-1"
    req: {
      "method": "GET",
      "url": "/hello",
      "host": "localhost:3000",
      "remoteAddress": "::1",
      "remotePort": 55197
    }
[11:09:52.480] INFO (2064): request completed
    reqId: "req-1"
    res: {
      "statusCode": 200
    }
    responseTime: 2.013000011444092

[11:09:52.480] INFO (2064): incoming request
    reqId: "req-2"
    req: {
      "method": "GET",
      "url": "/hello",
      "host": "localhost:3000",
      "remoteAddress": "::1",
      "remotePort": 55198
    }
[11:09:52.480] INFO (2064): request completed
    reqId: "req-2"
    res: {
      "statusCode": 200
    }
    responseTime: 0.11610007286071777
```

#### Análise Técnica

O comportamento observado nos logs demonstra os seguintes princípios fundamentais da arquitetura REST e do Node.js:

1. **Statelessness (Ausência de Estado):**
   - Cada requisição foi tratada de forma **completamente independente** (`reqId: "req-1"` e `reqId: "req-2"`)
   - O servidor **não armazenou nenhum estado** entre as requisições
   - A segunda requisição não teve acesso a nenhuma informação da primeira
   - Cada operação foi uma **transação completa e autocontida**

2. **Event Loop do Node.js:**
   - Ambas as requisições foram processadas **simultaneamente** (timestamps idênticos: `11:09:52.480`)
   - Apesar de rodar em **single thread**, o servidor gerenciou as duas operações de forma **não bloqueante**
   - O event loop enfileirou e processou as requisições de forma **assíncrona** e eficiente

3. **Interface Uniforme:**
   - Ambas seguiram o mesmo padrão REST:
     - Método: `GET`
     - URI: `/hello`
     - Protocolo: `HTTP`
   - Retornaram resposta JSON no formato consistente
   - Código de status: `200 OK`

4. **Independência de Processamento:**
   - Cada requisição teve sua própria **porta de origem** (`55197` e `55198`)
   - Tempos de resposta diferentes (`2.01ms` vs `0.11ms`) devido a otimizações internas, não a cache
   - Processamento isolado garantindo **escalabilidade** e **previsibilidade**

Este teste ratifica visualmente que o servidor implementa corretamente o princípio de **statelessness**, essencial para APIs REST escaláveis e confiáveis.

---

## Technologies

- [Fastify](https://fastify.dev/) - Fast and low overhead web framework
- [Pino](https://getpino.io/) - Fast JSON logger
- [dotenv](https://github.com/motdotla/dotenv) - Environment variables
- [Nodemon](https://nodemon.io/) - Auto-restart during development

## License

ISC
