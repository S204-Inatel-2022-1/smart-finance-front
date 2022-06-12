const label = 'EXI';

async function getData(label){
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${label}&apikey=0ZWXW9IYMFL3DR7W`;

    const options = {
        method: 'GET',
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }

    try{
        const fetch_response = await fetch(url, options);
        const dat = await fetch_response.json();

        console.log(dat["Meta Data"]["2. Symbol"]);
        console.log(dat["Time Series (Daily)"]);

        let arr = Object.entries(dat["Time Series (Daily)"]);
        console.log(arr[0][0]);
        console.log(arr[0][1]["1. open"]);
        return arr;
    }catch(e){
        pegouErro()
    }
    function pegouErro(){
        const qs = document.querySelector('#card-body')
        qs.innerHTML = `<h3 style="text-align: center;">Aguarde 1 minuto para fazer outra requisição.</h3>`

        setTimeout(() => {
            document.location.reload(true)
        }, 60000)
    }
}


window.onload = function () {

    function grafico(label){ 

        var dataPoints1 = [], dataPoints2 = [];
        var stockChart = new CanvasJS.StockChart("chartContainer",{
        exportEnabled: true,
        theme: "light1",
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
            prefix: "$"
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "left"
        },
        data: [{
            name: "Preço (em Dolar)",
            yValueFormatString: "$#,###.##",
            axisYType: "secondary",
            type: "candlestick",
            risingColor: "green",
            fallingColor: "red",
            dataPoints : dataPoints1
        }]
        }],
        rangeSelector: {
            selectedRangeButtonIndex:0,
            buttons: [{
                range: 4, 
                rangeType: "month",
                label: "Trimestral"
              },{            
                rangeType: "all",
                label: "Mostrar Tudo" //Change it to "All"
              }]
        },
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


        const teste = async () => {
            const a = await getData(label);
            console.log(a);

            //console.log(a[1][0].slice(0,10));
            // console.log(arr[i][1]["1. open"]);

        for(var i = 0; i < a.length; i++){
            dataPoints1.push({x: new Date(a[i][0].slice(0,10)), y: [Number(a[i][1]["1. open"]), Number(a[i][1]["2. high"]), Number(a[i][1]["3. low"]), Number(a[i][1]["4. close"])], color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
            dataPoints2.push({x: new Date(a[i][0].slice(0,10)), y: Number(a[i][1]["4. close"]), color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
        }
        stockChart.render();

        document.getElementById("moveNavigatorToTop").addEventListener("click", function(){
            stockChart.navigator.set("verticalAlign", "top");
        });
        
        };

        teste();
    }

    grafico(label);
}

function updateChart(label){

    var dataPoints1 = [], dataPoints2 = [];
    var stockChart = new CanvasJS.StockChart("chartContainer",{
    exportEnabled: true,
    theme: "light1",
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
        prefix: "$"
    },
    legend: {
        verticalAlign: "top",
        horizontalAlign: "left"
    },
    data: [{
        name: "Preço (em Dolar)",
        yValueFormatString: "$#,###.##",
        axisYType: "secondary",
        type: "candlestick",
        risingColor: "green",
        fallingColor: "red",
        dataPoints : dataPoints1
    }]
    }],
    rangeSelector: {
        selectedRangeButtonIndex:0,
        buttons: [{
            range: 4, 
            rangeType: "month",
            label: "Trimestral"
          },{            
            rangeType: "all",
            label: "Mostrar Tudo" //Change it to "All"
          }]
    },
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


    const teste = async () => {
        const a = await getData(label);
        console.log(a);

        //console.log(a[1][0].slice(0,10));
        // console.log(arr[i][1]["1. open"]);

    for(var i = 0; i < a.length; i++){
        dataPoints1.push({x: new Date(a[i][0].slice(0,10)), y: [Number(a[i][1]["1. open"]), Number(a[i][1]["2. high"]), Number(a[i][1]["3. low"]), Number(a[i][1]["4. close"])], color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
        dataPoints2.push({x: new Date(a[i][0].slice(0,10)), y: Number(a[i][1]["4. close"]), color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
    }
    stockChart.render();

    document.getElementById("moveNavigatorToTop").addEventListener("click", function(){
        stockChart.navigator.set("verticalAlign", "top");
    });
    
    };

    teste();
}