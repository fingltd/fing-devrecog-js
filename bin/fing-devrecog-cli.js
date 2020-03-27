#!/usr/bin/env node

/**
 * Created by Tommaso Latini <tommaso@fing.com> on 27/03/2020
 */

const argparse = require('argparse');
const pkg = require('../package.json');

// Create Parser
var parser = new argparse.ArgumentParser({
    version: pkg.version,
    addHelp: true,
    description: pkg.description
});

// Add arguments
//   *) Mandatory
parser.addArgument(['-s', '--server'], {
    help: 'Server Host of Fing DevRecog API. Default to service.fing.com',
    defaultValue: "server.fing.com"
});
parser.addArgument(['-k', '--key'], {
    help: 'License Key to access to Fing Cloud API ( https://apidocs.fing.io )'
});

//   *) Optional

// Parse CLI options and set properly the environment variables
var options = parser.parseArgs();

// Check mandatory arguments
if (!options.key) {
    throw new Error("Missing Api Key for Authentication");
}

console.log("+------------------------------------------------+");
console.log("     _____ _");
console.log("    |  ___(_)_ __   __ _");
console.log("    | |_  | | '_ \\ / _` |");
console.log("    |  _| | | | | | (_| |");
console.log("    |_|   |_|_| |_|\\__, |");
console.log("                   |___/");
console.log("              DEVRECOG API COMMAND LINE");
console.log("+------------------------------------------------+");
console.log("Starting %s [%s] ...", pkg.name, pkg.version);
console.log("");
console.log("API Host: %s", options.server);
console.log("License Key: %s...", options.key.substr(0, 8));


