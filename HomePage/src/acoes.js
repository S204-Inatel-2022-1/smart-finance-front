//  API DAS AÇÕES (inserir)

const xhr = new XMLHttpRequest()
const xhrGet = new XMLHttpRequest()

const submit = document.querySelector('#enviaAcao')
submit.addEventListener('click', (event) => {
    event.preventDefault()

    const input = document.querySelector('#acao')
    const acao = input.value

    xhr.open("POST", "http://localhost:3000/comprar-acoes");
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(
        {
            acao: acao
        }
    ))

    xhr.onreadystatechange = function () {
        const data = this.response
        console.log(data)
    }
})

xhrGet.onreadystatechange = function() {
    if (xhrGet.readyState === 4) {
        let data = []
        data = JSON.parse(this.response)
        
        const myList = document.querySelector('#myList')

        for(var i=0; i<data.length; i++){
            myList.innerHTML += '<li>'+data[i].acao+'</li>'
        }
    }
}

xhrGet.open('GET', 'http://localhost:3000/comprar-acoes')
xhrGet.send()