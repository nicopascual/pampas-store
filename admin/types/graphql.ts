import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

/** Input for creating a new store. */
export type CreateStoreInput = {
  /** Custom domain (optional). */
  domain?: InputMaybe<Scalars['String']['input']>;
  /** Store name. */
  name: Scalars['String']['input'];
};

/** Store creation response payload. */
export type CreateStorePayload = MutationSuccess & {
  __typename?: 'CreateStorePayload';
  /** Success message. */
  message: Scalars['String']['output'];
  /** The created store. */
  store: Store;
};

export type CreateStoreResult = CreateStorePayload | MutationError;

/** Input for inviting a member to a store. */
export type InviteMemberToStoreInput = {
  /** Role to assign to the member. */
  role: StoreMemberRole;
  /** Store ID. */
  storeId: Scalars['ID']['input'];
  /** User ID to invite. */
  userId: Scalars['ID']['input'];
};

/** Store member invitation response payload. */
export type InviteMemberToStorePayload = MutationSuccess & {
  __typename?: 'InviteMemberToStorePayload';
  /** Success message. */
  message: Scalars['String']['output'];
  /** The created store membership. */
  storeMember: StoreMember;
};

export type InviteMemberToStoreResult = InviteMemberToStorePayload | MutationError;

/** Input for logging in a user. */
export type LoginUserInput = {
  /** User's email address. */
  email: Scalars['String']['input'];
  /** User's password. */
  password: Scalars['String']['input'];
};

/** Login response payload. */
export type LoginUserPayload = MutationSuccess & {
  __typename?: 'LoginUserPayload';
  /** Access token for API authentication. */
  accessToken: Scalars['String']['output'];
  /** Success message. */
  message: Scalars['String']['output'];
  /** Refresh token for token renewal. */
  refreshToken: Scalars['String']['output'];
  /** The authenticated user. */
  user: User;
};

export type LoginUserResult = LoginUserPayload | MutationError;

/** Logout response payload. */
export type LogoutUserPayload = MutationSuccess & {
  __typename?: 'LogoutUserPayload';
  /** Success message. */
  message: Scalars['String']['output'];
};

export type LogoutUserResult = LogoutUserPayload | MutationError;

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new store. */
  createStore: CreateStoreResult;
  /** Invite a member to a store. */
  inviteMemberToStore: InviteMemberToStoreResult;
  /** Login a user. */
  loginUser: LoginUserResult;
  /** Logout user and invalidate tokens. */
  logoutUser: LogoutUserResult;
  /** Refresh access token using refresh token. */
  refreshToken: RefreshTokenResult;
  /** Register a new user. */
  registerUser: RegisterUserResult;
  /** Remove a member from a store. */
  removeMemberFromStore: RemoveMemberFromStoreResult;
  /** Request password reset token. */
  requestPasswordReset: RequestPasswordResetResult;
  /** Reset password using token. */
  resetPassword: ResetPasswordResult;
  /** Update store settings. */
  updateStoreSettings: UpdateStoreSettingsResult;
  /** Verify user email address. */
  verifyEmail: VerifyEmailResult;
};


export type MutationCreateStoreArgs = {
  input: CreateStoreInput;
};


export type MutationInviteMemberToStoreArgs = {
  input: InviteMemberToStoreInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};


export type MutationRemoveMemberFromStoreArgs = {
  input: RemoveMemberFromStoreInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationUpdateStoreSettingsArgs = {
  input: UpdateStoreSettingsInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

/** Error response for mutations. */
export type MutationError = {
  __typename?: 'MutationError';
  /** Error code for client handling. */
  code?: Maybe<Scalars['String']['output']>;
  /** Error message. */
  message: Scalars['String']['output'];
  /** Validation errors if applicable. */
  validationErrors?: Maybe<Array<ValidationError>>;
};

/** Base success response interface. */
export type MutationSuccess = {
  /** Success message. */
  message?: Maybe<Scalars['String']['output']>;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

/** Indicates what fields are available at the top level of a query operation. */
export type Query = {
  __typename?: 'Query';
  /** Get all stores owned by the authenticated user. */
  myStores: Array<Store>;
  /** Find a store by domain. */
  storeByDomain?: Maybe<Store>;
  /** Find a store by slug. */
  storeBySlug?: Maybe<Store>;
  /** Get all members of a specific store. */
  storeMembers: Array<StoreMember>;
  /** Find a single user by an identifying attribute. */
  user?: Maybe<User>;
  /** List multiple users. */
  users: UserPaginator;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryStoreByDomainArgs = {
  domain: Scalars['String']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryStoreBySlugArgs = {
  slug: Scalars['String']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryStoreMembersArgs = {
  storeId: Scalars['ID']['input'];
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


/** Indicates what fields are available at the top level of a query operation. */
export type QueryUsersArgs = {
  first?: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** Input for refreshing access token. */
export type RefreshTokenInput = {
  /** Refresh token. */
  refreshToken: Scalars['String']['input'];
};

/** Refresh token response payload. */
export type RefreshTokenPayload = MutationSuccess & {
  __typename?: 'RefreshTokenPayload';
  /** New access token for API authentication. */
  accessToken: Scalars['String']['output'];
  /** Success message. */
  message: Scalars['String']['output'];
};

export type RefreshTokenResult = MutationError | RefreshTokenPayload;

/** Input for registering a new user. */
export type RegisterUserInput = {
  /** User's email address. */
  email: Scalars['String']['input'];
  /** User's full name. */
  name: Scalars['String']['input'];
  /** User's password. */
  password: Scalars['String']['input'];
  /** Password confirmation. */
  password_confirmation: Scalars['String']['input'];
  /** User role (defaults to CUSTOMER). */
  role?: InputMaybe<UserRole>;
};

/** Registration response payload. */
export type RegisterUserPayload = MutationSuccess & {
  __typename?: 'RegisterUserPayload';
  /** Success message. */
  message: Scalars['String']['output'];
  /** The registered user. */
  user: User;
};

export type RegisterUserResult = MutationError | RegisterUserPayload;

/** Input for removing a member from a store. */
export type RemoveMemberFromStoreInput = {
  /** Store ID. */
  storeId: Scalars['ID']['input'];
  /** User ID to remove. */
  userId: Scalars['ID']['input'];
};

/** Store member removal response payload. */
export type RemoveMemberFromStorePayload = MutationSuccess & {
  __typename?: 'RemoveMemberFromStorePayload';
  /** Success message. */
  message: Scalars['String']['output'];
};

export type RemoveMemberFromStoreResult = MutationError | RemoveMemberFromStorePayload;

/** Input for requesting password reset. */
export type RequestPasswordResetInput = {
  /** User's email address. */
  email: Scalars['String']['input'];
};

/** Password reset request response payload. */
export type RequestPasswordResetPayload = MutationSuccess & {
  __typename?: 'RequestPasswordResetPayload';
  /** Success message. */
  message: Scalars['String']['output'];
};

export type RequestPasswordResetResult = MutationError | RequestPasswordResetPayload;

/** Input for resetting password. */
export type ResetPasswordInput = {
  /** New password. */
  newPassword: Scalars['String']['input'];
  /** Password reset token. */
  token: Scalars['String']['input'];
};

/** Password reset response payload. */
export type ResetPasswordPayload = MutationSuccess & {
  __typename?: 'ResetPasswordPayload';
  /** Success message. */
  message: Scalars['String']['output'];
  /** The user with reset password. */
  user: User;
};

export type ResetPasswordResult = MutationError | ResetPasswordPayload;

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** A store in the e-commerce platform. */
export type Store = {
  __typename?: 'Store';
  /** When the store was created. */
  created_at: Scalars['DateTime']['output'];
  /** Custom domain (optional). */
  domain?: Maybe<Scalars['String']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Store members. */
  members: Array<StoreMember>;
  /** Store name. */
  name: Scalars['String']['output'];
  /** Store owner. */
  owner: User;
  /** Store plan. */
  plan: StorePlan;
  /** Unique slug for subdomain handling. */
  slug: Scalars['String']['output'];
  /** Store status. */
  status: StoreStatus;
  /** When the store was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** A store member with role-based access. */
export type StoreMember = {
  __typename?: 'StoreMember';
  /** When the membership was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Role of the member in the store. */
  role: StoreMemberRole;
  /** Store this member belongs to. */
  store: Store;
  /** When the membership was last updated. */
  updated_at: Scalars['DateTime']['output'];
  /** User who is the member. */
  user: User;
};

/** Store member role enum */
export enum StoreMemberRole {
  Manager = 'Manager',
  Owner = 'Owner',
  Staff = 'Staff'
}

/** Store plan enum */
export enum StorePlan {
  Enterprise = 'ENTERPRISE',
  Free = 'FREE',
  Pro = 'PRO'
}

/** Store status enum */
export enum StoreStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Suspended = 'SUSPENDED'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

/** Input for updating store settings. */
export type UpdateStoreSettingsInput = {
  /** Custom domain (optional). */
  domain?: InputMaybe<Scalars['String']['input']>;
  /** Store name. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Store plan. */
  plan?: InputMaybe<StorePlan>;
};

/** Store settings update response payload. */
export type UpdateStoreSettingsPayload = MutationSuccess & {
  __typename?: 'UpdateStoreSettingsPayload';
  /** Success message. */
  message: Scalars['String']['output'];
  /** The updated store. */
  store: Store;
};

export type UpdateStoreSettingsResult = MutationError | UpdateStoreSettingsPayload;

/** Account of a person who uses this application. */
export type User = {
  __typename?: 'User';
  /** When the account was created. */
  created_at: Scalars['DateTime']['output'];
  /** Unique email address. */
  email: Scalars['String']['output'];
  /** When the email was verified. */
  email_verified_at?: Maybe<Scalars['DateTime']['output']>;
  /** Unique primary key. */
  id: Scalars['ID']['output'];
  /** Non-unique name. */
  name: Scalars['String']['output'];
  /** User role. */
  role: UserRole;
  /** Store memberships for this user. */
  storeMemberships: Array<StoreMember>;
  /** Stores owned by this user. */
  stores: Array<Store>;
  /** When the account was last updated. */
  updated_at: Scalars['DateTime']['output'];
};

/** A paginated list of User items. */
export type UserPaginator = {
  __typename?: 'UserPaginator';
  /** A list of User items. */
  data: Array<User>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

/** User role enum */
export enum UserRole {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Seller = 'SELLER'
}

/** Validation error details. */
export type ValidationError = {
  __typename?: 'ValidationError';
  /** The field that failed validation. */
  field: Scalars['String']['output'];
  /** All validation error messages for this field. */
  messages: Array<Scalars['String']['output']>;
};

/** Input for verifying user email. */
export type VerifyEmailInput = {
  /** Email verification token. */
  token: Scalars['String']['input'];
};

/** Email verification response payload. */
export type VerifyEmailPayload = MutationSuccess & {
  __typename?: 'VerifyEmailPayload';
  /** Success message. */
  message: Scalars['String']['output'];
  /** The user with verified email. */
  user: User;
};

export type VerifyEmailResult = MutationError | VerifyEmailPayload;

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginUserPayload', message: string, accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string } } | { __typename?: 'MutationError', validationErrors?: Array<{ __typename?: 'ValidationError', field: string, messages: Array<string> }> | null } };


export const LoginUserDocument = gql`
    mutation LoginUser($input: LoginUserInput!) {
  loginUser(input: $input) {
    ... on MutationError {
      validationErrors {
        field
        messages
      }
    }
    ... on LoginUserPayload {
      user {
        id
      }
      message
      accessToken
      refreshToken
    }
  }
}
    `;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useLoginUserMutation(options: VueApolloComposable.UseMutationOptions<LoginUserMutation, LoginUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginUserMutation, LoginUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
}
export type LoginUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginUserMutation, LoginUserMutationVariables>;