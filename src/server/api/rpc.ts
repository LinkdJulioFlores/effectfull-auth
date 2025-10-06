import { HttpApiEndpoint, HttpApiGroup } from '@effect/platform';
import { Schema } from 'effect';

/**
 * Defines a prefix to all and future rpc endpoints.
 * Pair this up with an effect schema codex to ensure
 * reliability and consistency.
 */
export const RpcEntryGroup = HttpApiGroup.make('rpc_group')
  .add(HttpApiEndpoint.get('root', '/rpc').addSuccess(Schema.String))
  .add(HttpApiEndpoint.get('health', '/rpc/user').addSuccess(Schema.String));
