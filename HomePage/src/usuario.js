if(localStorage.getItem('loggedIn') == 'true')
{
    setTimeout(() => {
        const user = document.querySelector('#nome-usuario')
        const usuario = JSON.parse(localStorage.getItem("user"))
    
        if(user)
        {
            user.innerText = usuario.nome
        }
    
    }, 250)
}

else{
    location.replace('./login.html')
}

function logOut(){
    localStorage.setItem('loggedIn', 'false')
}