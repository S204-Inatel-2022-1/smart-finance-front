var url = 'http://127.0.0.1:3000/users'
var xhr = new XMLHttpRequest();

const usuario = document.querySelector('#nomeCadastro')
const emailUsuario = document.querySelector('#emailCadastro')
const senhaUsuario = document.querySelector('#senhaCadastro')
const cadastrar = document.querySelector('#cadastrar')

cadastrar.addEventListener('click', (event) => {
    event.preventDefault()

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
})