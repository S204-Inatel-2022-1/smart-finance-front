//  LIsTA DE TODAS AS AÇÕES

const xhrGet = new XMLHttpRequest()

const acoesLista = ["ABEV","AZUL","AMER","BBAI","BBAR","BRML3","BBDC4","BRAP4","BBAS3","BRKM5","BRFS3","BPAC1","CRFB3","CCRO3","CMIG4","CIEL3","COGN3","CSAN3","CPFE3","CVCB3","CYRE3","ECOR3","ELET6","EMBR3","ENBR3","ENGI1","ENEV3","EGIE3","EQTL3","EZTC3","FLRY3","GGBR4","GOAU4","GOLL4","NTCO3","HAPV3","HYPE3","ITSA4","ITUB4","JBSS3","JHSF3","KLBN1","RENT3","LCAM3","LREN3","MGLU3","MRFG3","BEEF3","MRVE3","MULT3","PCAR3","PETR4","VBBR3","PRIO3","QUAL3","RADL3","RAIL3","SBSP3","SANB1","CSNA3","SULA1","SUZB3","TAEE1","VIVT3","TIMS3","TOTS3","UGPA3","USIM5","VALE3","VIIA3","WEGE3","YDUQ3"]
const table = document.querySelector('#acoesTable')

for(var i=0; i<acoesLista.length; i++){

    acoesLista[i] = acoesLista[i].charAt(0) + acoesLista[i].charAt(1) + acoesLista[i].charAt(2) + acoesLista[i].charAt(3)

    table.innerHTML += 
    `<tr>
        <td>`+acoesLista[i]+`</td>
        <td><button onclick="updateChart('`+acoesLista[i]+`')" type="button" class="btn btn-rounded btn-success mb-3">Selecionar</button></td>
        <td>Valor</td>
    </tr>`
}

xhrGet.onreadystatechange = function() {
    if (xhrGet.readyState === 4) {
        let data = []
        data = JSON.parse(this.response)
        rodaFor(data)
    }
}

xhrGet.open('GET', 'http://localhost:3000/comprar-acoes')
xhrGet.send()

function rodaFor(data){
    var cont = 0
    for(var i=0; i<acoesLista.length; i++){
        for(var j=0; j<data.length; j++){

            data[j].acao = data[j].acao.charAt(0) + data[j].acao.charAt(1) + data[j].acao.charAt(2) + data[j].acao.charAt(3)

            if(acoesLista[i] == data[j].acao){
                console.log('*   THERE IS A MATCH    *\n'+acoesLista[i]+' == '+data[j].acao)
                cont++

                //listAcoes(acoesLista[i])
            }
        }
    }
    if(cont==0) console.log('NÃO DEU MATCH')
    else    console.log('DEU MATCH!!! nº de matches == '+cont)
}

function listAcoes(acao){
    table.innerHTML += 
    `<tr>
        <td>`+acao+`</td>
        <td><button onclick="updateChart('`+acao+`')" type="button" class="btn btn-rounded btn-success mb-3">Selecionar</button></td>
        <td>Valor</td>
    </tr>`
}