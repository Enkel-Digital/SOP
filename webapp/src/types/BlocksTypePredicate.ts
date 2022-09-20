import type { Block, SopBlock, CheckboxBlock } from "./Blocks";

/**
 * Type predicate to check if a given block is a SOP Block
 */
export const isSopBlock = (block: Block): block is SopBlock =>
  (block as SopBlock).type === "SOP";

/**
 * Type predicate to check if a given block is a Checkbox Block
 */
export const isCheckboxBlock = (block: Block): block is CheckboxBlock =>
  (block as CheckboxBlock).type === "checkbox";

/**
 * Sum type of all the predicate functions
 */
export type BlockTypePredicate = typeof isSopBlock | typeof isCheckboxBlock;
