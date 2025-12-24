
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Store
 * 
 */
export type Store = $Result.DefaultSelection<Prisma.$StorePayload>
/**
 * Model PlatformAdmin
 * 
 */
export type PlatformAdmin = $Result.DefaultSelection<Prisma.$PlatformAdminPayload>
/**
 * Model StorePlatformAdmin
 * 
 */
export type StorePlatformAdmin = $Result.DefaultSelection<Prisma.$StorePlatformAdminPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Stores
 * const stores = await prisma.store.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Stores
   * const stores = await prisma.store.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.store`: Exposes CRUD operations for the **Store** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stores
    * const stores = await prisma.store.findMany()
    * ```
    */
  get store(): Prisma.StoreDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.platformAdmin`: Exposes CRUD operations for the **PlatformAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlatformAdmins
    * const platformAdmins = await prisma.platformAdmin.findMany()
    * ```
    */
  get platformAdmin(): Prisma.PlatformAdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.storePlatformAdmin`: Exposes CRUD operations for the **StorePlatformAdmin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StorePlatformAdmins
    * const storePlatformAdmins = await prisma.storePlatformAdmin.findMany()
    * ```
    */
  get storePlatformAdmin(): Prisma.StorePlatformAdminDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Store: 'Store',
    PlatformAdmin: 'PlatformAdmin',
    StorePlatformAdmin: 'StorePlatformAdmin'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "store" | "platformAdmin" | "storePlatformAdmin"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Store: {
        payload: Prisma.$StorePayload<ExtArgs>
        fields: Prisma.StoreFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StoreFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StoreFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findFirst: {
            args: Prisma.StoreFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StoreFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          findMany: {
            args: Prisma.StoreFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          create: {
            args: Prisma.StoreCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          createMany: {
            args: Prisma.StoreCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StoreCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          delete: {
            args: Prisma.StoreDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          update: {
            args: Prisma.StoreUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          deleteMany: {
            args: Prisma.StoreDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StoreUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StoreUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>[]
          }
          upsert: {
            args: Prisma.StoreUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePayload>
          }
          aggregate: {
            args: Prisma.StoreAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStore>
          }
          groupBy: {
            args: Prisma.StoreGroupByArgs<ExtArgs>
            result: $Utils.Optional<StoreGroupByOutputType>[]
          }
          count: {
            args: Prisma.StoreCountArgs<ExtArgs>
            result: $Utils.Optional<StoreCountAggregateOutputType> | number
          }
        }
      }
      PlatformAdmin: {
        payload: Prisma.$PlatformAdminPayload<ExtArgs>
        fields: Prisma.PlatformAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlatformAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlatformAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          findFirst: {
            args: Prisma.PlatformAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlatformAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          findMany: {
            args: Prisma.PlatformAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>[]
          }
          create: {
            args: Prisma.PlatformAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          createMany: {
            args: Prisma.PlatformAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlatformAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>[]
          }
          delete: {
            args: Prisma.PlatformAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          update: {
            args: Prisma.PlatformAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          deleteMany: {
            args: Prisma.PlatformAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlatformAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlatformAdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>[]
          }
          upsert: {
            args: Prisma.PlatformAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlatformAdminPayload>
          }
          aggregate: {
            args: Prisma.PlatformAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlatformAdmin>
          }
          groupBy: {
            args: Prisma.PlatformAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlatformAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlatformAdminCountArgs<ExtArgs>
            result: $Utils.Optional<PlatformAdminCountAggregateOutputType> | number
          }
        }
      }
      StorePlatformAdmin: {
        payload: Prisma.$StorePlatformAdminPayload<ExtArgs>
        fields: Prisma.StorePlatformAdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StorePlatformAdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StorePlatformAdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>
          }
          findFirst: {
            args: Prisma.StorePlatformAdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StorePlatformAdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>
          }
          findMany: {
            args: Prisma.StorePlatformAdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>[]
          }
          create: {
            args: Prisma.StorePlatformAdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>
          }
          createMany: {
            args: Prisma.StorePlatformAdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StorePlatformAdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>[]
          }
          delete: {
            args: Prisma.StorePlatformAdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>
          }
          update: {
            args: Prisma.StorePlatformAdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>
          }
          deleteMany: {
            args: Prisma.StorePlatformAdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StorePlatformAdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StorePlatformAdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>[]
          }
          upsert: {
            args: Prisma.StorePlatformAdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StorePlatformAdminPayload>
          }
          aggregate: {
            args: Prisma.StorePlatformAdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStorePlatformAdmin>
          }
          groupBy: {
            args: Prisma.StorePlatformAdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<StorePlatformAdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.StorePlatformAdminCountArgs<ExtArgs>
            result: $Utils.Optional<StorePlatformAdminCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    store?: StoreOmit
    platformAdmin?: PlatformAdminOmit
    storePlatformAdmin?: StorePlatformAdminOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StoreCountOutputType
   */

  export type StoreCountOutputType = {
    platformAdmins: number
  }

  export type StoreCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformAdmins?: boolean | StoreCountOutputTypeCountPlatformAdminsArgs
  }

  // Custom InputTypes
  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StoreCountOutputType
     */
    select?: StoreCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StoreCountOutputType without action
   */
  export type StoreCountOutputTypeCountPlatformAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorePlatformAdminWhereInput
  }


  /**
   * Count Type PlatformAdminCountOutputType
   */

  export type PlatformAdminCountOutputType = {
    stores: number
  }

  export type PlatformAdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stores?: boolean | PlatformAdminCountOutputTypeCountStoresArgs
  }

  // Custom InputTypes
  /**
   * PlatformAdminCountOutputType without action
   */
  export type PlatformAdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdminCountOutputType
     */
    select?: PlatformAdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlatformAdminCountOutputType without action
   */
  export type PlatformAdminCountOutputTypeCountStoresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorePlatformAdminWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Store
   */

  export type AggregateStore = {
    _count: StoreCountAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  export type StoreMinAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    status: string | null
    plan: string | null
    isLocal: boolean | null
    databaseUrl: string | null
    databaseToken: string | null
    subdomain: string | null
    customDomain: string | null
    createdAt: Date | null
    updatedAt: Date | null
    provisionedAt: Date | null
  }

  export type StoreMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    name: string | null
    status: string | null
    plan: string | null
    isLocal: boolean | null
    databaseUrl: string | null
    databaseToken: string | null
    subdomain: string | null
    customDomain: string | null
    createdAt: Date | null
    updatedAt: Date | null
    provisionedAt: Date | null
  }

  export type StoreCountAggregateOutputType = {
    id: number
    slug: number
    name: number
    status: number
    plan: number
    isLocal: number
    databaseUrl: number
    databaseToken: number
    subdomain: number
    customDomain: number
    createdAt: number
    updatedAt: number
    provisionedAt: number
    _all: number
  }


  export type StoreMinAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    status?: true
    plan?: true
    isLocal?: true
    databaseUrl?: true
    databaseToken?: true
    subdomain?: true
    customDomain?: true
    createdAt?: true
    updatedAt?: true
    provisionedAt?: true
  }

  export type StoreMaxAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    status?: true
    plan?: true
    isLocal?: true
    databaseUrl?: true
    databaseToken?: true
    subdomain?: true
    customDomain?: true
    createdAt?: true
    updatedAt?: true
    provisionedAt?: true
  }

  export type StoreCountAggregateInputType = {
    id?: true
    slug?: true
    name?: true
    status?: true
    plan?: true
    isLocal?: true
    databaseUrl?: true
    databaseToken?: true
    subdomain?: true
    customDomain?: true
    createdAt?: true
    updatedAt?: true
    provisionedAt?: true
    _all?: true
  }

  export type StoreAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Store to aggregate.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stores
    **/
    _count?: true | StoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoreMaxAggregateInputType
  }

  export type GetStoreAggregateType<T extends StoreAggregateArgs> = {
        [P in keyof T & keyof AggregateStore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStore[P]>
      : GetScalarType<T[P], AggregateStore[P]>
  }




  export type StoreGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StoreWhereInput
    orderBy?: StoreOrderByWithAggregationInput | StoreOrderByWithAggregationInput[]
    by: StoreScalarFieldEnum[] | StoreScalarFieldEnum
    having?: StoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoreCountAggregateInputType | true
    _min?: StoreMinAggregateInputType
    _max?: StoreMaxAggregateInputType
  }

  export type StoreGroupByOutputType = {
    id: string
    slug: string
    name: string
    status: string
    plan: string
    isLocal: boolean
    databaseUrl: string | null
    databaseToken: string | null
    subdomain: string
    customDomain: string | null
    createdAt: Date
    updatedAt: Date
    provisionedAt: Date | null
    _count: StoreCountAggregateOutputType | null
    _min: StoreMinAggregateOutputType | null
    _max: StoreMaxAggregateOutputType | null
  }

  type GetStoreGroupByPayload<T extends StoreGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoreGroupByOutputType[P]>
            : GetScalarType<T[P], StoreGroupByOutputType[P]>
        }
      >
    >


  export type StoreSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    status?: boolean
    plan?: boolean
    isLocal?: boolean
    databaseUrl?: boolean
    databaseToken?: boolean
    subdomain?: boolean
    customDomain?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provisionedAt?: boolean
    platformAdmins?: boolean | Store$platformAdminsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["store"]>

  export type StoreSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    status?: boolean
    plan?: boolean
    isLocal?: boolean
    databaseUrl?: boolean
    databaseToken?: boolean
    subdomain?: boolean
    customDomain?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provisionedAt?: boolean
  }, ExtArgs["result"]["store"]>

  export type StoreSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    name?: boolean
    status?: boolean
    plan?: boolean
    isLocal?: boolean
    databaseUrl?: boolean
    databaseToken?: boolean
    subdomain?: boolean
    customDomain?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provisionedAt?: boolean
  }, ExtArgs["result"]["store"]>

  export type StoreSelectScalar = {
    id?: boolean
    slug?: boolean
    name?: boolean
    status?: boolean
    plan?: boolean
    isLocal?: boolean
    databaseUrl?: boolean
    databaseToken?: boolean
    subdomain?: boolean
    customDomain?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    provisionedAt?: boolean
  }

  export type StoreOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "name" | "status" | "plan" | "isLocal" | "databaseUrl" | "databaseToken" | "subdomain" | "customDomain" | "createdAt" | "updatedAt" | "provisionedAt", ExtArgs["result"]["store"]>
  export type StoreInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformAdmins?: boolean | Store$platformAdminsArgs<ExtArgs>
    _count?: boolean | StoreCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StoreIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StoreIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StorePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Store"
    objects: {
      platformAdmins: Prisma.$StorePlatformAdminPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      name: string
      status: string
      plan: string
      isLocal: boolean
      databaseUrl: string | null
      databaseToken: string | null
      subdomain: string
      customDomain: string | null
      createdAt: Date
      updatedAt: Date
      provisionedAt: Date | null
    }, ExtArgs["result"]["store"]>
    composites: {}
  }

  type StoreGetPayload<S extends boolean | null | undefined | StoreDefaultArgs> = $Result.GetResult<Prisma.$StorePayload, S>

  type StoreCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StoreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StoreCountAggregateInputType | true
    }

  export interface StoreDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Store'], meta: { name: 'Store' } }
    /**
     * Find zero or one Store that matches the filter.
     * @param {StoreFindUniqueArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StoreFindUniqueArgs>(args: SelectSubset<T, StoreFindUniqueArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Store that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StoreFindUniqueOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StoreFindUniqueOrThrowArgs>(args: SelectSubset<T, StoreFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StoreFindFirstArgs>(args?: SelectSubset<T, StoreFindFirstArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Store that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindFirstOrThrowArgs} args - Arguments to find a Store
     * @example
     * // Get one Store
     * const store = await prisma.store.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StoreFindFirstOrThrowArgs>(args?: SelectSubset<T, StoreFindFirstOrThrowArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stores
     * const stores = await prisma.store.findMany()
     * 
     * // Get first 10 Stores
     * const stores = await prisma.store.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storeWithIdOnly = await prisma.store.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StoreFindManyArgs>(args?: SelectSubset<T, StoreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Store.
     * @param {StoreCreateArgs} args - Arguments to create a Store.
     * @example
     * // Create one Store
     * const Store = await prisma.store.create({
     *   data: {
     *     // ... data to create a Store
     *   }
     * })
     * 
     */
    create<T extends StoreCreateArgs>(args: SelectSubset<T, StoreCreateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stores.
     * @param {StoreCreateManyArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StoreCreateManyArgs>(args?: SelectSubset<T, StoreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stores and returns the data saved in the database.
     * @param {StoreCreateManyAndReturnArgs} args - Arguments to create many Stores.
     * @example
     * // Create many Stores
     * const store = await prisma.store.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StoreCreateManyAndReturnArgs>(args?: SelectSubset<T, StoreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Store.
     * @param {StoreDeleteArgs} args - Arguments to delete one Store.
     * @example
     * // Delete one Store
     * const Store = await prisma.store.delete({
     *   where: {
     *     // ... filter to delete one Store
     *   }
     * })
     * 
     */
    delete<T extends StoreDeleteArgs>(args: SelectSubset<T, StoreDeleteArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Store.
     * @param {StoreUpdateArgs} args - Arguments to update one Store.
     * @example
     * // Update one Store
     * const store = await prisma.store.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StoreUpdateArgs>(args: SelectSubset<T, StoreUpdateArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stores.
     * @param {StoreDeleteManyArgs} args - Arguments to filter Stores to delete.
     * @example
     * // Delete a few Stores
     * const { count } = await prisma.store.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StoreDeleteManyArgs>(args?: SelectSubset<T, StoreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StoreUpdateManyArgs>(args: SelectSubset<T, StoreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stores and returns the data updated in the database.
     * @param {StoreUpdateManyAndReturnArgs} args - Arguments to update many Stores.
     * @example
     * // Update many Stores
     * const store = await prisma.store.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stores and only return the `id`
     * const storeWithIdOnly = await prisma.store.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StoreUpdateManyAndReturnArgs>(args: SelectSubset<T, StoreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Store.
     * @param {StoreUpsertArgs} args - Arguments to update or create a Store.
     * @example
     * // Update or create a Store
     * const store = await prisma.store.upsert({
     *   create: {
     *     // ... data to create a Store
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Store we want to update
     *   }
     * })
     */
    upsert<T extends StoreUpsertArgs>(args: SelectSubset<T, StoreUpsertArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreCountArgs} args - Arguments to filter Stores to count.
     * @example
     * // Count the number of Stores
     * const count = await prisma.store.count({
     *   where: {
     *     // ... the filter for the Stores we want to count
     *   }
     * })
    **/
    count<T extends StoreCountArgs>(
      args?: Subset<T, StoreCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoreAggregateArgs>(args: Subset<T, StoreAggregateArgs>): Prisma.PrismaPromise<GetStoreAggregateType<T>>

    /**
     * Group by Store.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoreGroupByArgs['orderBy'] }
        : { orderBy?: StoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Store model
   */
  readonly fields: StoreFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Store.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StoreClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platformAdmins<T extends Store$platformAdminsArgs<ExtArgs> = {}>(args?: Subset<T, Store$platformAdminsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Store model
   */
  interface StoreFieldRefs {
    readonly id: FieldRef<"Store", 'String'>
    readonly slug: FieldRef<"Store", 'String'>
    readonly name: FieldRef<"Store", 'String'>
    readonly status: FieldRef<"Store", 'String'>
    readonly plan: FieldRef<"Store", 'String'>
    readonly isLocal: FieldRef<"Store", 'Boolean'>
    readonly databaseUrl: FieldRef<"Store", 'String'>
    readonly databaseToken: FieldRef<"Store", 'String'>
    readonly subdomain: FieldRef<"Store", 'String'>
    readonly customDomain: FieldRef<"Store", 'String'>
    readonly createdAt: FieldRef<"Store", 'DateTime'>
    readonly updatedAt: FieldRef<"Store", 'DateTime'>
    readonly provisionedAt: FieldRef<"Store", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Store findUnique
   */
  export type StoreFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findUniqueOrThrow
   */
  export type StoreFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store findFirst
   */
  export type StoreFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findFirstOrThrow
   */
  export type StoreFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Store to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stores.
     */
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store findMany
   */
  export type StoreFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter, which Stores to fetch.
     */
    where?: StoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stores to fetch.
     */
    orderBy?: StoreOrderByWithRelationInput | StoreOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stores.
     */
    cursor?: StoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stores from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stores.
     */
    skip?: number
    distinct?: StoreScalarFieldEnum | StoreScalarFieldEnum[]
  }

  /**
   * Store create
   */
  export type StoreCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to create a Store.
     */
    data: XOR<StoreCreateInput, StoreUncheckedCreateInput>
  }

  /**
   * Store createMany
   */
  export type StoreCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
  }

  /**
   * Store createManyAndReturn
   */
  export type StoreCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to create many Stores.
     */
    data: StoreCreateManyInput | StoreCreateManyInput[]
  }

  /**
   * Store update
   */
  export type StoreUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The data needed to update a Store.
     */
    data: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
    /**
     * Choose, which Store to update.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store updateMany
   */
  export type StoreUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store updateManyAndReturn
   */
  export type StoreUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * The data used to update Stores.
     */
    data: XOR<StoreUpdateManyMutationInput, StoreUncheckedUpdateManyInput>
    /**
     * Filter which Stores to update
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to update.
     */
    limit?: number
  }

  /**
   * Store upsert
   */
  export type StoreUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * The filter to search for the Store to update in case it exists.
     */
    where: StoreWhereUniqueInput
    /**
     * In case the Store found by the `where` argument doesn't exist, create a new Store with this data.
     */
    create: XOR<StoreCreateInput, StoreUncheckedCreateInput>
    /**
     * In case the Store was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StoreUpdateInput, StoreUncheckedUpdateInput>
  }

  /**
   * Store delete
   */
  export type StoreDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
    /**
     * Filter which Store to delete.
     */
    where: StoreWhereUniqueInput
  }

  /**
   * Store deleteMany
   */
  export type StoreDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stores to delete
     */
    where?: StoreWhereInput
    /**
     * Limit how many Stores to delete.
     */
    limit?: number
  }

  /**
   * Store.platformAdmins
   */
  export type Store$platformAdminsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    where?: StorePlatformAdminWhereInput
    orderBy?: StorePlatformAdminOrderByWithRelationInput | StorePlatformAdminOrderByWithRelationInput[]
    cursor?: StorePlatformAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StorePlatformAdminScalarFieldEnum | StorePlatformAdminScalarFieldEnum[]
  }

  /**
   * Store without action
   */
  export type StoreDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Store
     */
    select?: StoreSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Store
     */
    omit?: StoreOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StoreInclude<ExtArgs> | null
  }


  /**
   * Model PlatformAdmin
   */

  export type AggregatePlatformAdmin = {
    _count: PlatformAdminCountAggregateOutputType | null
    _min: PlatformAdminMinAggregateOutputType | null
    _max: PlatformAdminMaxAggregateOutputType | null
  }

  export type PlatformAdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    status: string | null
    isSuperAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformAdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    passwordHash: string | null
    status: string | null
    isSuperAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlatformAdminCountAggregateOutputType = {
    id: number
    email: number
    name: number
    passwordHash: number
    status: number
    isSuperAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlatformAdminMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    status?: true
    isSuperAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformAdminMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    status?: true
    isSuperAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlatformAdminCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    passwordHash?: true
    status?: true
    isSuperAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlatformAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformAdmin to aggregate.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlatformAdmins
    **/
    _count?: true | PlatformAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlatformAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlatformAdminMaxAggregateInputType
  }

  export type GetPlatformAdminAggregateType<T extends PlatformAdminAggregateArgs> = {
        [P in keyof T & keyof AggregatePlatformAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlatformAdmin[P]>
      : GetScalarType<T[P], AggregatePlatformAdmin[P]>
  }




  export type PlatformAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlatformAdminWhereInput
    orderBy?: PlatformAdminOrderByWithAggregationInput | PlatformAdminOrderByWithAggregationInput[]
    by: PlatformAdminScalarFieldEnum[] | PlatformAdminScalarFieldEnum
    having?: PlatformAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlatformAdminCountAggregateInputType | true
    _min?: PlatformAdminMinAggregateInputType
    _max?: PlatformAdminMaxAggregateInputType
  }

  export type PlatformAdminGroupByOutputType = {
    id: string
    email: string
    name: string
    passwordHash: string
    status: string
    isSuperAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: PlatformAdminCountAggregateOutputType | null
    _min: PlatformAdminMinAggregateOutputType | null
    _max: PlatformAdminMaxAggregateOutputType | null
  }

  type GetPlatformAdminGroupByPayload<T extends PlatformAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlatformAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlatformAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlatformAdminGroupByOutputType[P]>
            : GetScalarType<T[P], PlatformAdminGroupByOutputType[P]>
        }
      >
    >


  export type PlatformAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    status?: boolean
    isSuperAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    stores?: boolean | PlatformAdmin$storesArgs<ExtArgs>
    _count?: boolean | PlatformAdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["platformAdmin"]>

  export type PlatformAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    status?: boolean
    isSuperAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformAdmin"]>

  export type PlatformAdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    status?: boolean
    isSuperAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["platformAdmin"]>

  export type PlatformAdminSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    passwordHash?: boolean
    status?: boolean
    isSuperAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlatformAdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "name" | "passwordHash" | "status" | "isSuperAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["platformAdmin"]>
  export type PlatformAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stores?: boolean | PlatformAdmin$storesArgs<ExtArgs>
    _count?: boolean | PlatformAdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlatformAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlatformAdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlatformAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlatformAdmin"
    objects: {
      stores: Prisma.$StorePlatformAdminPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      passwordHash: string
      status: string
      isSuperAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["platformAdmin"]>
    composites: {}
  }

  type PlatformAdminGetPayload<S extends boolean | null | undefined | PlatformAdminDefaultArgs> = $Result.GetResult<Prisma.$PlatformAdminPayload, S>

  type PlatformAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlatformAdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlatformAdminCountAggregateInputType | true
    }

  export interface PlatformAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlatformAdmin'], meta: { name: 'PlatformAdmin' } }
    /**
     * Find zero or one PlatformAdmin that matches the filter.
     * @param {PlatformAdminFindUniqueArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlatformAdminFindUniqueArgs>(args: SelectSubset<T, PlatformAdminFindUniqueArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlatformAdmin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlatformAdminFindUniqueOrThrowArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlatformAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, PlatformAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminFindFirstArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlatformAdminFindFirstArgs>(args?: SelectSubset<T, PlatformAdminFindFirstArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlatformAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminFindFirstOrThrowArgs} args - Arguments to find a PlatformAdmin
     * @example
     * // Get one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlatformAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, PlatformAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlatformAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlatformAdmins
     * const platformAdmins = await prisma.platformAdmin.findMany()
     * 
     * // Get first 10 PlatformAdmins
     * const platformAdmins = await prisma.platformAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const platformAdminWithIdOnly = await prisma.platformAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlatformAdminFindManyArgs>(args?: SelectSubset<T, PlatformAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlatformAdmin.
     * @param {PlatformAdminCreateArgs} args - Arguments to create a PlatformAdmin.
     * @example
     * // Create one PlatformAdmin
     * const PlatformAdmin = await prisma.platformAdmin.create({
     *   data: {
     *     // ... data to create a PlatformAdmin
     *   }
     * })
     * 
     */
    create<T extends PlatformAdminCreateArgs>(args: SelectSubset<T, PlatformAdminCreateArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlatformAdmins.
     * @param {PlatformAdminCreateManyArgs} args - Arguments to create many PlatformAdmins.
     * @example
     * // Create many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlatformAdminCreateManyArgs>(args?: SelectSubset<T, PlatformAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlatformAdmins and returns the data saved in the database.
     * @param {PlatformAdminCreateManyAndReturnArgs} args - Arguments to create many PlatformAdmins.
     * @example
     * // Create many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlatformAdmins and only return the `id`
     * const platformAdminWithIdOnly = await prisma.platformAdmin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlatformAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, PlatformAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlatformAdmin.
     * @param {PlatformAdminDeleteArgs} args - Arguments to delete one PlatformAdmin.
     * @example
     * // Delete one PlatformAdmin
     * const PlatformAdmin = await prisma.platformAdmin.delete({
     *   where: {
     *     // ... filter to delete one PlatformAdmin
     *   }
     * })
     * 
     */
    delete<T extends PlatformAdminDeleteArgs>(args: SelectSubset<T, PlatformAdminDeleteArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlatformAdmin.
     * @param {PlatformAdminUpdateArgs} args - Arguments to update one PlatformAdmin.
     * @example
     * // Update one PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlatformAdminUpdateArgs>(args: SelectSubset<T, PlatformAdminUpdateArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlatformAdmins.
     * @param {PlatformAdminDeleteManyArgs} args - Arguments to filter PlatformAdmins to delete.
     * @example
     * // Delete a few PlatformAdmins
     * const { count } = await prisma.platformAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlatformAdminDeleteManyArgs>(args?: SelectSubset<T, PlatformAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlatformAdminUpdateManyArgs>(args: SelectSubset<T, PlatformAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlatformAdmins and returns the data updated in the database.
     * @param {PlatformAdminUpdateManyAndReturnArgs} args - Arguments to update many PlatformAdmins.
     * @example
     * // Update many PlatformAdmins
     * const platformAdmin = await prisma.platformAdmin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlatformAdmins and only return the `id`
     * const platformAdminWithIdOnly = await prisma.platformAdmin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlatformAdminUpdateManyAndReturnArgs>(args: SelectSubset<T, PlatformAdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlatformAdmin.
     * @param {PlatformAdminUpsertArgs} args - Arguments to update or create a PlatformAdmin.
     * @example
     * // Update or create a PlatformAdmin
     * const platformAdmin = await prisma.platformAdmin.upsert({
     *   create: {
     *     // ... data to create a PlatformAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlatformAdmin we want to update
     *   }
     * })
     */
    upsert<T extends PlatformAdminUpsertArgs>(args: SelectSubset<T, PlatformAdminUpsertArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlatformAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminCountArgs} args - Arguments to filter PlatformAdmins to count.
     * @example
     * // Count the number of PlatformAdmins
     * const count = await prisma.platformAdmin.count({
     *   where: {
     *     // ... the filter for the PlatformAdmins we want to count
     *   }
     * })
    **/
    count<T extends PlatformAdminCountArgs>(
      args?: Subset<T, PlatformAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlatformAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlatformAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlatformAdminAggregateArgs>(args: Subset<T, PlatformAdminAggregateArgs>): Prisma.PrismaPromise<GetPlatformAdminAggregateType<T>>

    /**
     * Group by PlatformAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlatformAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlatformAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlatformAdminGroupByArgs['orderBy'] }
        : { orderBy?: PlatformAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlatformAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlatformAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlatformAdmin model
   */
  readonly fields: PlatformAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlatformAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlatformAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    stores<T extends PlatformAdmin$storesArgs<ExtArgs> = {}>(args?: Subset<T, PlatformAdmin$storesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlatformAdmin model
   */
  interface PlatformAdminFieldRefs {
    readonly id: FieldRef<"PlatformAdmin", 'String'>
    readonly email: FieldRef<"PlatformAdmin", 'String'>
    readonly name: FieldRef<"PlatformAdmin", 'String'>
    readonly passwordHash: FieldRef<"PlatformAdmin", 'String'>
    readonly status: FieldRef<"PlatformAdmin", 'String'>
    readonly isSuperAdmin: FieldRef<"PlatformAdmin", 'Boolean'>
    readonly createdAt: FieldRef<"PlatformAdmin", 'DateTime'>
    readonly updatedAt: FieldRef<"PlatformAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlatformAdmin findUnique
   */
  export type PlatformAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin findUniqueOrThrow
   */
  export type PlatformAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin findFirst
   */
  export type PlatformAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformAdmins.
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformAdmins.
     */
    distinct?: PlatformAdminScalarFieldEnum | PlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin findFirstOrThrow
   */
  export type PlatformAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which PlatformAdmin to fetch.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlatformAdmins.
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlatformAdmins.
     */
    distinct?: PlatformAdminScalarFieldEnum | PlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin findMany
   */
  export type PlatformAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which PlatformAdmins to fetch.
     */
    where?: PlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlatformAdmins to fetch.
     */
    orderBy?: PlatformAdminOrderByWithRelationInput | PlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlatformAdmins.
     */
    cursor?: PlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlatformAdmins.
     */
    skip?: number
    distinct?: PlatformAdminScalarFieldEnum | PlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin create
   */
  export type PlatformAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a PlatformAdmin.
     */
    data: XOR<PlatformAdminCreateInput, PlatformAdminUncheckedCreateInput>
  }

  /**
   * PlatformAdmin createMany
   */
  export type PlatformAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlatformAdmins.
     */
    data: PlatformAdminCreateManyInput | PlatformAdminCreateManyInput[]
  }

  /**
   * PlatformAdmin createManyAndReturn
   */
  export type PlatformAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * The data used to create many PlatformAdmins.
     */
    data: PlatformAdminCreateManyInput | PlatformAdminCreateManyInput[]
  }

  /**
   * PlatformAdmin update
   */
  export type PlatformAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a PlatformAdmin.
     */
    data: XOR<PlatformAdminUpdateInput, PlatformAdminUncheckedUpdateInput>
    /**
     * Choose, which PlatformAdmin to update.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin updateMany
   */
  export type PlatformAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlatformAdmins.
     */
    data: XOR<PlatformAdminUpdateManyMutationInput, PlatformAdminUncheckedUpdateManyInput>
    /**
     * Filter which PlatformAdmins to update
     */
    where?: PlatformAdminWhereInput
    /**
     * Limit how many PlatformAdmins to update.
     */
    limit?: number
  }

  /**
   * PlatformAdmin updateManyAndReturn
   */
  export type PlatformAdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * The data used to update PlatformAdmins.
     */
    data: XOR<PlatformAdminUpdateManyMutationInput, PlatformAdminUncheckedUpdateManyInput>
    /**
     * Filter which PlatformAdmins to update
     */
    where?: PlatformAdminWhereInput
    /**
     * Limit how many PlatformAdmins to update.
     */
    limit?: number
  }

  /**
   * PlatformAdmin upsert
   */
  export type PlatformAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the PlatformAdmin to update in case it exists.
     */
    where: PlatformAdminWhereUniqueInput
    /**
     * In case the PlatformAdmin found by the `where` argument doesn't exist, create a new PlatformAdmin with this data.
     */
    create: XOR<PlatformAdminCreateInput, PlatformAdminUncheckedCreateInput>
    /**
     * In case the PlatformAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlatformAdminUpdateInput, PlatformAdminUncheckedUpdateInput>
  }

  /**
   * PlatformAdmin delete
   */
  export type PlatformAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
    /**
     * Filter which PlatformAdmin to delete.
     */
    where: PlatformAdminWhereUniqueInput
  }

  /**
   * PlatformAdmin deleteMany
   */
  export type PlatformAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlatformAdmins to delete
     */
    where?: PlatformAdminWhereInput
    /**
     * Limit how many PlatformAdmins to delete.
     */
    limit?: number
  }

  /**
   * PlatformAdmin.stores
   */
  export type PlatformAdmin$storesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    where?: StorePlatformAdminWhereInput
    orderBy?: StorePlatformAdminOrderByWithRelationInput | StorePlatformAdminOrderByWithRelationInput[]
    cursor?: StorePlatformAdminWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StorePlatformAdminScalarFieldEnum | StorePlatformAdminScalarFieldEnum[]
  }

  /**
   * PlatformAdmin without action
   */
  export type PlatformAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlatformAdmin
     */
    select?: PlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlatformAdmin
     */
    omit?: PlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlatformAdminInclude<ExtArgs> | null
  }


  /**
   * Model StorePlatformAdmin
   */

  export type AggregateStorePlatformAdmin = {
    _count: StorePlatformAdminCountAggregateOutputType | null
    _min: StorePlatformAdminMinAggregateOutputType | null
    _max: StorePlatformAdminMaxAggregateOutputType | null
  }

  export type StorePlatformAdminMinAggregateOutputType = {
    id: string | null
    platformAdminId: string | null
    storeId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type StorePlatformAdminMaxAggregateOutputType = {
    id: string | null
    platformAdminId: string | null
    storeId: string | null
    role: string | null
    createdAt: Date | null
  }

  export type StorePlatformAdminCountAggregateOutputType = {
    id: number
    platformAdminId: number
    storeId: number
    role: number
    createdAt: number
    _all: number
  }


  export type StorePlatformAdminMinAggregateInputType = {
    id?: true
    platformAdminId?: true
    storeId?: true
    role?: true
    createdAt?: true
  }

  export type StorePlatformAdminMaxAggregateInputType = {
    id?: true
    platformAdminId?: true
    storeId?: true
    role?: true
    createdAt?: true
  }

  export type StorePlatformAdminCountAggregateInputType = {
    id?: true
    platformAdminId?: true
    storeId?: true
    role?: true
    createdAt?: true
    _all?: true
  }

  export type StorePlatformAdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorePlatformAdmin to aggregate.
     */
    where?: StorePlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePlatformAdmins to fetch.
     */
    orderBy?: StorePlatformAdminOrderByWithRelationInput | StorePlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StorePlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StorePlatformAdmins
    **/
    _count?: true | StorePlatformAdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StorePlatformAdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StorePlatformAdminMaxAggregateInputType
  }

  export type GetStorePlatformAdminAggregateType<T extends StorePlatformAdminAggregateArgs> = {
        [P in keyof T & keyof AggregateStorePlatformAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStorePlatformAdmin[P]>
      : GetScalarType<T[P], AggregateStorePlatformAdmin[P]>
  }




  export type StorePlatformAdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StorePlatformAdminWhereInput
    orderBy?: StorePlatformAdminOrderByWithAggregationInput | StorePlatformAdminOrderByWithAggregationInput[]
    by: StorePlatformAdminScalarFieldEnum[] | StorePlatformAdminScalarFieldEnum
    having?: StorePlatformAdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StorePlatformAdminCountAggregateInputType | true
    _min?: StorePlatformAdminMinAggregateInputType
    _max?: StorePlatformAdminMaxAggregateInputType
  }

  export type StorePlatformAdminGroupByOutputType = {
    id: string
    platformAdminId: string
    storeId: string
    role: string
    createdAt: Date
    _count: StorePlatformAdminCountAggregateOutputType | null
    _min: StorePlatformAdminMinAggregateOutputType | null
    _max: StorePlatformAdminMaxAggregateOutputType | null
  }

  type GetStorePlatformAdminGroupByPayload<T extends StorePlatformAdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StorePlatformAdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StorePlatformAdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StorePlatformAdminGroupByOutputType[P]>
            : GetScalarType<T[P], StorePlatformAdminGroupByOutputType[P]>
        }
      >
    >


  export type StorePlatformAdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformAdminId?: boolean
    storeId?: boolean
    role?: boolean
    createdAt?: boolean
    platformAdmin?: boolean | PlatformAdminDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storePlatformAdmin"]>

  export type StorePlatformAdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformAdminId?: boolean
    storeId?: boolean
    role?: boolean
    createdAt?: boolean
    platformAdmin?: boolean | PlatformAdminDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storePlatformAdmin"]>

  export type StorePlatformAdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platformAdminId?: boolean
    storeId?: boolean
    role?: boolean
    createdAt?: boolean
    platformAdmin?: boolean | PlatformAdminDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["storePlatformAdmin"]>

  export type StorePlatformAdminSelectScalar = {
    id?: boolean
    platformAdminId?: boolean
    storeId?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type StorePlatformAdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "platformAdminId" | "storeId" | "role" | "createdAt", ExtArgs["result"]["storePlatformAdmin"]>
  export type StorePlatformAdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformAdmin?: boolean | PlatformAdminDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StorePlatformAdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformAdmin?: boolean | PlatformAdminDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }
  export type StorePlatformAdminIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    platformAdmin?: boolean | PlatformAdminDefaultArgs<ExtArgs>
    store?: boolean | StoreDefaultArgs<ExtArgs>
  }

  export type $StorePlatformAdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StorePlatformAdmin"
    objects: {
      platformAdmin: Prisma.$PlatformAdminPayload<ExtArgs>
      store: Prisma.$StorePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platformAdminId: string
      storeId: string
      role: string
      createdAt: Date
    }, ExtArgs["result"]["storePlatformAdmin"]>
    composites: {}
  }

  type StorePlatformAdminGetPayload<S extends boolean | null | undefined | StorePlatformAdminDefaultArgs> = $Result.GetResult<Prisma.$StorePlatformAdminPayload, S>

  type StorePlatformAdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StorePlatformAdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StorePlatformAdminCountAggregateInputType | true
    }

  export interface StorePlatformAdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StorePlatformAdmin'], meta: { name: 'StorePlatformAdmin' } }
    /**
     * Find zero or one StorePlatformAdmin that matches the filter.
     * @param {StorePlatformAdminFindUniqueArgs} args - Arguments to find a StorePlatformAdmin
     * @example
     * // Get one StorePlatformAdmin
     * const storePlatformAdmin = await prisma.storePlatformAdmin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StorePlatformAdminFindUniqueArgs>(args: SelectSubset<T, StorePlatformAdminFindUniqueArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StorePlatformAdmin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StorePlatformAdminFindUniqueOrThrowArgs} args - Arguments to find a StorePlatformAdmin
     * @example
     * // Get one StorePlatformAdmin
     * const storePlatformAdmin = await prisma.storePlatformAdmin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StorePlatformAdminFindUniqueOrThrowArgs>(args: SelectSubset<T, StorePlatformAdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorePlatformAdmin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminFindFirstArgs} args - Arguments to find a StorePlatformAdmin
     * @example
     * // Get one StorePlatformAdmin
     * const storePlatformAdmin = await prisma.storePlatformAdmin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StorePlatformAdminFindFirstArgs>(args?: SelectSubset<T, StorePlatformAdminFindFirstArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StorePlatformAdmin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminFindFirstOrThrowArgs} args - Arguments to find a StorePlatformAdmin
     * @example
     * // Get one StorePlatformAdmin
     * const storePlatformAdmin = await prisma.storePlatformAdmin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StorePlatformAdminFindFirstOrThrowArgs>(args?: SelectSubset<T, StorePlatformAdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StorePlatformAdmins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StorePlatformAdmins
     * const storePlatformAdmins = await prisma.storePlatformAdmin.findMany()
     * 
     * // Get first 10 StorePlatformAdmins
     * const storePlatformAdmins = await prisma.storePlatformAdmin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storePlatformAdminWithIdOnly = await prisma.storePlatformAdmin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StorePlatformAdminFindManyArgs>(args?: SelectSubset<T, StorePlatformAdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StorePlatformAdmin.
     * @param {StorePlatformAdminCreateArgs} args - Arguments to create a StorePlatformAdmin.
     * @example
     * // Create one StorePlatformAdmin
     * const StorePlatformAdmin = await prisma.storePlatformAdmin.create({
     *   data: {
     *     // ... data to create a StorePlatformAdmin
     *   }
     * })
     * 
     */
    create<T extends StorePlatformAdminCreateArgs>(args: SelectSubset<T, StorePlatformAdminCreateArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StorePlatformAdmins.
     * @param {StorePlatformAdminCreateManyArgs} args - Arguments to create many StorePlatformAdmins.
     * @example
     * // Create many StorePlatformAdmins
     * const storePlatformAdmin = await prisma.storePlatformAdmin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StorePlatformAdminCreateManyArgs>(args?: SelectSubset<T, StorePlatformAdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StorePlatformAdmins and returns the data saved in the database.
     * @param {StorePlatformAdminCreateManyAndReturnArgs} args - Arguments to create many StorePlatformAdmins.
     * @example
     * // Create many StorePlatformAdmins
     * const storePlatformAdmin = await prisma.storePlatformAdmin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StorePlatformAdmins and only return the `id`
     * const storePlatformAdminWithIdOnly = await prisma.storePlatformAdmin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StorePlatformAdminCreateManyAndReturnArgs>(args?: SelectSubset<T, StorePlatformAdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StorePlatformAdmin.
     * @param {StorePlatformAdminDeleteArgs} args - Arguments to delete one StorePlatformAdmin.
     * @example
     * // Delete one StorePlatformAdmin
     * const StorePlatformAdmin = await prisma.storePlatformAdmin.delete({
     *   where: {
     *     // ... filter to delete one StorePlatformAdmin
     *   }
     * })
     * 
     */
    delete<T extends StorePlatformAdminDeleteArgs>(args: SelectSubset<T, StorePlatformAdminDeleteArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StorePlatformAdmin.
     * @param {StorePlatformAdminUpdateArgs} args - Arguments to update one StorePlatformAdmin.
     * @example
     * // Update one StorePlatformAdmin
     * const storePlatformAdmin = await prisma.storePlatformAdmin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StorePlatformAdminUpdateArgs>(args: SelectSubset<T, StorePlatformAdminUpdateArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StorePlatformAdmins.
     * @param {StorePlatformAdminDeleteManyArgs} args - Arguments to filter StorePlatformAdmins to delete.
     * @example
     * // Delete a few StorePlatformAdmins
     * const { count } = await prisma.storePlatformAdmin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StorePlatformAdminDeleteManyArgs>(args?: SelectSubset<T, StorePlatformAdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorePlatformAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StorePlatformAdmins
     * const storePlatformAdmin = await prisma.storePlatformAdmin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StorePlatformAdminUpdateManyArgs>(args: SelectSubset<T, StorePlatformAdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StorePlatformAdmins and returns the data updated in the database.
     * @param {StorePlatformAdminUpdateManyAndReturnArgs} args - Arguments to update many StorePlatformAdmins.
     * @example
     * // Update many StorePlatformAdmins
     * const storePlatformAdmin = await prisma.storePlatformAdmin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StorePlatformAdmins and only return the `id`
     * const storePlatformAdminWithIdOnly = await prisma.storePlatformAdmin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StorePlatformAdminUpdateManyAndReturnArgs>(args: SelectSubset<T, StorePlatformAdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StorePlatformAdmin.
     * @param {StorePlatformAdminUpsertArgs} args - Arguments to update or create a StorePlatformAdmin.
     * @example
     * // Update or create a StorePlatformAdmin
     * const storePlatformAdmin = await prisma.storePlatformAdmin.upsert({
     *   create: {
     *     // ... data to create a StorePlatformAdmin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StorePlatformAdmin we want to update
     *   }
     * })
     */
    upsert<T extends StorePlatformAdminUpsertArgs>(args: SelectSubset<T, StorePlatformAdminUpsertArgs<ExtArgs>>): Prisma__StorePlatformAdminClient<$Result.GetResult<Prisma.$StorePlatformAdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StorePlatformAdmins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminCountArgs} args - Arguments to filter StorePlatformAdmins to count.
     * @example
     * // Count the number of StorePlatformAdmins
     * const count = await prisma.storePlatformAdmin.count({
     *   where: {
     *     // ... the filter for the StorePlatformAdmins we want to count
     *   }
     * })
    **/
    count<T extends StorePlatformAdminCountArgs>(
      args?: Subset<T, StorePlatformAdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StorePlatformAdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StorePlatformAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StorePlatformAdminAggregateArgs>(args: Subset<T, StorePlatformAdminAggregateArgs>): Prisma.PrismaPromise<GetStorePlatformAdminAggregateType<T>>

    /**
     * Group by StorePlatformAdmin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StorePlatformAdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StorePlatformAdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StorePlatformAdminGroupByArgs['orderBy'] }
        : { orderBy?: StorePlatformAdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StorePlatformAdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStorePlatformAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StorePlatformAdmin model
   */
  readonly fields: StorePlatformAdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StorePlatformAdmin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StorePlatformAdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    platformAdmin<T extends PlatformAdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlatformAdminDefaultArgs<ExtArgs>>): Prisma__PlatformAdminClient<$Result.GetResult<Prisma.$PlatformAdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    store<T extends StoreDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StoreDefaultArgs<ExtArgs>>): Prisma__StoreClient<$Result.GetResult<Prisma.$StorePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StorePlatformAdmin model
   */
  interface StorePlatformAdminFieldRefs {
    readonly id: FieldRef<"StorePlatformAdmin", 'String'>
    readonly platformAdminId: FieldRef<"StorePlatformAdmin", 'String'>
    readonly storeId: FieldRef<"StorePlatformAdmin", 'String'>
    readonly role: FieldRef<"StorePlatformAdmin", 'String'>
    readonly createdAt: FieldRef<"StorePlatformAdmin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StorePlatformAdmin findUnique
   */
  export type StorePlatformAdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which StorePlatformAdmin to fetch.
     */
    where: StorePlatformAdminWhereUniqueInput
  }

  /**
   * StorePlatformAdmin findUniqueOrThrow
   */
  export type StorePlatformAdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which StorePlatformAdmin to fetch.
     */
    where: StorePlatformAdminWhereUniqueInput
  }

  /**
   * StorePlatformAdmin findFirst
   */
  export type StorePlatformAdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which StorePlatformAdmin to fetch.
     */
    where?: StorePlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePlatformAdmins to fetch.
     */
    orderBy?: StorePlatformAdminOrderByWithRelationInput | StorePlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorePlatformAdmins.
     */
    cursor?: StorePlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorePlatformAdmins.
     */
    distinct?: StorePlatformAdminScalarFieldEnum | StorePlatformAdminScalarFieldEnum[]
  }

  /**
   * StorePlatformAdmin findFirstOrThrow
   */
  export type StorePlatformAdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which StorePlatformAdmin to fetch.
     */
    where?: StorePlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePlatformAdmins to fetch.
     */
    orderBy?: StorePlatformAdminOrderByWithRelationInput | StorePlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StorePlatformAdmins.
     */
    cursor?: StorePlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePlatformAdmins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StorePlatformAdmins.
     */
    distinct?: StorePlatformAdminScalarFieldEnum | StorePlatformAdminScalarFieldEnum[]
  }

  /**
   * StorePlatformAdmin findMany
   */
  export type StorePlatformAdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * Filter, which StorePlatformAdmins to fetch.
     */
    where?: StorePlatformAdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StorePlatformAdmins to fetch.
     */
    orderBy?: StorePlatformAdminOrderByWithRelationInput | StorePlatformAdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StorePlatformAdmins.
     */
    cursor?: StorePlatformAdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StorePlatformAdmins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StorePlatformAdmins.
     */
    skip?: number
    distinct?: StorePlatformAdminScalarFieldEnum | StorePlatformAdminScalarFieldEnum[]
  }

  /**
   * StorePlatformAdmin create
   */
  export type StorePlatformAdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * The data needed to create a StorePlatformAdmin.
     */
    data: XOR<StorePlatformAdminCreateInput, StorePlatformAdminUncheckedCreateInput>
  }

  /**
   * StorePlatformAdmin createMany
   */
  export type StorePlatformAdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StorePlatformAdmins.
     */
    data: StorePlatformAdminCreateManyInput | StorePlatformAdminCreateManyInput[]
  }

  /**
   * StorePlatformAdmin createManyAndReturn
   */
  export type StorePlatformAdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * The data used to create many StorePlatformAdmins.
     */
    data: StorePlatformAdminCreateManyInput | StorePlatformAdminCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StorePlatformAdmin update
   */
  export type StorePlatformAdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * The data needed to update a StorePlatformAdmin.
     */
    data: XOR<StorePlatformAdminUpdateInput, StorePlatformAdminUncheckedUpdateInput>
    /**
     * Choose, which StorePlatformAdmin to update.
     */
    where: StorePlatformAdminWhereUniqueInput
  }

  /**
   * StorePlatformAdmin updateMany
   */
  export type StorePlatformAdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StorePlatformAdmins.
     */
    data: XOR<StorePlatformAdminUpdateManyMutationInput, StorePlatformAdminUncheckedUpdateManyInput>
    /**
     * Filter which StorePlatformAdmins to update
     */
    where?: StorePlatformAdminWhereInput
    /**
     * Limit how many StorePlatformAdmins to update.
     */
    limit?: number
  }

  /**
   * StorePlatformAdmin updateManyAndReturn
   */
  export type StorePlatformAdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * The data used to update StorePlatformAdmins.
     */
    data: XOR<StorePlatformAdminUpdateManyMutationInput, StorePlatformAdminUncheckedUpdateManyInput>
    /**
     * Filter which StorePlatformAdmins to update
     */
    where?: StorePlatformAdminWhereInput
    /**
     * Limit how many StorePlatformAdmins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StorePlatformAdmin upsert
   */
  export type StorePlatformAdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * The filter to search for the StorePlatformAdmin to update in case it exists.
     */
    where: StorePlatformAdminWhereUniqueInput
    /**
     * In case the StorePlatformAdmin found by the `where` argument doesn't exist, create a new StorePlatformAdmin with this data.
     */
    create: XOR<StorePlatformAdminCreateInput, StorePlatformAdminUncheckedCreateInput>
    /**
     * In case the StorePlatformAdmin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StorePlatformAdminUpdateInput, StorePlatformAdminUncheckedUpdateInput>
  }

  /**
   * StorePlatformAdmin delete
   */
  export type StorePlatformAdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
    /**
     * Filter which StorePlatformAdmin to delete.
     */
    where: StorePlatformAdminWhereUniqueInput
  }

  /**
   * StorePlatformAdmin deleteMany
   */
  export type StorePlatformAdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StorePlatformAdmins to delete
     */
    where?: StorePlatformAdminWhereInput
    /**
     * Limit how many StorePlatformAdmins to delete.
     */
    limit?: number
  }

  /**
   * StorePlatformAdmin without action
   */
  export type StorePlatformAdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StorePlatformAdmin
     */
    select?: StorePlatformAdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StorePlatformAdmin
     */
    omit?: StorePlatformAdminOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StorePlatformAdminInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StoreScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    name: 'name',
    status: 'status',
    plan: 'plan',
    isLocal: 'isLocal',
    databaseUrl: 'databaseUrl',
    databaseToken: 'databaseToken',
    subdomain: 'subdomain',
    customDomain: 'customDomain',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    provisionedAt: 'provisionedAt'
  };

  export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum]


  export const PlatformAdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    passwordHash: 'passwordHash',
    status: 'status',
    isSuperAdmin: 'isSuperAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlatformAdminScalarFieldEnum = (typeof PlatformAdminScalarFieldEnum)[keyof typeof PlatformAdminScalarFieldEnum]


  export const StorePlatformAdminScalarFieldEnum: {
    id: 'id',
    platformAdminId: 'platformAdminId',
    storeId: 'storeId',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type StorePlatformAdminScalarFieldEnum = (typeof StorePlatformAdminScalarFieldEnum)[keyof typeof StorePlatformAdminScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type StoreWhereInput = {
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    id?: StringFilter<"Store"> | string
    slug?: StringFilter<"Store"> | string
    name?: StringFilter<"Store"> | string
    status?: StringFilter<"Store"> | string
    plan?: StringFilter<"Store"> | string
    isLocal?: BoolFilter<"Store"> | boolean
    databaseUrl?: StringNullableFilter<"Store"> | string | null
    databaseToken?: StringNullableFilter<"Store"> | string | null
    subdomain?: StringFilter<"Store"> | string
    customDomain?: StringNullableFilter<"Store"> | string | null
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    provisionedAt?: DateTimeNullableFilter<"Store"> | Date | string | null
    platformAdmins?: StorePlatformAdminListRelationFilter
  }

  export type StoreOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    isLocal?: SortOrder
    databaseUrl?: SortOrderInput | SortOrder
    databaseToken?: SortOrderInput | SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    provisionedAt?: SortOrderInput | SortOrder
    platformAdmins?: StorePlatformAdminOrderByRelationAggregateInput
  }

  export type StoreWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    subdomain?: string
    customDomain?: string
    AND?: StoreWhereInput | StoreWhereInput[]
    OR?: StoreWhereInput[]
    NOT?: StoreWhereInput | StoreWhereInput[]
    name?: StringFilter<"Store"> | string
    status?: StringFilter<"Store"> | string
    plan?: StringFilter<"Store"> | string
    isLocal?: BoolFilter<"Store"> | boolean
    databaseUrl?: StringNullableFilter<"Store"> | string | null
    databaseToken?: StringNullableFilter<"Store"> | string | null
    createdAt?: DateTimeFilter<"Store"> | Date | string
    updatedAt?: DateTimeFilter<"Store"> | Date | string
    provisionedAt?: DateTimeNullableFilter<"Store"> | Date | string | null
    platformAdmins?: StorePlatformAdminListRelationFilter
  }, "id" | "slug" | "subdomain" | "customDomain">

  export type StoreOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    isLocal?: SortOrder
    databaseUrl?: SortOrderInput | SortOrder
    databaseToken?: SortOrderInput | SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    provisionedAt?: SortOrderInput | SortOrder
    _count?: StoreCountOrderByAggregateInput
    _max?: StoreMaxOrderByAggregateInput
    _min?: StoreMinOrderByAggregateInput
  }

  export type StoreScalarWhereWithAggregatesInput = {
    AND?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    OR?: StoreScalarWhereWithAggregatesInput[]
    NOT?: StoreScalarWhereWithAggregatesInput | StoreScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Store"> | string
    slug?: StringWithAggregatesFilter<"Store"> | string
    name?: StringWithAggregatesFilter<"Store"> | string
    status?: StringWithAggregatesFilter<"Store"> | string
    plan?: StringWithAggregatesFilter<"Store"> | string
    isLocal?: BoolWithAggregatesFilter<"Store"> | boolean
    databaseUrl?: StringNullableWithAggregatesFilter<"Store"> | string | null
    databaseToken?: StringNullableWithAggregatesFilter<"Store"> | string | null
    subdomain?: StringWithAggregatesFilter<"Store"> | string
    customDomain?: StringNullableWithAggregatesFilter<"Store"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Store"> | Date | string
    provisionedAt?: DateTimeNullableWithAggregatesFilter<"Store"> | Date | string | null
  }

  export type PlatformAdminWhereInput = {
    AND?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    OR?: PlatformAdminWhereInput[]
    NOT?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    id?: StringFilter<"PlatformAdmin"> | string
    email?: StringFilter<"PlatformAdmin"> | string
    name?: StringFilter<"PlatformAdmin"> | string
    passwordHash?: StringFilter<"PlatformAdmin"> | string
    status?: StringFilter<"PlatformAdmin"> | string
    isSuperAdmin?: BoolFilter<"PlatformAdmin"> | boolean
    createdAt?: DateTimeFilter<"PlatformAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformAdmin"> | Date | string
    stores?: StorePlatformAdminListRelationFilter
  }

  export type PlatformAdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    isSuperAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    stores?: StorePlatformAdminOrderByRelationAggregateInput
  }

  export type PlatformAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    OR?: PlatformAdminWhereInput[]
    NOT?: PlatformAdminWhereInput | PlatformAdminWhereInput[]
    name?: StringFilter<"PlatformAdmin"> | string
    passwordHash?: StringFilter<"PlatformAdmin"> | string
    status?: StringFilter<"PlatformAdmin"> | string
    isSuperAdmin?: BoolFilter<"PlatformAdmin"> | boolean
    createdAt?: DateTimeFilter<"PlatformAdmin"> | Date | string
    updatedAt?: DateTimeFilter<"PlatformAdmin"> | Date | string
    stores?: StorePlatformAdminListRelationFilter
  }, "id" | "email">

  export type PlatformAdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    isSuperAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlatformAdminCountOrderByAggregateInput
    _max?: PlatformAdminMaxOrderByAggregateInput
    _min?: PlatformAdminMinOrderByAggregateInput
  }

  export type PlatformAdminScalarWhereWithAggregatesInput = {
    AND?: PlatformAdminScalarWhereWithAggregatesInput | PlatformAdminScalarWhereWithAggregatesInput[]
    OR?: PlatformAdminScalarWhereWithAggregatesInput[]
    NOT?: PlatformAdminScalarWhereWithAggregatesInput | PlatformAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    email?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    name?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    passwordHash?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    status?: StringWithAggregatesFilter<"PlatformAdmin"> | string
    isSuperAdmin?: BoolWithAggregatesFilter<"PlatformAdmin"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PlatformAdmin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlatformAdmin"> | Date | string
  }

  export type StorePlatformAdminWhereInput = {
    AND?: StorePlatformAdminWhereInput | StorePlatformAdminWhereInput[]
    OR?: StorePlatformAdminWhereInput[]
    NOT?: StorePlatformAdminWhereInput | StorePlatformAdminWhereInput[]
    id?: StringFilter<"StorePlatformAdmin"> | string
    platformAdminId?: StringFilter<"StorePlatformAdmin"> | string
    storeId?: StringFilter<"StorePlatformAdmin"> | string
    role?: StringFilter<"StorePlatformAdmin"> | string
    createdAt?: DateTimeFilter<"StorePlatformAdmin"> | Date | string
    platformAdmin?: XOR<PlatformAdminScalarRelationFilter, PlatformAdminWhereInput>
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }

  export type StorePlatformAdminOrderByWithRelationInput = {
    id?: SortOrder
    platformAdminId?: SortOrder
    storeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    platformAdmin?: PlatformAdminOrderByWithRelationInput
    store?: StoreOrderByWithRelationInput
  }

  export type StorePlatformAdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    platformAdminId_storeId?: StorePlatformAdminPlatformAdminIdStoreIdCompoundUniqueInput
    AND?: StorePlatformAdminWhereInput | StorePlatformAdminWhereInput[]
    OR?: StorePlatformAdminWhereInput[]
    NOT?: StorePlatformAdminWhereInput | StorePlatformAdminWhereInput[]
    platformAdminId?: StringFilter<"StorePlatformAdmin"> | string
    storeId?: StringFilter<"StorePlatformAdmin"> | string
    role?: StringFilter<"StorePlatformAdmin"> | string
    createdAt?: DateTimeFilter<"StorePlatformAdmin"> | Date | string
    platformAdmin?: XOR<PlatformAdminScalarRelationFilter, PlatformAdminWhereInput>
    store?: XOR<StoreScalarRelationFilter, StoreWhereInput>
  }, "id" | "platformAdminId_storeId">

  export type StorePlatformAdminOrderByWithAggregationInput = {
    id?: SortOrder
    platformAdminId?: SortOrder
    storeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: StorePlatformAdminCountOrderByAggregateInput
    _max?: StorePlatformAdminMaxOrderByAggregateInput
    _min?: StorePlatformAdminMinOrderByAggregateInput
  }

  export type StorePlatformAdminScalarWhereWithAggregatesInput = {
    AND?: StorePlatformAdminScalarWhereWithAggregatesInput | StorePlatformAdminScalarWhereWithAggregatesInput[]
    OR?: StorePlatformAdminScalarWhereWithAggregatesInput[]
    NOT?: StorePlatformAdminScalarWhereWithAggregatesInput | StorePlatformAdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StorePlatformAdmin"> | string
    platformAdminId?: StringWithAggregatesFilter<"StorePlatformAdmin"> | string
    storeId?: StringWithAggregatesFilter<"StorePlatformAdmin"> | string
    role?: StringWithAggregatesFilter<"StorePlatformAdmin"> | string
    createdAt?: DateTimeWithAggregatesFilter<"StorePlatformAdmin"> | Date | string
  }

  export type StoreCreateInput = {
    id?: string
    slug: string
    name: string
    status?: string
    plan?: string
    isLocal?: boolean
    databaseUrl?: string | null
    databaseToken?: string | null
    subdomain: string
    customDomain?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    provisionedAt?: Date | string | null
    platformAdmins?: StorePlatformAdminCreateNestedManyWithoutStoreInput
  }

  export type StoreUncheckedCreateInput = {
    id?: string
    slug: string
    name: string
    status?: string
    plan?: string
    isLocal?: boolean
    databaseUrl?: string | null
    databaseToken?: string | null
    subdomain: string
    customDomain?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    provisionedAt?: Date | string | null
    platformAdmins?: StorePlatformAdminUncheckedCreateNestedManyWithoutStoreInput
  }

  export type StoreUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isLocal?: BoolFieldUpdateOperationsInput | boolean
    databaseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    databaseToken?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provisionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    platformAdmins?: StorePlatformAdminUpdateManyWithoutStoreNestedInput
  }

  export type StoreUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isLocal?: BoolFieldUpdateOperationsInput | boolean
    databaseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    databaseToken?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provisionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    platformAdmins?: StorePlatformAdminUncheckedUpdateManyWithoutStoreNestedInput
  }

  export type StoreCreateManyInput = {
    id?: string
    slug: string
    name: string
    status?: string
    plan?: string
    isLocal?: boolean
    databaseUrl?: string | null
    databaseToken?: string | null
    subdomain: string
    customDomain?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    provisionedAt?: Date | string | null
  }

  export type StoreUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isLocal?: BoolFieldUpdateOperationsInput | boolean
    databaseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    databaseToken?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provisionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StoreUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isLocal?: BoolFieldUpdateOperationsInput | boolean
    databaseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    databaseToken?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provisionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PlatformAdminCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    status?: string
    isSuperAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stores?: StorePlatformAdminCreateNestedManyWithoutPlatformAdminInput
  }

  export type PlatformAdminUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    status?: string
    isSuperAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    stores?: StorePlatformAdminUncheckedCreateNestedManyWithoutPlatformAdminInput
  }

  export type PlatformAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isSuperAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stores?: StorePlatformAdminUpdateManyWithoutPlatformAdminNestedInput
  }

  export type PlatformAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isSuperAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stores?: StorePlatformAdminUncheckedUpdateManyWithoutPlatformAdminNestedInput
  }

  export type PlatformAdminCreateManyInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    status?: string
    isSuperAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isSuperAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isSuperAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePlatformAdminCreateInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    platformAdmin: PlatformAdminCreateNestedOneWithoutStoresInput
    store: StoreCreateNestedOneWithoutPlatformAdminsInput
  }

  export type StorePlatformAdminUncheckedCreateInput = {
    id?: string
    platformAdminId: string
    storeId: string
    role?: string
    createdAt?: Date | string
  }

  export type StorePlatformAdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformAdmin?: PlatformAdminUpdateOneRequiredWithoutStoresNestedInput
    store?: StoreUpdateOneRequiredWithoutPlatformAdminsNestedInput
  }

  export type StorePlatformAdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformAdminId?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePlatformAdminCreateManyInput = {
    id?: string
    platformAdminId: string
    storeId: string
    role?: string
    createdAt?: Date | string
  }

  export type StorePlatformAdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePlatformAdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformAdminId?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StorePlatformAdminListRelationFilter = {
    every?: StorePlatformAdminWhereInput
    some?: StorePlatformAdminWhereInput
    none?: StorePlatformAdminWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StorePlatformAdminOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StoreCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    isLocal?: SortOrder
    databaseUrl?: SortOrder
    databaseToken?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    provisionedAt?: SortOrder
  }

  export type StoreMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    isLocal?: SortOrder
    databaseUrl?: SortOrder
    databaseToken?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    provisionedAt?: SortOrder
  }

  export type StoreMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    name?: SortOrder
    status?: SortOrder
    plan?: SortOrder
    isLocal?: SortOrder
    databaseUrl?: SortOrder
    databaseToken?: SortOrder
    subdomain?: SortOrder
    customDomain?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    provisionedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type PlatformAdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    isSuperAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    isSuperAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformAdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    passwordHash?: SortOrder
    status?: SortOrder
    isSuperAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlatformAdminScalarRelationFilter = {
    is?: PlatformAdminWhereInput
    isNot?: PlatformAdminWhereInput
  }

  export type StoreScalarRelationFilter = {
    is?: StoreWhereInput
    isNot?: StoreWhereInput
  }

  export type StorePlatformAdminPlatformAdminIdStoreIdCompoundUniqueInput = {
    platformAdminId: string
    storeId: string
  }

  export type StorePlatformAdminCountOrderByAggregateInput = {
    id?: SortOrder
    platformAdminId?: SortOrder
    storeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StorePlatformAdminMaxOrderByAggregateInput = {
    id?: SortOrder
    platformAdminId?: SortOrder
    storeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StorePlatformAdminMinOrderByAggregateInput = {
    id?: SortOrder
    platformAdminId?: SortOrder
    storeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type StorePlatformAdminCreateNestedManyWithoutStoreInput = {
    create?: XOR<StorePlatformAdminCreateWithoutStoreInput, StorePlatformAdminUncheckedCreateWithoutStoreInput> | StorePlatformAdminCreateWithoutStoreInput[] | StorePlatformAdminUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutStoreInput | StorePlatformAdminCreateOrConnectWithoutStoreInput[]
    createMany?: StorePlatformAdminCreateManyStoreInputEnvelope
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
  }

  export type StorePlatformAdminUncheckedCreateNestedManyWithoutStoreInput = {
    create?: XOR<StorePlatformAdminCreateWithoutStoreInput, StorePlatformAdminUncheckedCreateWithoutStoreInput> | StorePlatformAdminCreateWithoutStoreInput[] | StorePlatformAdminUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutStoreInput | StorePlatformAdminCreateOrConnectWithoutStoreInput[]
    createMany?: StorePlatformAdminCreateManyStoreInputEnvelope
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StorePlatformAdminUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StorePlatformAdminCreateWithoutStoreInput, StorePlatformAdminUncheckedCreateWithoutStoreInput> | StorePlatformAdminCreateWithoutStoreInput[] | StorePlatformAdminUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutStoreInput | StorePlatformAdminCreateOrConnectWithoutStoreInput[]
    upsert?: StorePlatformAdminUpsertWithWhereUniqueWithoutStoreInput | StorePlatformAdminUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StorePlatformAdminCreateManyStoreInputEnvelope
    set?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    disconnect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    delete?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    update?: StorePlatformAdminUpdateWithWhereUniqueWithoutStoreInput | StorePlatformAdminUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StorePlatformAdminUpdateManyWithWhereWithoutStoreInput | StorePlatformAdminUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StorePlatformAdminScalarWhereInput | StorePlatformAdminScalarWhereInput[]
  }

  export type StorePlatformAdminUncheckedUpdateManyWithoutStoreNestedInput = {
    create?: XOR<StorePlatformAdminCreateWithoutStoreInput, StorePlatformAdminUncheckedCreateWithoutStoreInput> | StorePlatformAdminCreateWithoutStoreInput[] | StorePlatformAdminUncheckedCreateWithoutStoreInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutStoreInput | StorePlatformAdminCreateOrConnectWithoutStoreInput[]
    upsert?: StorePlatformAdminUpsertWithWhereUniqueWithoutStoreInput | StorePlatformAdminUpsertWithWhereUniqueWithoutStoreInput[]
    createMany?: StorePlatformAdminCreateManyStoreInputEnvelope
    set?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    disconnect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    delete?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    update?: StorePlatformAdminUpdateWithWhereUniqueWithoutStoreInput | StorePlatformAdminUpdateWithWhereUniqueWithoutStoreInput[]
    updateMany?: StorePlatformAdminUpdateManyWithWhereWithoutStoreInput | StorePlatformAdminUpdateManyWithWhereWithoutStoreInput[]
    deleteMany?: StorePlatformAdminScalarWhereInput | StorePlatformAdminScalarWhereInput[]
  }

  export type StorePlatformAdminCreateNestedManyWithoutPlatformAdminInput = {
    create?: XOR<StorePlatformAdminCreateWithoutPlatformAdminInput, StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput> | StorePlatformAdminCreateWithoutPlatformAdminInput[] | StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput | StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput[]
    createMany?: StorePlatformAdminCreateManyPlatformAdminInputEnvelope
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
  }

  export type StorePlatformAdminUncheckedCreateNestedManyWithoutPlatformAdminInput = {
    create?: XOR<StorePlatformAdminCreateWithoutPlatformAdminInput, StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput> | StorePlatformAdminCreateWithoutPlatformAdminInput[] | StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput | StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput[]
    createMany?: StorePlatformAdminCreateManyPlatformAdminInputEnvelope
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
  }

  export type StorePlatformAdminUpdateManyWithoutPlatformAdminNestedInput = {
    create?: XOR<StorePlatformAdminCreateWithoutPlatformAdminInput, StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput> | StorePlatformAdminCreateWithoutPlatformAdminInput[] | StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput | StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput[]
    upsert?: StorePlatformAdminUpsertWithWhereUniqueWithoutPlatformAdminInput | StorePlatformAdminUpsertWithWhereUniqueWithoutPlatformAdminInput[]
    createMany?: StorePlatformAdminCreateManyPlatformAdminInputEnvelope
    set?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    disconnect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    delete?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    update?: StorePlatformAdminUpdateWithWhereUniqueWithoutPlatformAdminInput | StorePlatformAdminUpdateWithWhereUniqueWithoutPlatformAdminInput[]
    updateMany?: StorePlatformAdminUpdateManyWithWhereWithoutPlatformAdminInput | StorePlatformAdminUpdateManyWithWhereWithoutPlatformAdminInput[]
    deleteMany?: StorePlatformAdminScalarWhereInput | StorePlatformAdminScalarWhereInput[]
  }

  export type StorePlatformAdminUncheckedUpdateManyWithoutPlatformAdminNestedInput = {
    create?: XOR<StorePlatformAdminCreateWithoutPlatformAdminInput, StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput> | StorePlatformAdminCreateWithoutPlatformAdminInput[] | StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput[]
    connectOrCreate?: StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput | StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput[]
    upsert?: StorePlatformAdminUpsertWithWhereUniqueWithoutPlatformAdminInput | StorePlatformAdminUpsertWithWhereUniqueWithoutPlatformAdminInput[]
    createMany?: StorePlatformAdminCreateManyPlatformAdminInputEnvelope
    set?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    disconnect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    delete?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    connect?: StorePlatformAdminWhereUniqueInput | StorePlatformAdminWhereUniqueInput[]
    update?: StorePlatformAdminUpdateWithWhereUniqueWithoutPlatformAdminInput | StorePlatformAdminUpdateWithWhereUniqueWithoutPlatformAdminInput[]
    updateMany?: StorePlatformAdminUpdateManyWithWhereWithoutPlatformAdminInput | StorePlatformAdminUpdateManyWithWhereWithoutPlatformAdminInput[]
    deleteMany?: StorePlatformAdminScalarWhereInput | StorePlatformAdminScalarWhereInput[]
  }

  export type PlatformAdminCreateNestedOneWithoutStoresInput = {
    create?: XOR<PlatformAdminCreateWithoutStoresInput, PlatformAdminUncheckedCreateWithoutStoresInput>
    connectOrCreate?: PlatformAdminCreateOrConnectWithoutStoresInput
    connect?: PlatformAdminWhereUniqueInput
  }

  export type StoreCreateNestedOneWithoutPlatformAdminsInput = {
    create?: XOR<StoreCreateWithoutPlatformAdminsInput, StoreUncheckedCreateWithoutPlatformAdminsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutPlatformAdminsInput
    connect?: StoreWhereUniqueInput
  }

  export type PlatformAdminUpdateOneRequiredWithoutStoresNestedInput = {
    create?: XOR<PlatformAdminCreateWithoutStoresInput, PlatformAdminUncheckedCreateWithoutStoresInput>
    connectOrCreate?: PlatformAdminCreateOrConnectWithoutStoresInput
    upsert?: PlatformAdminUpsertWithoutStoresInput
    connect?: PlatformAdminWhereUniqueInput
    update?: XOR<XOR<PlatformAdminUpdateToOneWithWhereWithoutStoresInput, PlatformAdminUpdateWithoutStoresInput>, PlatformAdminUncheckedUpdateWithoutStoresInput>
  }

  export type StoreUpdateOneRequiredWithoutPlatformAdminsNestedInput = {
    create?: XOR<StoreCreateWithoutPlatformAdminsInput, StoreUncheckedCreateWithoutPlatformAdminsInput>
    connectOrCreate?: StoreCreateOrConnectWithoutPlatformAdminsInput
    upsert?: StoreUpsertWithoutPlatformAdminsInput
    connect?: StoreWhereUniqueInput
    update?: XOR<XOR<StoreUpdateToOneWithWhereWithoutPlatformAdminsInput, StoreUpdateWithoutPlatformAdminsInput>, StoreUncheckedUpdateWithoutPlatformAdminsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StorePlatformAdminCreateWithoutStoreInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    platformAdmin: PlatformAdminCreateNestedOneWithoutStoresInput
  }

  export type StorePlatformAdminUncheckedCreateWithoutStoreInput = {
    id?: string
    platformAdminId: string
    role?: string
    createdAt?: Date | string
  }

  export type StorePlatformAdminCreateOrConnectWithoutStoreInput = {
    where: StorePlatformAdminWhereUniqueInput
    create: XOR<StorePlatformAdminCreateWithoutStoreInput, StorePlatformAdminUncheckedCreateWithoutStoreInput>
  }

  export type StorePlatformAdminCreateManyStoreInputEnvelope = {
    data: StorePlatformAdminCreateManyStoreInput | StorePlatformAdminCreateManyStoreInput[]
  }

  export type StorePlatformAdminUpsertWithWhereUniqueWithoutStoreInput = {
    where: StorePlatformAdminWhereUniqueInput
    update: XOR<StorePlatformAdminUpdateWithoutStoreInput, StorePlatformAdminUncheckedUpdateWithoutStoreInput>
    create: XOR<StorePlatformAdminCreateWithoutStoreInput, StorePlatformAdminUncheckedCreateWithoutStoreInput>
  }

  export type StorePlatformAdminUpdateWithWhereUniqueWithoutStoreInput = {
    where: StorePlatformAdminWhereUniqueInput
    data: XOR<StorePlatformAdminUpdateWithoutStoreInput, StorePlatformAdminUncheckedUpdateWithoutStoreInput>
  }

  export type StorePlatformAdminUpdateManyWithWhereWithoutStoreInput = {
    where: StorePlatformAdminScalarWhereInput
    data: XOR<StorePlatformAdminUpdateManyMutationInput, StorePlatformAdminUncheckedUpdateManyWithoutStoreInput>
  }

  export type StorePlatformAdminScalarWhereInput = {
    AND?: StorePlatformAdminScalarWhereInput | StorePlatformAdminScalarWhereInput[]
    OR?: StorePlatformAdminScalarWhereInput[]
    NOT?: StorePlatformAdminScalarWhereInput | StorePlatformAdminScalarWhereInput[]
    id?: StringFilter<"StorePlatformAdmin"> | string
    platformAdminId?: StringFilter<"StorePlatformAdmin"> | string
    storeId?: StringFilter<"StorePlatformAdmin"> | string
    role?: StringFilter<"StorePlatformAdmin"> | string
    createdAt?: DateTimeFilter<"StorePlatformAdmin"> | Date | string
  }

  export type StorePlatformAdminCreateWithoutPlatformAdminInput = {
    id?: string
    role?: string
    createdAt?: Date | string
    store: StoreCreateNestedOneWithoutPlatformAdminsInput
  }

  export type StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput = {
    id?: string
    storeId: string
    role?: string
    createdAt?: Date | string
  }

  export type StorePlatformAdminCreateOrConnectWithoutPlatformAdminInput = {
    where: StorePlatformAdminWhereUniqueInput
    create: XOR<StorePlatformAdminCreateWithoutPlatformAdminInput, StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput>
  }

  export type StorePlatformAdminCreateManyPlatformAdminInputEnvelope = {
    data: StorePlatformAdminCreateManyPlatformAdminInput | StorePlatformAdminCreateManyPlatformAdminInput[]
  }

  export type StorePlatformAdminUpsertWithWhereUniqueWithoutPlatformAdminInput = {
    where: StorePlatformAdminWhereUniqueInput
    update: XOR<StorePlatformAdminUpdateWithoutPlatformAdminInput, StorePlatformAdminUncheckedUpdateWithoutPlatformAdminInput>
    create: XOR<StorePlatformAdminCreateWithoutPlatformAdminInput, StorePlatformAdminUncheckedCreateWithoutPlatformAdminInput>
  }

  export type StorePlatformAdminUpdateWithWhereUniqueWithoutPlatformAdminInput = {
    where: StorePlatformAdminWhereUniqueInput
    data: XOR<StorePlatformAdminUpdateWithoutPlatformAdminInput, StorePlatformAdminUncheckedUpdateWithoutPlatformAdminInput>
  }

  export type StorePlatformAdminUpdateManyWithWhereWithoutPlatformAdminInput = {
    where: StorePlatformAdminScalarWhereInput
    data: XOR<StorePlatformAdminUpdateManyMutationInput, StorePlatformAdminUncheckedUpdateManyWithoutPlatformAdminInput>
  }

  export type PlatformAdminCreateWithoutStoresInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    status?: string
    isSuperAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformAdminUncheckedCreateWithoutStoresInput = {
    id?: string
    email: string
    name: string
    passwordHash: string
    status?: string
    isSuperAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlatformAdminCreateOrConnectWithoutStoresInput = {
    where: PlatformAdminWhereUniqueInput
    create: XOR<PlatformAdminCreateWithoutStoresInput, PlatformAdminUncheckedCreateWithoutStoresInput>
  }

  export type StoreCreateWithoutPlatformAdminsInput = {
    id?: string
    slug: string
    name: string
    status?: string
    plan?: string
    isLocal?: boolean
    databaseUrl?: string | null
    databaseToken?: string | null
    subdomain: string
    customDomain?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    provisionedAt?: Date | string | null
  }

  export type StoreUncheckedCreateWithoutPlatformAdminsInput = {
    id?: string
    slug: string
    name: string
    status?: string
    plan?: string
    isLocal?: boolean
    databaseUrl?: string | null
    databaseToken?: string | null
    subdomain: string
    customDomain?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    provisionedAt?: Date | string | null
  }

  export type StoreCreateOrConnectWithoutPlatformAdminsInput = {
    where: StoreWhereUniqueInput
    create: XOR<StoreCreateWithoutPlatformAdminsInput, StoreUncheckedCreateWithoutPlatformAdminsInput>
  }

  export type PlatformAdminUpsertWithoutStoresInput = {
    update: XOR<PlatformAdminUpdateWithoutStoresInput, PlatformAdminUncheckedUpdateWithoutStoresInput>
    create: XOR<PlatformAdminCreateWithoutStoresInput, PlatformAdminUncheckedCreateWithoutStoresInput>
    where?: PlatformAdminWhereInput
  }

  export type PlatformAdminUpdateToOneWithWhereWithoutStoresInput = {
    where?: PlatformAdminWhereInput
    data: XOR<PlatformAdminUpdateWithoutStoresInput, PlatformAdminUncheckedUpdateWithoutStoresInput>
  }

  export type PlatformAdminUpdateWithoutStoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isSuperAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlatformAdminUncheckedUpdateWithoutStoresInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    isSuperAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StoreUpsertWithoutPlatformAdminsInput = {
    update: XOR<StoreUpdateWithoutPlatformAdminsInput, StoreUncheckedUpdateWithoutPlatformAdminsInput>
    create: XOR<StoreCreateWithoutPlatformAdminsInput, StoreUncheckedCreateWithoutPlatformAdminsInput>
    where?: StoreWhereInput
  }

  export type StoreUpdateToOneWithWhereWithoutPlatformAdminsInput = {
    where?: StoreWhereInput
    data: XOR<StoreUpdateWithoutPlatformAdminsInput, StoreUncheckedUpdateWithoutPlatformAdminsInput>
  }

  export type StoreUpdateWithoutPlatformAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isLocal?: BoolFieldUpdateOperationsInput | boolean
    databaseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    databaseToken?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provisionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StoreUncheckedUpdateWithoutPlatformAdminsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    plan?: StringFieldUpdateOperationsInput | string
    isLocal?: BoolFieldUpdateOperationsInput | boolean
    databaseUrl?: NullableStringFieldUpdateOperationsInput | string | null
    databaseToken?: NullableStringFieldUpdateOperationsInput | string | null
    subdomain?: StringFieldUpdateOperationsInput | string
    customDomain?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    provisionedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StorePlatformAdminCreateManyStoreInput = {
    id?: string
    platformAdminId: string
    role?: string
    createdAt?: Date | string
  }

  export type StorePlatformAdminUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    platformAdmin?: PlatformAdminUpdateOneRequiredWithoutStoresNestedInput
  }

  export type StorePlatformAdminUncheckedUpdateWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformAdminId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePlatformAdminUncheckedUpdateManyWithoutStoreInput = {
    id?: StringFieldUpdateOperationsInput | string
    platformAdminId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePlatformAdminCreateManyPlatformAdminInput = {
    id?: string
    storeId: string
    role?: string
    createdAt?: Date | string
  }

  export type StorePlatformAdminUpdateWithoutPlatformAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    store?: StoreUpdateOneRequiredWithoutPlatformAdminsNestedInput
  }

  export type StorePlatformAdminUncheckedUpdateWithoutPlatformAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StorePlatformAdminUncheckedUpdateManyWithoutPlatformAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    storeId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}