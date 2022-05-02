var url = 'http://127.0.0.1:3000/login'
var xhr = new XMLHttpRequest();

const emailLogin = document.querySelector('#emailLogin')
const senhaLogin = document.querySelector('#senhaLogin')

const entrar = document.querySelector('#entrar')
entrar.addEventListener('click', (event) => {
    event.preventDefault()

    xhr.open("POST", url, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(
        {
            email: emailLogin.value, 
            senha: senhaLogin.value
        }
    ))
})

//Mudar o estado de login para cadastro e vice-verso
var btn_Entrar = document.querySelector("#op1")
var btn_Cadastrar = document.querySelector("#op2")

var body = document.querySelector("body")

btn_Entrar.addEventListener("click", function(){ //Eventos
    body.className = "Entrar-js" //Body recebe uma classe com nome   
})

btn_Cadastrar.addEventListener("click", function(){ //Eventos
    body.className = "Cadastrar-js" //Body recebe uma classe com nome   
})