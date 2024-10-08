import { Command } from 'commander';

export const listCommand = new Command('list')
  .description('List all components in the project')
  .action(() => {
    console.warn('This command is not yet implemented');
    console.log('Listing all components...');
  });