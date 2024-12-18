function logout_button() {
    document.cookie="login=false";
    window.location.href = "homepage.html";
}