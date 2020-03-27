# Fing Device Recognition API Client #

<!--
Make Badges here:

-->

![version](https://img.shields.io/badge/node-%3E%3D%206.0.0-green)

A [node.js](https://nodejs.org/) package with a usable client for [Fing DevRecog API](https://app.fing.com/internet/business/devrecog).
The package contains:

 * A Command Line Interface immediately usable for testing
 * A Javascript library for integration in other software

## Installation ##

## For [Node.js](https://nodejs.org/)

```bash
npm install fing-devrecog
```

## For Browser ##

```bash
bower install fing-devrecog
```

## Usage ##

### Standalone ###

```bash
fing-devrecog-cli --help
```

### Library ###

* Setup

```
var Heartbeat = require(“fing-heartbeat”);

var server = "hb.example.com";
var api_key = "xxxxxxxxx"; # Ask to repo owner
var mac = "00:70:07:00:70:07";
var gatewayMac = "DE:AD:C0:DE:BE:EF"
 
var checkPeriod = 10 * 60 * 1000;

var hb = new Heartbeat(server, api_key, mac, gatewayMac);

hb.start();

setInterval(function () {
  var status = hb.status();
  console.log(status);
}, checkPeriod);

```

* Teardown

```
hb.stop();
```

### Parameters ###

| # |     Parameter       | Mandatory |      Default      |               Description                                    |
| - | ------------------- | --------- | ----------------- | ------------------------------------------------------------ |
| 1 | server              |    NO     |  service.fing.com | Host Name of server implementing Fing Devrecog API           |
| 2 | apiKey              |    YES    |        -          | Api Key (required for authentication)                        |
| 3 | macAddress          |    YES    |        -          | MAC address of device                                        |
| 4 | gwMacAddress        |    YES    |        -          | MAC address of network gateway. If in a router, same as mac. |
| 5 | uuid                |    NO     |        -          | Unique ID of the device, if available. E.g. serial number.   |
| 6 | brand               |    NO     |        -          | Brand name                                                   |
| 7 | model               |    NO     |        -          | Model of the device                                          |
| 8 | hwPlatform          |    NO     |        -          | Hardware platform of the device                              |

## Change History ##

* v1.0.0
    * Support of mandatory fields (IP, MAC) 
    * Support of DHCP 

## License ##

(c) 2016-2020 Fing LTD, MIT license.

## Author ##

Tommaso Latini <tommaso at fing.com>

