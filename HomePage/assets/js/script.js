var urlCadastro = 'http://127.0.0.1:3000/cadastro'
var urlLogin = 'http://127.0.0.1:3000/login'
var xhr = new XMLHttpRequest();

//mudar o estado de login para cadastro e vice-verso
const btn_Entrar = document.querySelector("#op1")
const btn_Cadastrar = document.querySelector("#op2")
const body = document.querySelector("body")

//cadastro
const usuario = document.querySelector('#nomeCadastro')
const emailUsuario = document.querySelector('#emailCadastro')
const senhaUsuario = document.querySelector('#senhaCadastro')
const cadastrar = document.querySelector('#cadastrar')

//login
const emailLogin = document.querySelector('#emailLogin')
const senhaLogin = document.querySelector('#senhaLogin')
const entrar = document.querySelector('#entrar')

//cadastro
cadastrar.addEventListener('click', (event) => {
    event.preventDefault()

    xhr.open("POST", urlCadastro, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(
        {
            nome: usuario.value,
            email: emailUsuario.value, 
            senha: senhaUsuario.value
        }
    ))

    console.log('user registered')
})

//login
entrar.addEventListener('click', (event) => {
    event.preventDefault()

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            const data = this.responseText;

            console.log(data)
            /*
            if(data == 'Success'){
                localStorage.setItem("loggedIn", "true")
                localStorage.setItem("username", user.value)
                
                if(localStorage.getItem("username") == "admin")
                {
                    window.location.replace("./connect/api-test.html")
                }
                else{
                    window.location.replace('./conta.html')
                }
            }
            else{
                localStorage.setItem("loggedIn", "false")
                senhaIncorreta.setAttribute("style", "display: block;")
                load.setAttribute('class', 'lds-ellipsis')
                botao.setAttribute('class', 'enviar')
            }*/
        }

        if(this.status == 400){
            //localStorage.setItem("loggedIn", "false")
            console.log("sem sucesso , status == 400")
        }
    }

    xhr.open("POST", urlLogin, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(
        {
            email: emailLogin.value,
            senha: senhaLogin.value
        }
    ))
})

//Mudar o estado de login para cadastro e vice-verso
btn_Entrar.addEventListener("click", function(){ //Eventos
    body.className = "Entrar-js" //Body recebe uma classe com nome   
})

btn_Cadastrar.addEventListener("click", function(){ //Eventos
    body.className = "Cadastrar-js" //Body recebe uma classe com nome   
})