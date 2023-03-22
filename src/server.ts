import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { Request, Response } from 'express';
import cors from 'cors';
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { schema } from './graphql';
import { config } from 'dotenv';
import createKnexContex from './lib/database';
import { verifyToken } from './utils/jwt';
config();

interface MyContext {
  token?: String;
}

interface ExpressContext {
  req: Request;
  res: Response;
}
const PORT = process.env.PORT || 8080;

const startApolloServer = async () => {
  const app = express();
  const context = async ({ req, res }: ExpressContext) => {
    let user = null;
    const knex = createKnexContex().default;

    try {
      const authHeader = req.headers.authorization || '';
      if (!authHeader.includes('Bearer')) {
        throw new Error('Invalid token');
      }
      const authToken = authHeader.replace('Bearer ', '');
      if (authToken) {
        const userId = await verifyToken(authToken);
        if (userId?.uid) {
          [user] = await knex.table('users').where({ id: userId });
        }
      }
      user = user || null;
    } catch (error) {
      user = null;
    }

    return { req, res, user, createKnexContex };
  };
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
    host: '0.0.0.0',
  });

  const severCleanup = useServer({ schema: schema }, wsServer);

  const server = new ApolloServer<MyContext>({
    schema: schema,
    csrfPrevention: false,
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await severCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();
  app.use(graphqlUploadExpress());
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: context,
    }),
  );

  await httpServer
    .listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    })
    .on('error', (err: any) => console.log(err));
};

startApolloServer();
