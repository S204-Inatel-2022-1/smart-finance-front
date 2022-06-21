const list = document.querySelector('#list');
const search = document.querySelector('#pesquisa');
import {data} from "./rename.js";

// console.log(data);
let s = [];
let n = [];
let status = [];
let exchange = [];
let date = [];
let i = 0; 

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
    i = 0;

    console.log(filtered.length);

    filtered.forEach(item => {
       // list.insertAdjacentHTML('beforeend', `<li>${item.symbol}</li>`)
       //console.log(item);

       if(i<5){
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
        
       
    });
    if(filtered.length == 1){
        for(var u = 0; u < 4; u++){
            status.push("assets/images/icon/market-value/vazio.png");
        }
    }
    if(filtered.length == 2){
        for(var u = 0; u < 3; u++){
            status.push("assets/images/icon/market-value/vazio.png");
        }
    }
    if(filtered.length == 3){
        for(var u = 0; u < 2; u++){
            status.push("assets/images/icon/market-value/vazio.png");
        }
    }
    if(filtered.length == 4){
        for(var u = 0; u < 1; u++){
            status.push("assets/images/icon/market-value/vazio.png");
        }
    }
}

// render();

search.addEventListener("input", e => {
    // console.log(search.value);
    e.preventDefault()
    console.log(search.value);
    render(search.value);

    console.log(s);
    console.log(n);
    console.log(status);
    console.log(exchange);
    console.log(date);



    document.getElementById('nome1').textContent = s[0];
    document.getElementById('nome2').textContent = s[1];
    document.getElementById('nome3').textContent = s[2];
    document.getElementById('nome4').textContent = s[3];
    document.getElementById('nome5').textContent = s[4];
    //document.getElementById('nome6').textContent = s[5];

    // //document.getElementById('nome5').textContent = simbolo[4];

    document.getElementById('emp1').textContent = n[0];
    document.getElementById('emp2').textContent = n[1];
    document.getElementById('emp3').textContent = n[2];
    document.getElementById('emp4').textContent = n[3];
    document.getElementById('emp5').textContent = n[4];
    //document.getElementById('emp6').textContent = n[5];

    
    document.getElementById('low1').textContent = exchange[0];
    document.getElementById('low2').textContent = exchange[1];
    document.getElementById('low3').textContent = exchange[2];
    document.getElementById('low4').textContent = exchange[3];
    document.getElementById('low5').textContent = exchange[4];
    //document.getElementById('low6').textContent = exchange[5];

    // //document.getElementById('low5').textContent = baixa[4];
    
    document.getElementById('high1').textContent = date[0];
    document.getElementById('high2').textContent = date[1];
    document.getElementById('high3').textContent = date[2];
    document.getElementById('high4').textContent = date[3];
    document.getElementById('high5').textContent = date[4];
    //document.getElementById('high6').textContent = date[5];

    // //document.getElementById('high5').textContent = alta[4];

    // document.getElementById('arrow1').src= arrow[0];
    // document.getElementById('arrow2').src= arrow[1];
    // document.getElementById('arrow3').src= arrow[2];
    // document.getElementById('arrow4').src= arrow[3];

    // document.getElementById('l1').src= l[0];
    // document.getElementById('l2').src= l[1];
    // document.getElementById('l3').src= l[2];
    // document.getElementById('l4').src= l[3];

    document.getElementById('close1').src = status[0];
    document.getElementById('close2').src = status[1];
    document.getElementById('close3').src = status[2];
    document.getElementById('close4').src = status[3];
    document.getElementById('close5').src = status[4];
    //document.getElementById('close6').src = status[5];

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
        if(s[0] == undefined){
            console.log('Indefinido');
            window.alert('Essa Empresa não existe!!');
        }
        else{

            console.log(s[0]);
            updateChart(s[0]);

        }
        
    });
    b2.addEventListener('click', function(e){
        e.stopImmediatePropagation();
        if(s[1] == undefined){
            console.log('Indefinido');
            window.alert('Essa Empresa não existe!!');
        }
        else{

            console.log(s[1]);
            updateChart(s[1]);

        }
        
    })
    
    b3.addEventListener('click', function(e){
        e.stopImmediatePropagation();
        if(s[2] == undefined){
            console.log('Indefinido');
            window.alert('Essa Empresa não existe!!');
        }
        else{

            console.log(s[2]);
            updateChart(s[2]);
            
        }
        
    })
    b4.addEventListener('click', function(e){
        e.stopImmediatePropagation();
        if(s[3] == undefined){
            console.log('Indefinido');
            window.alert('Essa Empresa não existe!!');
        }
        else{
           
            console.log(s[3]);
            updateChart(s[3]);
            
        }
        
    })
    b5.addEventListener('click', function(e){
        e.stopImmediatePropagation();

        if(s[4] == undefined){
            console.log('Indefinido');
            window.alert('Essa Empresa não existe!!');
        }
        else{
           
            console.log(s[4]);
            updateChart(s[4]);
           
        }
        
    })

    // //document.getElementById('close5').textContent = fecha[4];
// }
});

