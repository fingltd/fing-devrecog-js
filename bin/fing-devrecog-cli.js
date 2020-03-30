#!/usr/bin/env node

/**
 * Created by Tommaso Latini <tommaso@fing.com> on 27/03/2020
 */

const argparse = require('argparse');

const FingDevRecogApi2 = require("../index");
const pkg = require('../package.json');

// Create Parser
var parser = new argparse.ArgumentParser({
    addHelp: true,
    version: pkg.version,
    description: pkg.description
});

// Add arguments
//   *) Mandatory
parser.addArgument(['-k', '--key'], {
    help: 'License Key to access to Fing Cloud API ( https://apidocs.fing.io )',
    required: true
});
parser.addArgument(['--hua'], {
    help: 'HTTP User Agent to identify. Default to browser agent',
    required: true
});

//   *) Optional
parser.addArgument(['--verbose'], {
    help: 'Increase output verbosity',
    type: Boolean,
    defaultValue: false,
    action: 'storeTrue'
});

// Parse CLI options and set properly the environment variables
var options = parser.parseArgs();

// Check mandatory arguments
if (!options.key) {
    throw new Error("Missing Api Key for Authentication");
}

console.debug = options.verbose ? console.log : () => {};

console.debug("Starting %s [%s] ...", pkg.name, pkg.version);
console.debug("License Key: %s...", options.key.substr(0, 8));

var fingClient = new FingDevRecogApi2(options.key);

console.debug("Initialized client for v" + fingClient.getApiVersion() + " API");

fingClient.recognizeUserAgent(options.hua)
    .then((device) => {
        console.log(" -------------+------------------- ");
        console.log(" Device Type  |", device.getTypeName());
        console.log(" Device Group |", device.getTypeGroup());
        console.log(" Device Brand |", device.getBrand());
        console.log(" Device Model |", device.getBrand());
        console.log(" Device OS    |", device.getOSName() + " / "  + device.getOSVersion());
        console.log(" -------------+------------------- ");
    })
    .catch((e) => console.log("Error: ", e));


