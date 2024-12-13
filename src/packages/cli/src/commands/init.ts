import { Command } from 'commander';
import inquirer from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import { TemplateConfig, ComponentGraph } from '../types';
import { getRemoteComponents, getRemoteTemplates, installTemplate } from '../utils';

const templatesPath = 'https://raw.githubusercontent.com/guangliang2019/Prototype-UI/refs/heads/main/src/packages/cli/templates.json';

export const initCommand = new Command('init')
  .description('Initialize a new prototype-ui project')
  .action(async () => {
    const templates: TemplateConfig = await getRemoteTemplates(templatesPath);

    const templateChoices = Object.keys(templates.templates).map((name) => {
      return { name: `${name} - ${templates.templates[name].description}`, value: name };
    });

    const templateAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        message: 'Select a template:',
        choices: templateChoices,
      },
    ]);

    const selectedTemplate = templates.templates[templateAnswer.template];
    await installTemplate(selectedTemplate);

    const componentsPath = path.resolve(__dirname, '../components.json');
    const remoteComponents: ComponentGraph = await getRemoteComponents(componentsPath);

    const localComponents: ComponentGraph = { 
      baseUrl: remoteComponents.baseUrl,
      defaultBranch: remoteComponents.defaultBranch,
      components: {} 
    };

    // Analyze template to identify required components (implementation needed)
    // Example: 
    // const requiredComponents = analyzeTemplate(selectedTemplate);

    // for (const component of requiredComponents) {
    //   await installComponent(component, remoteComponents, localComponents);
    // }

    const localComponentsPath = path.resolve(process.cwd(), 'prototype-ui-components.json');
    fs.writeFileSync(localComponentsPath, JSON.stringify(localComponents, null, 2));

    console.log('Prototype-UI project initialized successfully.');
  });