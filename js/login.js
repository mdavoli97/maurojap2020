document.addEventListener("DOMContentLoaded", function(e){

    const loginForm = document.getElementById('loginForm');
    
    loginForm.onsubmit = (e) => {
        e.preventDefault()
        const user = document.getElementById('inputEmail').value;
        const password = document.getElementById('inputPassword').value;
        window.localStorage.setItem('userId', user)
        window.localStorage.setItem('userPass', password)
        window.location.href = "/main.html"
    };
    
})
