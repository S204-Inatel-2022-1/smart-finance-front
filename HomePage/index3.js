const list = document.querySelector('#list');
const search = document.querySelector('#pesquisa');
import {data} from "./rename.js";

const nome = document.getElementById("pesquisa");
const form = document.getElementById("btnP");

console.log(data);
let s = [];
let n = [];
let status = [];
let exchange = [];
let date = [];
let i = 0; 

let sortDirection = false;
let personData = [];

let definir = 0;

const cleanupWord = word => {
    return word.trim().toUpperCase();
}

const filterData = word => {
    return data.filter(item => item.symbol.includes(word));
}

const render = (word = "") => {
    list.innerHTML = "";

    word = cleanupWord(word);
    const filtered = filterData(word);

    definir = filtered.length;    
    s = [];
    n = [];
    status = [];
    exchange = [];
    date = [];
    personData = [];
    i = 0;

    console.log(filtered.length);

    filtered.forEach(item => {
    // list.insertAdjacentHTML('beforeend', `<li>${item.symbol}</li>`)
    //console.log(item);
    if(i<5){
        personData.push(item);

        s.push(item.symbol);
        n.push(item.name);
        //status.push(item.status);
        exchange.push(item.exchange);
        date.push(item.ipoDate);

        if(item.status == 'Active'){
            status.push("assets/images/icon/market-value/ativo2.png");
        }
        else{
            status.push("assets/images/icon/market-value/inativo2.png");
        }

        i = i + 1;

    }
    
    console.log(personData);
    
    });
}

search.addEventListener("input", e => {
    // console.log(search.value);
    e.preventDefault()
    console.log(search.value);
    render(search.value);

    loadTableData(personData);

    const b1 = document.getElementById("botao1");
    const b2 = document.getElementById("botao2");
    const b3 = document.getElementById("botao3");
    const b4 = document.getElementById("botao4");
    const b5 = document.getElementById("botao5");


    btnP.addEventListener('click', function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
        
        if(definir != 0){
            console.log(nome.value.toUpperCase());
            updateChart(nome.value.toUpperCase());
            

        }
        else{
            window.alert('Essa Empresa não existe!!');
        }
        
    })

    b1.addEventListener('click', function(e){
    e.stopImmediatePropagation();
   
        console.log(s[0]);
        updateChart(s[0]);

    
        
    });
    b2.addEventListener('click', function(e){
        e.stopImmediatePropagation();
       
            console.log(s[1]);
            updateChart(s[1]);

        
        
    })
    
    b3.addEventListener('click', function(e){
        e.stopImmediatePropagation();
       

            console.log(s[2]);
            updateChart(s[2]);
            
        
        
    })
    b4.addEventListener('click', function(e){
        e.stopImmediatePropagation();
        
            console.log(s[3]);
            updateChart(s[3]);
            
        
        
    })
    b5.addEventListener('click', function(e){
        e.stopImmediatePropagation();

        
        
            console.log(s[4]);
            updateChart(s[4]);
        
        
        
    })



});



//     let sortDirection = false;
let personD = [ 
    {
    "symbol": "-",
    "name": "-",
    "exchange": "-",
    "assetType": "-",
    "ipoDate": "-",
    "delistingDate": null,
    "status": "-"
    }];

    // window.onload = () => {
    //     loadTableData(personD);
    // }

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
        dataHtml += `<tr><td>${person.symbol}</td><td>${person.name}</td><td>${person.exchange}</td><td>${person.ipoDate}</td><td><img src=${status[0]}></td><td><button type="button" id="${cli[0]}" class="btn btn-outline-success mb-3" onmousedown="bleep.play()">Definir</button></td>`;
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
