/**
 * Created by Tommaso Latini <tommaso@fing.com> on 27/03/2020
 */

// Tests run through node so we need to export it

const FAKE_NUID = "__nuid__";
const FAKE_IP = "0.0.0.0";
const FAKE_MAC = "02:00:00:00:00:00";
const FAKE_NETWORK = FAKE_IP + "/32";

const isNode = typeof module !== 'undefined' && module.exports;

function Device(recognition) {

    if (!recognition)
        recognition = {};

    this.getType = () => {
        return recognition['type'] || "Unknown";
    };

    this.getTypeName = () => {
        return recognition['type-name'] || "-";
    };

    this.getTypeGroup = () => {
        return recognition['type-group-name'] || "-";
    };

    this.getBrand = () => {
        return recognition['brand'] || "-";
    };

    this.getModel = () => {
        return recognition['model'] || "-";
    };

    this.getOSName = () => {
        return recognition['os-name'] || "-";
    };

    this.getOSVersion = () => {
        return recognition['os-ver'] || "-";
    };

}

function FingDevRecogApi2(licenseKey) {

    var httpClient = (function (key) {
        if (isNode) {
            const FingHttpClient = require('./fing-http-client');
            return new FingHttpClient(key);
        }
        return new FingHttpClient(key);
    })(licenseKey);

    function recognize(body) {
        return httpClient.doRequest('POST', "/2/devrecog", body);
    }

    // Public
    this.getApiVersion = () => {
        return 2;
    };

    this.recognize = recognize;

    this.recognizeUserAgent = (hua) => {
        return recognize({
            networks: [
                {
                    nuid: FAKE_NUID,
                    netaddress: FAKE_NETWORK,
                    internetip: FAKE_IP,
                    gatewayip: FAKE_IP,
                    gatewaymac: FAKE_MAC,
                    dnsip: FAKE_IP
                }
            ],
            devices: [
                {
                    ip: FAKE_IP,
                    mac: FAKE_MAC,
                    nuid: FAKE_NUID,
                    state: "UP",
                    hua: [{userAgent: hua}]
                }
            ]
        }).then((o) => {
            return new Device(o.devices[0].recognition);
        });
    };

    this.getLicenseInfo = () => {
        return httpClient.doRequest('GET', "/2/devrecoglicense");
    };

    this.getDeviceTypes = () => {
        return httpClient.doRequest("GET", "/2/devicetypes");
    };

}

if (isNode)
    module.exports = FingDevRecogApi2;
