// OAuth client details
var client_id     = "WebApiVendorSample";

// Other settings
var oamBaseUrl    = "https://demo-as.ig.com/openam";
var client_realm  = "external";
var state         = "af0ifjsldkj";

var vendorBaseUrl = getBaseURL();

function getBaseURL() {
    var protocol = window.location.protocol;
    var hostname = window.location.hostname;
    var port     = window.location.port;
    return protocol + "//" + hostname + (port != "" ? ":" + port : "");
}

function encodeQueryData(data) {
    var ret = [];
    for (var d in data) {
        ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    }
    return ret.join("&");
}

function parseQueryString() {
    var query = {};
    var args  = document.location.search.substring(1).split('&');
    for (var arg in args) {
        var m = args[arg].split('=');
        query[decodeURIComponent(m[0])] = decodeURIComponent(m[1]);
    }
    return query;
}

function getAuthorizationCodeGrantUrl() {
    var authRequestParameters = {
        "response_type": "code",
        "client_id": client_id,
        "realm": client_realm,
        "scope": "full_readonly",
        "redirect_uri": vendorBaseUrl + "/api-vendor-sample/authorization-handler",
        "state": state
    };
    return oamBaseUrl + "/oauth2/authorize?" + encodeQueryData(authRequestParameters);
}

function getImplicitGrantUrl() {
    var authRequestImplicitParameters = {
        "response_type": "token",
        "client_id": client_id,
        "realm": client_realm,
        "scope": "full_readonly",
        "redirect_uri": vendorBaseUrl + "/api-vendor-sample/implicit-grant-handler.html",
        "state": state
    };
    return oamBaseUrl + "/oauth2/authorize?" + encodeQueryData(authRequestImplicitParameters);
}