/**
 * UUID
 */
export type UUID = string;

export interface BaseBlock {
  /**
   * UUID
   */
  id: UUID;

  // CreatedBy?

  permissions?: "public" | "private";

  type: "SOP" | "checkbox" | "if-else";

  /**
   * To be type narrowed / defined by the specific block types
   */
  properties: unknown; // can be `any` too

  /**
   * ID of the parent `Block`. This is optional as root Blocks do not have any parent blocks
   *
   * property that define the relationship with other blocks
   *
   * @todo Maybe create stricter types? Like only root blocks dont have parent while all other blocks have?
   */
  parent?: UUID;
}

export interface SopBlock extends BaseBlock {
  type: "SOP";

  properties: {
    title: string;

    description?: string;
  };

  /**
   * UUID
   *
   * This is a property that define the relationship with other blocks
   */
  content: Array<Block>;
}

export interface CheckBoxBlock extends BaseBlock {
  type: "checkbox";

  properties: {
    title: string;

    description?: string;

    /**
     * Only for checkbox type
     */
    checked: boolean;
  };
}

/**
 * Sum of all possible Leaf node Block types
 */
export type LeafBlock = CheckBoxBlock;

/**
 * Sum of all possible Block types
 */
export type Block = SopBlock | CheckBoxBlock;
