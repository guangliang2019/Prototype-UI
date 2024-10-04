#!/usr/bin/env node

import { program } from 'commander';

// just a banner
const banner = `

██████╗ ██████╗  ██████╗ ████████╗ ██████╗ 
██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝██╔═══██╗
██████╔╝██████╔╝██║   ██║   ██║   ██║   ██║
██╔═══╝ ██╔══██╗██║   ██║   ██║   ██║   ██║
██║     ██║  ██║╚██████╔╝   ██║   ╚██████╔╝
╚═╝     ╚═╝  ╚═╝ ╚═════╝    ╚═╝    ╚═════╝ 
████████╗██╗   ██╗██████╗ ███████╗    ██╗   ██╗██╗
╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝    ██║   ██║██║
   ██║    ╚████╔╝ ██████╔╝█████╗█████╗██║   ██║██║
   ██║     ╚██╔╝  ██╔═══╝ ██╔══╝╚════╝██║   ██║██║
   ██║      ██║   ██║     ███████╗    ╚██████╔╝██║
   ╚═╝      ╚═╝   ╚═╝     ╚══════╝     ╚═════╝ ╚═╝
`;

console.log(banner);

// define version and description
program
  .version('0.0.0', '-v, --version', 'Output the current version')
  .description('CLI for prototype-ui project');

// define init command
program
  .command('init')
  .description('Initialize a new prototype-ui project')
  .action(() => {
    console.warn('This command is not yet implemented');
    console.log('Initializing new prototype-ui project...');
  });

// 定义 add 命令
program
  .command('add <component>')
  .description('Add a new component to the project')
  .action((component) => {
    console.warn('This command is not yet implemented');
    console.log(`Adding new component: ${component}`);
  });

// define remove command
program
  .command('remove <component>')
  .description('Remove a component from the project')
  .action((component) => {
    console.warn('This command is not yet implemented');
    console.log(`Removing component: ${component}`);
  });

// define list command
program
  .command('list')
  .description('List all components in the project')
  .action(() => {
    console.warn('This command is not yet implemented');
    console.log('Listing all components...');
  });

program.parse(process.argv);

// show help message if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
