import { HttpApiBuilder, HttpMiddleware, HttpServer } from '@effect/platform';
import { NodeHttpServer, NodeRuntime } from '@effect/platform-node';
import { Layer } from 'effect';
import { createServer } from 'node:http';
import { APIConfig } from './api/api-config';

/**
 * Go back and see docs, current conceptual understanding of this is not solid
 */
const GeneralApiLive = HttpApiBuilder.api(APIConfig.RootApi).pipe(
  Layer.provide(APIConfig.GeneralLive),
);

const HttpLive = HttpApiBuilder.serve(HttpMiddleware.logger).pipe(
  Layer.provide(GeneralApiLive),
  HttpServer.withLogAddress,
  Layer.provide(NodeHttpServer.layer(createServer, { port: 5050 })),
);

Layer.launch(HttpLive).pipe(NodeRuntime.runMain);
