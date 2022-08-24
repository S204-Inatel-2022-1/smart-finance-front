const xhrGet = new XMLHttpRequest()
const xhr = new XMLHttpRequest()

let data = []

xhrGet.onreadystatechange = async function() {
    if (xhrGet.readyState === 4) {
        
        data = await JSON.parse(this.response)
        maracutaia(data)
    }
}

xhrGet.open('GET', 'http://localhost:3000/buscar')
xhrGet.send()

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
                

            }
            else{
                window.alert('Essa Empresa não existe!!');
            }
            
        })

        b1.addEventListener('click', function(e){
        e.stopImmediatePropagation();
    
            getData(s[0]);

        
            
        });
        b2.addEventListener('click', function(e){
            e.stopImmediatePropagation();
        
                getData(s[1]);

            
            
        })
        
        b3.addEventListener('click', function(e){
            e.stopImmediatePropagation();
        

                getData(s[2]);
                
            
            
        })
        b4.addEventListener('click', function(e){
            e.stopImmediatePropagation();
            
                getData(s[3]);
                
            
            
        })
        b5.addEventListener('click', function(e){
            e.stopImmediatePropagation();

            
            
                getData(s[4]);
            
            
            
        })



    });

    //     let sortDirection = false;
    let personD = [ 
        {
        "code": "-",
        "name": "-"
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
        dataHtml += `<tr><td>${person.code}</td><td>${person.name}</td><td><img class="ativoD" src=""}></td><td><button type="button" id="${cli[0]}" class="btn-outline-success mb-3" onmousedown="bleep.play()"></button></td>`;
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