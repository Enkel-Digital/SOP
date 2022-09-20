import type { UUID } from "./UUID";
import type { BlockTypes } from "./BlockTypes";

export interface BaseBlock {
  /**
   * UUID
   */
  id: UUID;

  permissions?: "public" | "private";

  /**
   *
   */
  type: BlockTypes;

  /**
   * To be type narrowed / defined by the specific block types
   */
  properties: unknown; // can be `any` too

  /**
   * ID of the parent `Block`. This is optional as root Blocks do not have any parent blocks
   *
   * property that define the relationship with other blocks
   *
   * @todo Try stricter types where only root blocks dont have parent while all other blocks have
   */
  parent?: UUID;

  /**
   * This is a property that define the relationship with other blocks.
   * This is not the block object, rather this is the IDs of the child blocks.
   */
  children?: Array<UUID>;
}
