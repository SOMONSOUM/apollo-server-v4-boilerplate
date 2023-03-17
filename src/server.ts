import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { expressMiddleware } from '@apollo/server/express4';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { schema } from './graphql';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 8080;

const startApolloServer = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
    host: '0.0.0.0',
  });

  const severCleanup = useServer({ schema: schema }, wsServer);

  const server = new ApolloServer({
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
    expressMiddleware(server),
  );

  await httpServer
    .listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    })
    .on('error', (err: any) => console.log(err));
};

startApolloServer();
