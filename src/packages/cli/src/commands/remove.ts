import { Command } from 'commander';
import prompt from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import { ComponentGraph } from '../types';

export const removeCommand = new Command('remove')
  .argument('<component>', 'Name of the component to remove')
  .description('Remove a component from the project')
  .action(async (component: string) => {
    const localComponentsPath = path.resolve(process.cwd(), 'prototype-ui-components.json');
    if (!fs.existsSync(localComponentsPath)) {
      console.error('prototype-ui-components.json not found. Please initialize a project first.');
      return;
    }

    let localComponents: ComponentGraph = JSON.parse(fs.readFileSync(localComponentsPath, 'utf-8'));

    if (!localComponents.components[component]) {
      console.error(`Component "${component}" not found in the project.`);
      return;
    }

    const dependents = findDependents(component, localComponents);

    if (dependents.length > 0) {
      const removeConfirm = await prompt.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Component "${component}" is used by: ${dependents.join(', ')}. Are you sure you want to remove it?`,
          default: false,
        },
      ]);

      if (!removeConfirm.confirm) {
        return;
      }
    }

    delete localComponents.components[component];

    // Remove component's code from the project (implementation needed)

    fs.writeFileSync(localComponentsPath, JSON.stringify(localComponents, null, 2));

    console.log(`Component "${component}" removed successfully.`);
  });

function findDependents(component: string, localComponents: ComponentGraph): string[] {
  const dependents: string[] = [];

  for (const name in localComponents.components) {
    if (localComponents.components[name].dependencies.includes(component)) {
      dependents.push(name);
    }
  }

  return dependents;
}