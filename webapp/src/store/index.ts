import { defineStore } from "pinia";
import { oof } from "simpler-fetch";

import type { Block, UUID, SopBlock } from "../types/Blocks";
import type { BlockTypePredicate } from "../types/BlocksTypePredicate";

import { isSopBlock } from "../types/BlocksTypePredicate";

/**
 * Type of generic object used for the Block cache
 */
type BlockMap = { [key: UUID]: Block };

// Need to define type of State object externally, to define optional properties
interface State {
  // All available blocks is stored in a big object block cache where block
  // ID is key and value is Block itself
  blocks: BlockMap;

  // An alternative is to use the Map type which has better performance for
  // frequent additions and removals of key-value pairs compared to Objects.
  // However there is no native support for serialization or parsing with JSON.
  // Therefore not as easy to persist this data structure, which is why Object
  // literals are used for now.
  //
  // blocks: Map<UUID, Block>;
  //
  // @todo Explore alternative so that if the ID type ever changes, it follows it
  // blocks: Map<Block.id, Block>;
}

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore("main", {
  // arrow function recommended for full type inference
  // all the State properties will have their type inferred automatically
  state: (): State => ({
    // @todo Hydrate from localStorage?
    // Defaults to an empty object
    blocks: {},
  }),

  // https://pinia.vuejs.org/core-concepts/actions.html
  actions: {
    /**
     * Load a block asynchronously. This will either retrieve it
     * locally if available or from the server and cache it locally.
     */
    async getBlock(blockID: UUID): Promise<Block> {
      // Check if block is already loaded locally
      const localBlock = this.blocks[blockID];

      // If block is available locally, run a background process to
      // load its children and return the block directly.
      if (localBlock) {
        // This is a fire and forget and only needed here and not needed
        // when getting back from API, because all info needed to show
        // current block level should already be retrieved.
        this.getChildBlocks(localBlock.children);

        // Break out of method and return block after starting background process
        return localBlock;
      }

      // Load from blocks from API, this will return both the requested slot,
      // and all of the other blocks that is its direct children / descendant
      const { res, err } = await oof
        .GET(`/blocks/${blockID}`)
        // @todo Add in auth token here
        // .header()
        .runJSON<{ blocks: BlockMap }>();

      // @todo Fix the error handling
      if (err) throw err;
      if (!res.ok) throw new Error(JSON.stringify(res));

      // Cache all the blocks locally in state tree
      this.blocks = { ...this.blocks, ...res.blocks };

      // Can safely assume that if API returns an ok, it means that the
      // block with the given blockID must be in the key value pair store.
      return res.blocks[blockID];
    },

    /**
     * Type Safe getBlock method that does runtime type narrowing with
     * the given generic type and type predicate parameter.
     */
    async getBlockSafe<BlockType extends Block>(
      blockID: UUID,
      blockTypePredicate: BlockTypePredicate
    ): Promise<BlockType> {
      const block = await this.getBlock(blockID);
      if (blockTypePredicate(block)) return block as BlockType;
      else throw new Error("Invalid block type");
    },

    /**
     * Wrapper around `getBlock` method with runtime type narrowing to `SopBlock`.
     */
    async getSopBlock(blockID: UUID): Promise<SopBlock> {
      const block = await this.getBlock(blockID);
      if (isSopBlock(block)) return block;

      throw new Error(`Internal Error: Expected SOP block, found ${block}`);

      // Alternative that reads better but goes through the safe
      // method (an extra layer of indirection).
      // return this.getBlockSafe<SopBlock>(blockID, isSopBlock);
    },


    /**
     * Function to load child blocks into cache
     */
    async getChildBlocks(childIDs: Array<UUID> | undefined) {
      if (childIDs)
        // Fire and forget calls to `getBlock` method to run in the background.
        //
        // Checking if child block is already loaded here directly instead of
        // relying on the `getBlock` method to check local cache because if the
        // child block is already loaded and `getBlock` is called on that block
        // ID again, then it will load the child block of this child block.
        // Which means it is loading one extra level of blocks deeper than needed,
        // which is why there is an extra check here before calling `getBlock`.
        for (const childID of childIDs)
          if (!this.blocks[childID]) this.getBlock(childID);
    },

    /**
     * Reset all the checked items (uncheck them) recursively for all child blocks too
     */
    async resetSOP(sopID: SOP_UUID) {
      // Get the SOP block first from the store
      const block = await this.getSopBlock(sopID);

      // Load the child blocks one by one and uncheck them if possible
      // However this is a fire and forget action where it can run in
      // the background asynchronously.
      for (const childID of block.children)
        this.getBlock(childID).then((block) => {
          // @todo Use a switch case instead with strong type checking to ensure all cases checked
          //
          // Uncheck if checkbox block
          if (block.type === "checkbox") block.properties.checked = false;
          // Recursively call `resetSOP` if it is a nested SOP
          else if (block.type === "SOP") this.resetSOP(childID);
          // Error if a new block is introduced but isn't handled here
          else console.log("Internal Error: Invalid Block type");
        });

      /*

      // Not so memory efficient where a new array is created with map
      const block = await this.getSopBlock(sopID);
      Promise.all(
        block.children.map((childID) =>
          this.getBlock(childID).then((block) => {
            if (block.type === "checkbox") block.properties.checked === false;
            else if (block.type === "SOP") this.resetSOP(childID);
            else console.log("Internal Error: Invalid Block type");
          })
        )
      );

      // Less memory efficient where all blocks are stored in an in memory array first
      const block = await this.getSopBlock(sopID);
      Promise.all(block.children.map(this.getBlock)).then((blocks) =>
        blocks.map((block) => {
          if (block.type === "checkbox") block.properties.checked === false;
          else if (block.type === "SOP") this.resetSOP(block.id);
          else console.log("Internal Error: Invalid Block type");
        })
      );

      */
    },
  },

  // https://www.npmjs.com/package/pinia-plugin-persistedstate
  // Persists this store's state in localStorage to reuse across sessions
  // Note that this is not efficient for large to extremely large state trees,
  // as on every state change, the entire tree is serialized and saved.
  //
  // https://github.com/prazdevs/pinia-plugin-persistedstate#-usage
  // This can be customised to use other storage implementations like sessionStorage
  persist: true,
});
