import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../..');

moduleAlias.addAliases({
  '@config': path.join(files, 'src/config'),
  '@controllers': path.join(files, 'src/controllers'),
  '@models': path.join(files, 'src/models'),
  '@repositories': path.join(files, 'src/repositories'),
  '@util': path.join(files, 'src/util'),
  '@test': path.join(files, 'test'),
});
