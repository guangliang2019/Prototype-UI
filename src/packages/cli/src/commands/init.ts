import { Command } from 'commander';

export const initCommand = new Command('init')
  .description('Initialize a new prototype-ui project')
  .action(() => {
    console.warn('This command is not yet implemented');
    console.log('Initializing new prototype-ui project...');
  });