// Replace the shebang in the compiled file with a Node.js shebang
import * as fs from 'fs';
import * as path from 'path';

const distFile = path.join(__dirname, '..', 'dist', 'index.js');

// Read the compiled file
fs.readFile(distFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading compiled file:', err);
    return;
  }

  // Remove any existing shebang
  let contentWithoutShebang = data.replace(/^#!.*\n/, '');

  // Add Node.js shebang
  const nodeShebang = '#!/usr/bin/env node\n';
  const finalContent = nodeShebang + contentWithoutShebang;

  // Write the modified content back to the file
  fs.writeFile(distFile, finalContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing final file:', err);
      return;
    }
    console.log('Post-build process completed successfully');
  });
});