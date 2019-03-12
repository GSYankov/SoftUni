function validateRequest(request) {
    function printErrorMsg(header) {
        throw new Error(`Invalid request header: Invalid ${header}`)
    }

    function messageValidation(request) {
        if (messageRgx.test(request.message) || request.message === "") {
            isMessageValid = true;
            return;
        }

        printErrorMsg("Message");
    }

    function versionValidation(request) {
        if (request.version === "HTTP/0.9" ||
            request.version === "HTTP/1.0" ||
            request.version === "HTTP/1.1" ||
            request.version === "HTTP/2.0") {
            isVersionValid = true;
            return;
        }

        printErrorMsg("Version");
    }

    function uriValidation(request) {
        if (request.uri === "*" || uriRgx.test(request.uri)) {
            isUriValid = true;
            return;
        }

        printErrorMsg("URI");
    }

    function methodValidation(request) {
        if (request.method === "GET" ||
            request.method === "POST" ||
            request.method === "DELETE" ||
            request.method === "UPDATE") {
            isMethodValid = true;
            return;
        }

        printErrorMsg("Method");
    }

    const uriRgx = /^([\w.]+)$/gm;
    const messageRgx = /^([^<>\\&'"]+)$/gm;

    let isMethodValid = false;
    let isUriValid = false;
    let isVersionValid = false;
    let isMessageValid = false;

    if (request.hasOwnProperty("method")) {
        methodValidation(request);
    } else (
        printErrorMsg("Method")
    );

    if (request.hasOwnProperty("uri")) {
        uriValidation(request);
    } else (
        printErrorMsg("URI")
    );

    if (request.hasOwnProperty("version")) {
        versionValidation(request);
    } else (
        printErrorMsg("Version")
    );

    if (request.hasOwnProperty("message")) {
        messageValidation(request);
    } else (
        printErrorMsg("Message")
    );

    if (isMethodValid && isUriValid && isVersionValid && isMessageValid) {
        return (request);
    }

}

let test0 = {
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
};

let test1 = {
    method: 'OPTIONS',
    uri: 'git.master',
    version: 'HTTP/1.1',
    message: '-recursive'
};

let test2 = {
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
};

let test3 = {
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
};

console.log(validateRequest(test3));