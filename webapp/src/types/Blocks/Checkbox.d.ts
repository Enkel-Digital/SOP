import type { UUID } from "./UUID";
import type { BaseBlock } from "./Base";

/**
 * Type of Checkbox block IDs.
 */
export type Checkbox_UUID = UUID;

export interface CheckboxBlock extends BaseBlock {
  type: "CKB";

  id: Checkbox_UUID;

  properties: {
    title: string;

    description?: string;

    /**
     * Boolean to track if the box has been checked
     */
    checked: boolean;
  };
}
