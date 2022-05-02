var urlCadastro = 'http://127.0.0.1:3000/cadastro'
var urlLogin = 'http://127.0.0.1:3000/login'
var xhr = new XMLHttpRequest();


//Mudar o estado de login para cadastro e vice-verso
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

//troca de senha


//Mudar o estado de login para cadastro e vice-verso
btn_Entrar.addEventListener("click", function(){ //Eventos
    body.className = "Entrar-js" //Body recebe uma classe com nome   
})

btn_Cadastrar.addEventListener("click", function(){ //Eventos
    body.className = "Cadastrar-js" //Body recebe uma classe com nome   
})

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

            if(data == 'Success'){
                localStorage.setItem("loggedIn", "true")
                
                window.location.replace('./success.html')
            }
            else{
                window.location.replace('./not-allowed.html')
            }
        }

        if(this.status == 400){
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