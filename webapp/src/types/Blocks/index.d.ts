/**
 * @module Blocks
 *
 * Using a barrel file so that all the specific Block types can be defined in their own files.
 *
 * Ref: https://github.com/basarat/typescript-book/blob/master/docs/tips/barrel.md
 */

/* Re-export utility types */
export * from "./UUID";
export * from "./BlockTypes";

/* Re-export Block types */
export * from "./Base";
export * from "./SOP";
export * from "./Checkbox";

import { SOP_UUID, SopBlock } from "./SOP";
import { Checkbox_UUID, CheckboxBlock } from "./Checkbox";

/**
 * Sum Type of all possible Block IDs
 *
 * Although this resolves to String at the end, this is still defined
 * for documentation purposes with the type annotation.
 */
export type BlockID = SOP_UUID | Checkbox_UUID;

/**
 * Sum Type of all possible Leaf node Block types
 */
export type LeafBlock = CheckboxBlock;

/**
 * Sum Type of all possible Block types
 */
export type Block = SopBlock | CheckboxBlock;
