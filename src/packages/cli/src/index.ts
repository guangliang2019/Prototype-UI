#!/usr/bin/env ts-node
import { banner } from './banner';
import { setupCLI } from './cli';

console.log(banner);

const program = setupCLI();
program.parse(process.argv);

// show help message if no command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}