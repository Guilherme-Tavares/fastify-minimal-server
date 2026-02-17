import 'dotenv/config';
import Fastify from 'fastify';

const port = process.env.PORT || 3000;
const fastify = Fastify({
    logger: { transport: { target: 'pino-pretty' } }
});

// Healthcheck
fastify.get('/health', async () => {
    return { status: 'ok', uptime: process.uptime() };
});

// Hello
fastify.get('/hello', {
    schema: {
        response: {
            200: { type: 'object',
                properties: { message: { type: 'string' } }
             }
        }
    }
}, async () => {
    return { message: 'Hello from Fastify!' }
});

// 404 e erros
fastify.setNotFoundHandler((req, reply) => {
    reply.code(404).send({ error: 'Not Found' });
});

fastify.setErrorHandler((err, req, reply) => {
    req.log.error(err);
    reply.code(500).send({ error: 'Internal Server Error' });
});

// Inicialização
const start = async () => {
    try { await fastify.listen({ port }); }
    catch (err) { fastify.log.error(err); process.exit(1); }
};
start();