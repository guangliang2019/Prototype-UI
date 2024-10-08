import { Command } from 'commander';

export const addCommand = new Command('add')
  .argument('<component>', 'Name of the component to add')
  .description('Add a new component to the project')
  .action((component: string) => {
    console.warn('This command is not yet implemented');
    console.log(`Adding new component: ${component}`);
  });