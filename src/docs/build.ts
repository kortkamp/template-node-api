import fs from 'fs';

import swaggerConfig from '.';

const docsContent = JSON.stringify(swaggerConfig);

const path = './src/docs/swagger.json';

fs.writeFile(path, docsContent, () => {
  console.log('docs file generated!');
});
