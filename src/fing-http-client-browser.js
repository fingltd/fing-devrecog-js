/**
 * Created by Tommaso Latini <tommaso@fing.com> on 31/03/2020
 */

const FING_SERVICE_HOST = "service.fing.com";
const FING_SERVICE_PORT = 443;
const USER_AGENT = "Fing API Client v2";
const APPLICATION_JSON = "application/json";

function FingHttpClient(key) {

    this.doRequest = function (method, path, body) {

        return new Promise(function (resolve, reject) {

            var json = null;

            var req = new XMLHttpRequest();

            req.open(method, `https://${FING_SERVICE_HOST}:${FING_SERVICE_PORT}${path}`, true);

            req.setRequestHeader('X-Api-Key', key);
            req.setRequestHeader('Accept', APPLICATION_JSON);

            if (body) {
                json = JSON.stringify(body);
                req.setRequestHeader('Content-Type', APPLICATION_JSON);
            }

            req.onreadystatechange = function (e) {

                if (req.readyState === XMLHttpRequest.DONE) {
                    if(199 < e.status && e.status < 300) {
                        resolve(JSON.parse(body));
                    } else {
                        console.log(e);
                        reject(new Error(`${e.status}: ${e.statusText}`));
                    }
                }
            };
            req.send(json);
        });
    }
}
