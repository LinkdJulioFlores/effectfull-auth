import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  uniqueIndex,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { timestamps } from './column-helpers';

/**
 * Defines the user role enum for the application.
 */
export const userRoleEnum = pgEnum('user_role', ['STANDARD', 'ADMIN']);

// ---------- User ----------
export const User = pgTable('user', {
  ID: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  emailVerified: timestamp('email_verified'),
  image: text('image'),
  userRole: userRoleEnum('user_role').default('STANDARD').notNull(),
  ...timestamps,
});

// ---------- Account ----------
export const Account = pgTable(
  'account_info',
  {
    ID: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => User.ID, { onDelete: 'cascade' }),

    type: varchar('type', { length: 255 }).notNull(),
    provider: varchar('provider', { length: 255 }).notNull(),
    providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),

    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type', { length: 255 }),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
    refresh_token_expires_in: integer('refresh_token_expires_in'),
    ...timestamps,
  },
  (t) => [
    uniqueIndex('account_provider_providerAccountId_unique').on(t.provider, t.providerAccountId),
  ],
);

// ---------- Session ----------
export const Session = pgTable('session', {
  ID: uuid('id').primaryKey().defaultRandom(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  userId: uuid('user_id')
    .notNull()
    .references(() => User.ID, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
  ...timestamps,
});

// ---------- VerificationToken ----------
export const VerificationToken = pgTable(
  'verification_token',
  {
    identifier: varchar('identifier', { length: 255 }).notNull(),
    token: varchar('token', { length: 255 }).notNull().unique(),
    expires: timestamp('expires').notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex('verification_token_identifier_token_unique').on(t.identifier, t.token)],
);

export const UserApp = pgTable(
  'user_app',
  {
    ID: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    ...timestamps,
  },
  (t) => [uniqueIndex('').on(t.ID)],
);

export const Post = pgTable('post', {
  ID: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
});
