/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as converstations from "../converstations.js";
import type * as files from "../files.js";
import type * as projects from "../projects.js";
import type * as tasks from "../tasks.js";
import type * as verifyAuth from "../verifyAuth.js";
import type * as verifyOwner from "../verifyOwner.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  converstations: typeof converstations;
  files: typeof files;
  projects: typeof projects;
  tasks: typeof tasks;
  verifyAuth: typeof verifyAuth;
  verifyOwner: typeof verifyOwner;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
