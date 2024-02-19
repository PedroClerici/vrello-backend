import { resolve } from 'node:path';
import moduleAlias from 'module-alias';

moduleAlias.addAliases({
  '@': resolve(__dirname, '..'),
});
