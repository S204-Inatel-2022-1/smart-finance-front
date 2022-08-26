const xhr = new XMLHttpRequest()

let data = []

xhr.onreadystatechange = async function() {
    if (xhr.readyState === 4) {
        
        data = await JSON.parse(this.response)
        maracutaia(data)
    }
}

xhr.open('GET', 'https://smart-finance-back.herokuapp.com/buscar')
xhr.send()

const list = document.querySelector('#list');
const search = document.querySelector('#pesquisa');
/*import {data} from "../rename.js";*/

const nome = document.getElementById("pesquisa");
const form = document.getElementById("btnP");

function maracutaia(data){
    
    let s = [];
    let n = [];
    //let status = [];
    //let exchange = [];
    //let date = [];
    let i = 0; 

    let sortDirection = false;
    let personData = [];

    let definir = 0;

    const cleanupWord = word => {
        return word.trim().toUpperCase();
    }

    const filterData = word => {
        return data.filter(item => item.code.includes(word));
    }

    const render = (word = "") => {
        list.innerHTML = "";

        word = cleanupWord(word);
        const filtered = filterData(word);

        definir = filtered.length;    
        s = [];
        n = [];
        /*
        status = [];
        exchange = [];
        date = [];
        */
        personData = [];
        i = 0;


        filtered.forEach(item => {
        if(i<5){
            personData.push(item);

            s.push(item.code);
            n.push(item.name);
            //status.push(item.status);
            //exchange.push(item.exchange);
            //date.push(item.ipoDate);
            /*
            if(item.status == 'Active'){
                status.push("assets/images/icon/market-value/ativo2.png");
            }
            else{
                status.push("assets/images/icon/market-value/inativo2.png");
            }
            */
            i = i + 1;

        }
        
        
        });
    }

    search.addEventListener("input", e => {
        e.preventDefault()
        if(search.value.length >= 1){ 
            render(search.value);

            loadTableData(personData);
        }

        const b1 = document.getElementById("botao1");
        const b2 = document.getElementById("botao2");
        const b3 = document.getElementById("botao3");
        const b4 = document.getElementById("botao4");
        const b5 = document.getElementById("botao5");


        btnP.addEventListener('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            
            if(definir != 0){
                getData(nome.value.toUpperCase());
                console.log(nome.value.toUpperCase())
                

            }
            else{
                window.alert('Essa Empresa não existe!!');
            }
            
        })

        b1.addEventListener('click', function(e){
            e.stopImmediatePropagation();
            const aux = s[0].slice(1, -1)
            getData(aux);

        
            
        });
        b2.addEventListener('click', function(e){
            e.stopImmediatePropagation();
        
            const aux = s[1].slice(1, -1)
            getData(aux);

            
            
        })
        
        b3.addEventListener('click', function(e){
            e.stopImmediatePropagation();
        

            const aux = s[2].slice(1, -1)
            getData(aux);
                
            
            
        })
        b4.addEventListener('click', function(e){
            e.stopImmediatePropagation();
            
            const aux = s[3].slice(1, -1)
            getData(aux);
                
            
            
        })
        b5.addEventListener('click', function(e){
            e.stopImmediatePropagation();

            
            
            const aux = s[4].slice(1, -1)
            getData(aux);
            
            
            
        })



    });

    //     let sortDirection = false;
    let personD = [ 
        {
        "code": "-",
        "name": "-",
        "variacao": "-"
        /*
        "exchange": "-",
        "assetType": "-",
        "ipoDate": "-",
        "delistingDate": null,
        "status": "-"
        */
    }];

    function loadTableData(personData){
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';
    let j = 0; 
    let cli = [];
    cli.push('botao1');
    cli.push('botao2');
    cli.push('botao3');
    cli.push('botao4');
    cli.push('botao5');

    for(let person of personData){
        dataHtml += `<tr><td>${person.code}</td><td>${person.name}</td><td>${person.variacao}</td><td><button type="button" id="${cli[j]}" class="btn-outline-success mb-3" onmousedown="bleep.play()"></button></td>`;
        j=j+1;    
    }

    tableBody.innerHTML = dataHtml;
    }

    function sortColumn(columnName){
    const dataType = typeof personData[0][columnName];
    sortDirection = !sortDirection;

    switch(dataType){
        case 'number':
            sortNumberColumn(sortDirection, columnName);
            break;
    }

    loadTableData(personData);
    }

    function sortNumberColumn(sort, columnName){
    personData = personData.sort((p1, p2) => {
        return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
    });
    }
}

async function getData(label){

    const url = `https://smart-finance-back.herokuapp.com/historico`;

    try{
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(
            {
                name: label
            }
        ))

        xhr.onreadystatechange = async function () {
            const data = await this.response
            
            teste(data);
        }

        const teste = async (data) => {
            const a = JSON.parse(data)

            for(var i = 0; i < a.ultimas.length; i++){
                a.ultimas[i].abrir = Number((a.ultimas[i].abrir).toString().replace(',', '.'))
                a.ultimas[i].fechamento = Number((a.ultimas[i].fechamento).toString().replace(',', '.'))
                a.ultimas[i].alto = Number((a.ultimas[i].alto).toString().replace(',', '.'))
                a.ultimas[i].baixo = Number((a.ultimas[i].baixo).toString().replace(',', '.'))

                const dia = (a.ultimas[i].data).charAt(0) + (a.ultimas[i].data).charAt(1) 
                const ano = (a.ultimas[i].data).charAt(14) + (a.ultimas[i].data).charAt(15) + (a.ultimas[i].data).charAt(16) + (a.ultimas[i].data).charAt(17)
                let mes = (a.ultimas[i].data).charAt(6) + (a.ultimas[i].data).charAt(7) + (a.ultimas[i].data).charAt(8)
                mes = descobreMes(mes)

                const dataCerta = ano + '-' + mes + '-' + dia

                dataPoints1.push({x: new Date((dataCerta).slice(0,10)), y: [Number(a.ultimas[i].abrir), Number(a.ultimas[i].alto), Number(a.ultimas[i].baixo), Number(a.ultimas[i].fechamento)], color: a.ultimas[i].abrir < a.ultimas[i].fechamento ? "green" : "red"});
                dataPoints2.push({x: new Date((dataCerta).slice(0,10)), y: Number(a.ultimas[i].fechamento), color: a.ultimas[i].abrir < a.ultimas[i].fechamento ? "green" : "red"});
            }            
            stockChart.render();

            stockChart.options.title.text = a.name

            function descobreMes(mesCru){

                let mes

                if(mesCru == 'jan'){
                    mes = '01'
                }
                if(mesCru == 'fev'){
                    mes = '02'
                }
                if(mesCru == 'mar'){
                    mes = '03'
                }
                if(mesCru == 'abr'){
                    mes = '04'
                }
                if(mesCru == 'mai'){
                    mes = '05'
                }
                if(mesCru == 'jun'){
                    mes = '06'
                }
                if(mesCru == 'jul'){
                    mes = '07'
                }
                if(mesCru == 'ago'){
                    mes = '08'
                }
                if(mesCru == 'set'){
                    mes = '09'
                }
                if(mesCru == 'out'){
                    mes = '10'
                }
                if(mesCru == 'nov'){
                    mes = '11'
                }
                if(mesCru == 'dez'){
                    mes = '12'
                }

                return mes
            }
        };
        
        var dataPoints1 = [], dataPoints2 = [];
    
        var stockChart = new CanvasJS.StockChart("chartContainer",{
            exportEnabled: true,
            backgroundColor: "#000",
            theme: "dark1",
            title:{
                text:`Empresa ${label}`
            },
            charts: [{
            toolTip: {
                shared: true
            },
            axisX: {
                lineThickness: 5,
                tickLength: 0,
                labelFormatter: function(e) {
                return "";
                },
                crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return ""
                }
                }
            },
            axisY2: {
                title: "Cotação",
                prefix: "R$"
            },
            legend: {
                verticalAlign: "top",
                horizontalAlign: "left"
            },
            data: [{
                name: "Preço (em Reais)",
                yValueFormatString: "$#.###,##",
                axisYType: "secondary",
                type: "candlestick",
                risingColor: "green",
                fallingColor: "red",
                dataPoints : dataPoints1
            }]
            }],
            navigator: {
            data: [{
                color: "green",
                dataPoints: dataPoints2
            }],
            slider: {
                minimum: new Date('2022, 02, 01'),
                maximum: new Date('2022, 03, 01')
            }
            }
        });
    }catch(e){
        console.log(e)
    }
}