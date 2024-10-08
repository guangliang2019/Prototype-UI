import { Command } from 'commander';

export const removeCommand = new Command('remove')
  .argument('<component>', 'Name of the component to remove')
  .description('Remove a component from the project')
  .action((component: string) => {
    console.warn('This command is not yet implemented');
    console.log(`Removing component: ${component}`);
  });