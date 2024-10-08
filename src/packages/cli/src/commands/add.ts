import { Command } from 'commander';
import inquirer from 'inquirer';
import { ComponentGraph } from '../types';
import * as fs from 'fs';
import * as path from 'path';
import { getRemoteComponents, installComponent } from '../utils';

const componentsPath = 'https://raw.githubusercontent.com/guangliang2019/Prototype-UI/refs/heads/main/src/packages/cli/components.json';

export const addCommand = new Command('add')
  .argument('<component>', 'Name of the component to add')
  .description('Add a new component to the project')
  .action(async (component: string) => {
    const componentsPath = path.resolve(__dirname, '../components.json');
    const remoteComponents: ComponentGraph = await getRemoteComponents(componentsPath);
    
    const localComponentsPath = path.resolve(process.cwd(), 'prototype-ui-components.json');
    let localComponents: ComponentGraph = { components: {}, baseUrl: '', defaultBranch: '' };
    if (fs.existsSync(localComponentsPath)) {
      localComponents = JSON.parse(fs.readFileSync(localComponentsPath, 'utf-8'));
    }

    if (!remoteComponents.components[component]) {
      console.error(`Component "${component}" not found in available components.`);
      return;
    }

    const dependencies = await resolveDependencies(component, remoteComponents, localComponents);

    const installConfirm = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Install component "${component}" and its dependencies: ${dependencies.join(', ')}?`,
        default: true,
      },
    ]);

    if (installConfirm.confirm) {
      for (const dep of dependencies) {
        await installComponent(dep, remoteComponents, localComponents);
      }

      // Update localComponents with newly installed components and their versions
      fs.writeFileSync(localComponentsPath, JSON.stringify(localComponents, null, 2));

      console.log(`Component "${component}" and its dependencies installed successfully.`);
    }
  });

async function resolveDependencies(
  component: string,
  remoteComponents: ComponentGraph,
  localComponents: ComponentGraph
): Promise<string[]> {
  const dependencies: string[] = [];
  const stack: string[] = [component];

  while (stack.length > 0) {
    const currentComponent = stack.pop()!;

    if (!localComponents.components[currentComponent]) {
      dependencies.push(currentComponent);
      
      const remoteComponent = remoteComponents.components[currentComponent];
      stack.push(...remoteComponent.dependencies);
    }
  }

  return dependencies.reverse();
}