import type { BlockID, SOP_UUID, Checkbox_UUID } from "./Blocks";

/**
 * Type predicate to check if a given ID is a SOP Block ID
 */
export const isSopId = (id: BlockID): id is SOP_UUID => id.startsWith("SOP-");

/**
 * Type predicate to check if a given ID is a Checkbox Block ID
 */
export const isCheckboxId = (id: BlockID): id is Checkbox_UUID =>
  id.startsWith("CKB-");

/**
 * Sum type of all the predicate functions
 */
export type IdTypePredicate = typeof isSopId | typeof isCheckboxId;
