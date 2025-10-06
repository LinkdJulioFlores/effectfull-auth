// handlers.ts
import type { Rpc } from '@effect/rpc';
import { Effect, Layer, Ref, Stream } from 'effect';
import { User, UserRpcs } from './request.js';

// ---------------------------------------------
// Imaginary Database
// ---------------------------------------------

class UserRepository extends Effect.Service<UserRepository>()('UserRepository', {
  effect: Effect.gen(function* () {
    const ref = yield* Ref.make<Array<User>>([
      new User({ id: '1', name: 'Alice' }),
      new User({ id: '2', name: 'Bob' }),
    ]);

    return {
      findMany: ref.get,
      findById: (id: string) =>
        Ref.get(ref).pipe(
          Effect.andThen((users) => {
            const user = users.find((user) => user.id === id);
            return user ? Effect.succeed(user) : Effect.fail(`User not found: ${id}`);
          }),
        ),
      create: (name: string) =>
        Ref.updateAndGet(ref, (users) => [
          ...users,
          new User({ id: String(users.length + 1), name }),
        ]).pipe(Effect.andThen((users) => users[users.length - 1])),
    };
  }),
}) {}

// ---------------------------------------------
// RPC handlers
// ---------------------------------------------

export const UsersLive: Layer.Layer<
  Rpc.Handler<'UserList'> | Rpc.Handler<'UserById'> | Rpc.Handler<'UserCreate'>
> = UserRpcs.toLayer(
  Effect.gen(function* () {
    const db = yield* UserRepository;

    return {
      UserList: () =>
        db.findMany.pipe(
          Effect.tap(() => Effect.log('UserList handler called')),
          Stream.fromIterableEffect,
        ),

      UserById: ({ id }) =>
        db.findById(id).pipe(Effect.tap(() => Effect.log(`UserById called with id=${id}`))),

      UserCreate: ({ name }) =>
        db
          .create(name)
          .pipe(
            Effect.tap((user) =>
              Effect.log(`UserCreate called with name=${name}, new id=${user.id}`),
            ),
          ),
    };
  }),
).pipe(
  // Provide the UserRepository layer
  Layer.provide(UserRepository.Default),
);
