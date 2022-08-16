//  LIsTA DE TODAS AS AÇÕES

const xhrGet = new XMLHttpRequest()
const xhr = new XMLHttpRequest()

const table = document.querySelector('#my-table-body')

xhrGet.onreadystatechange = function() {
    if (xhrGet.readyState === 4) {
        let data = []
        data = JSON.parse(this.response)
        
        listAcoes(data)
    }
}

xhrGet.open('GET', 'http://localhost:3000/comprar-acoes')
xhrGet.send()

function listAcoes(acao){

    for(var i=0; i<acao.length; i++){
        
        table.innerHTML +=
        `<tr>
            <td>`+acao[i].acao+`</td>
            <td><button onClick="getData('`+acao[i].acao+`')" type="button" class="btn btn-rounded btn-success mb-3">Selecionar</button></td>
        </tr>`
    }
}
