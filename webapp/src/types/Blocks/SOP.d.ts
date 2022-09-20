import type { UUID } from "./UUID";
import type { BaseBlock } from "./Base";

/**
 * Type of SOP block IDs.
 */
export type SOP_UUID = UUID;

export interface SopBlock extends BaseBlock {
  type: "SOP";

  id: SOP_UUID;

  properties: {
    title: string;

    description?: string;
  };

  /**
   * This is a property that define the relationship with other blocks.
   * This is not the block object, rather this is the IDs of the child blocks.
   */
  children: Array<UUID>;
}
