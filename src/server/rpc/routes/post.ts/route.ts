import { Rpc, RpcGroup } from '@effect/rpc';
import { Schema } from 'effect';
import type { Post } from '../../../db/schema/auth';

export class PostSchema extends Schema.Class<typeof Post.$inferSelect>('PostSchema')({
  id: Schema.String,
  title: Schema.String,
  content: Schema.String,
}) {}

export class PostRpcs extends RpcGroup.make(
  Rpc.make('PostList', {
    success: PostSchema,
    stream: true,
  }),
) {}
