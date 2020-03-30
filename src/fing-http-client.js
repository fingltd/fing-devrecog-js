/**
 * Created by Tommaso Latini <tommaso@fing.com> on 31/03/2020
 */

const FING_SERVICE_HOST = "service.fing.com";
const FING_SERVICE_PORT = 443;
const USER_AGENT = "Fing API Client v2";
const APPLICATION_JSON = "application/json";

const https = require('https');

function FingHttpClient(key) {

    var self = this;

    this.createOptions = function(method, path, body) {
        var options = {
            headers: {}
        };
        options.headers['X-Api-Key'] = key;
        options.headers['User-Agent'] = USER_AGENT;
        options.headers['Accept'] = APPLICATION_JSON;

        if (body) {
            options.json = JSON.stringify(body);
            options.headers['Content-Length'] = options.json.length;
            options.headers['Content-Type'] = APPLICATION_JSON;
        }

        options.hostname = FING_SERVICE_HOST;
        options.port = FING_SERVICE_PORT;
        options.method = method;
        options.path = path;
        options.agent = new https.Agent({
            keepAlive: true
        });

        return options;
    };

    this.doRequest = function(method, path, body) {

        var options = self.createOptions(method, path, body);

        return new Promise(function(resolve, reject) {

            const req = https.request(options, res => {
                    //console.log(`Status Code: ${res.statusCode}`);
                    //console.log("Headers: ", res.headers);
                    var body = '';
                    res.setEncoding('utf8');
                    res.on('data', (chunk) => {
                        body += chunk;
                    });
                    res.on('end', () => {
                        if (199 < res.statusCode && res.statusCode < 300) {
                            resolve(JSON.parse(body));
                        } else {
                            reject(new Error(`${res.statusCode}: ${res.statusMessage}`));
                        }
                    });
                }
            );

            req.on('error', (e) => {
                //console.log(`Problem with request: ${e.message}`);
                reject(e);
            });

            if (options.json)
                req.write(options.json);

            req.end();

        });
    }
}
module.exports = FingHttpClient;