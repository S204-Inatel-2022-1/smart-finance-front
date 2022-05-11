var url = 'https://smart-finance-back.herokuapp.com/cadastro'
var xhr = new XMLHttpRequest();

const usuario = document.querySelector('#nomeCadastro')
const emailUsuario = document.querySelector('#emailCadastro')
const senhaUsuario = document.querySelector('#senhaCadastro')
const cadastrar = document.querySelector('#cadastrar')

cadastrar.addEventListener('click', (event) => {
    event.preventDefault()

    try{
        xhr.open("POST", url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(
            {
                nome: usuario.value,
                email: emailUsuario.value, 
                senha: senhaUsuario.value
            }
        ))

        console.log('user registered')

        window.location.replace("../HomePage/dashboard.html")
    }
    catch(e)
    {
        console.log(e)
    }
})