// HttpApi ("MyApi)
// └── HttpGroup ("Greetings")
// └── HttpEndpoint ("hello-world")

/**
 * See https://www.npmjs.com/package/@effect/platform
 * for reference
 */
import { HttpApi, HttpApiBuilder } from '@effect/platform';
import { Effect } from 'effect';
import { APIEntryGroup } from './health-check';

/**
 *  Consider moving this to a separate file since it's the entry point
 *  to the API /api
 */
export const GeneralAPI = HttpApi.make('GeneralAPI').add(APIEntryGroup);

/**
 * Collection of (group) API and points
 */
const RootApi = HttpApi.make('GeneralApi').add(APIEntryGroup);

/**
 * Defines the API logic for each endpoint
 */
const GeneralLive = HttpApiBuilder.group(RootApi, 'api_group', (handlers) =>
  handlers
    .handle('root', () => {
      const a = 1;
      const b = 2;
      const c = a + b;
      return Effect.succeed(`Hello from /api ${c}`);
    })
    .handle('health', () => Effect.succeed('Server is healthy')),
);

export const APIConfig = {
  RootApi,
  GeneralLive,
};
