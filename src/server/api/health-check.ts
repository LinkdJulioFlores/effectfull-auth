import { HttpApiEndpoint, HttpApiGroup } from '@effect/platform';
import { Schema } from 'effect';

/**
 * Defines simple generic API endpoints for testing
 */
export const APIEntryGroup = HttpApiGroup.make('api_group')
  .add(HttpApiEndpoint.get('root', '/api').addSuccess(Schema.String))
  .add(HttpApiEndpoint.get('health', '/api/health').addSuccess(Schema.String));
