/**
 * @module database.provider
 *
 * Exports a value provider to inject DB into services.
 */

import { ProviderTokens } from '../constants';

// @todo TMP scaffold
const db = {};

// Custom provider to inject the DB globally, so all services can get
// the database injected to them rather than loading it seperately.
export const dbProvider = {
  provide: ProviderTokens.DB,
  useValue: db,
};
