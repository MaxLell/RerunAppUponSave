#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('node:child_process');

program
    .version('0.2.0')
    .argument('[filename]', 'Name of a file, which is to be executed')
    .action(async ({ filename }) => {

        // Make sure that the file can actually be accessed
        const name = filename || 'index.js';
        try {
            await fs.promises.access(name);
        }
        catch (error) {
            throw new Error(`Cannot access the file: ${name}`);
        }

        let processObject; // We must not name this variable process, as this is a global variable
        const startProgramCallback = debounce(() => {
            if (processObject) {
                // When the program has been started before, we now make sure to kill
                // off the previous instance of the program. (otherwise outdated processes
                // will run in parallel). Furthermore we can have many processes running in
                // parallel that run on outdated binaries
                processObject.kill();
            }
            console.log('>>>>>> Start new process');
            // Spawn a new instance of a node process.
            // The first 2 arguments basically resemble, how a regular node
            // command would be executed: 'node filename.js'

            // stdio: 'inherit' passes through the outputs from the child process
            // to the parent process (CLI). If this is not provided, the stdout
            // from the child process is not forwarded to the CLI, from which this
            // process is spawned from.
            processObject = spawn('node', [name], { stdio: 'inherit' });
        }, 100);

        chokidar.watch('.')
            .on('add', startProgramCallback)
            .on('change', startProgramCallback)
            .on('unlink', startProgramCallback)
    })

program.parse(process.argv);

