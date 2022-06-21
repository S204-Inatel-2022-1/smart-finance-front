//  LIsTA DE TODAS AS AÇÕES

const xhrGet = new XMLHttpRequest()

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
        let aux
        if(acao[i] == 'GOLL' | acao[i] == 'SBSP' | acao[i] == 'SUZB'){
            aux = acao[i].charAt(0) + acao[i].charAt(1) + acao[i].charAt(2)
            table.innerHTML +=
            `<tr>
                <td>`+acao[i]+`</td>
                <td><button onclick="updateChart('`+aux+`')" type="button" class="btn btn-rounded btn-success mb-3">Selecionar</button></td>
            </tr>`
        }
        else{
            table.innerHTML +=
            `<tr>
                <td>`+acao[i]+`</td>
                <td><button onclick="updateChart('`+acao[i]+`')" type="button" class="btn btn-rounded btn-success mb-3">Selecionar</button></td>
            </tr>`
        }
    }
}