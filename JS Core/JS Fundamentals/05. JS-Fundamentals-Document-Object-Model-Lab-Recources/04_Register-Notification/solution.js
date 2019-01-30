function register() {
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let emailRegexPattern = new RegExp("(.+)@(.+).(com|bg)");
    let isEmailValid = emailRegexPattern.test(email);

    if (username && password && isEmailValid) {
        let combinedStr = `<h1>Successful Registration!</h1>Username: ${username}<br>Email: ${email}<br>Password: ${password.replace(/./g, '*')}`
        let resultElement = document.getElementById("result");

        setTimeout(function () {
            resultElement.innerHTML = (combinedStr);
        }, 5000);
    }
}
