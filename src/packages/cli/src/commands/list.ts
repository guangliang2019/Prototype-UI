import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentGraph } from '../types';

export const listCommand = new Command('list')
  .description('List all components in the project')
  .action(() => {
    const localComponentsPath = path.resolve(process.cwd(), 'prototype-ui-components.json');
    if (!fs.existsSync(localComponentsPath)) {
      console.error('prototype-ui-components.json not found. Please initialize a project first.');
      return;
    }

    const localComponents: ComponentGraph = JSON.parse(fs.readFileSync(localComponentsPath, 'utf-8'));

    console.log('Installed components:');
    for (const name in localComponents.components) {
      const component = localComponents.components[name];
      console.log(`  ${name}:`);
      console.log(`    Repository: ${localComponents.baseUrl}/${component.repoUrl}`);
      console.log(`    Branch: ${component.branch}`);
      console.log(`    Version: ${component.version}`);
      console.log(`    Dependencies: ${component.dependencies.join(', ')}`);
    }
  });