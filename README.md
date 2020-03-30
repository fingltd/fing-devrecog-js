# Fing Device Recognition API Client #

<!--
Make Badges here:

-->

![version](https://img.shields.io/badge/node-%3E%3D%206.0.0-green)

Usable client for [Fing DevRecog API](https://app.fing.com/internet/business/devrecog).

The Fing client is a Javascript client that can accuratly determine 
what kind of device is using your application based on the client user agent. 
It exploits Fing Device Recognition technology to provides detailed information
about the endpoint:

 * Type
 * Make
 * Model
 * Operating System (Name, Version, Build)

The package contains:

 * A Command Line Interface immediately usable for testing for [node.js](https://nodejs.org/) 
 * A Javascript library for integration in your browser app
 * A working example ```index.html```
 
## Installation ##

```bash
npm install fing-devrecog
```

## Usage ##

First, you need to initialize the client passing as argument a valid
license key for Fing DevRecog API:

`var client = new FingDevRecogApi2(licenseKey);`

And you can then interrogate the API with a user agent:

`var device = client.recognizeUserAgent("Some User Agent")`

__N.B.__ On a browser you can use as input the default user agent 
```navigator.userAgent```

The device object contains some method to easily manage the output:

```
device.getType()        // Get Device Type
device.getTypeName()    // Get Device Type Name
device.getTypeGroup()   // Get Device Type Group
device.getBrand()       // Get Brand
device.getOSName()      // Get OS Name of the device
device.getOSVersion()   // Get OS version of the device
```

### Node ###

#### Standalone ####

```bash
fing-devrecog-cli --help
```

 * Parameters
 
| # |     Parameter       | Mandatory |          Default          |               Description                                    |
| - | ------------------- | --------- | ------------------------- | ------------------------------------------------------------ |
| 1 | server              |    NO     |      service.fing.com     | Host Name of server implementing Fing Devrecog API           |
| 2 | apiKey              |    YES    |              -            | Api Key (required for authentication)                        |
| 3 | Http User Agent     |    NO     | ```navigator.userAgent``` | HTTP User Agent to Identify                                  |

#### Library ####

* Setup

```js

const FingDevRecogApi2 = require("fing-devrecog");

var fingClient = new FingDevRecogApi2("<valid license key>");

fingClient.recognizeUserAgent("<a User Agent>)
    .then((o) => console.log("Device: ", o));

```

### Browser ###

Import scripts in your application.
The file [```index.html```](https://github.com/fingltd/fing-devrecog-js/blob/master/index.html) contains a working example.

<!--You can also add the following tag to your webpage:-->

<!--`<script src="http://fingerbank.org/libs/javascript/fingerbank-client.js"></script>`-->

```html
    <script src="src/fing-http-client-browser.js"></script>
    <script src="src/fing-devrecog-api-2.js"></script>
```


## Change History ##

* v1.0.0
    * Support for Fing DevRecog API v2 
    * API for HTTP User Agent

## License ##

(c) 2016-2020 Fing LTD, MIT license.

## Author ##

Tommaso Latini <tommaso at fing.com>

