let label = 'AZUL4';

async function getData(label){

    const url = `http://localhost:8000/historico`;

    const options = {
        method: 'POST',
        json: true,
        headers: {
            'User-Agent': 'request'
        }
    }

    try{
        xhr.open("POST", url);
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(
            {
                name: label
            }
        ))

        xhr.onreadystatechange = function () {
            const data = JSON.parse(this.response)
            //let arr = Object.entries(data);
            console.log(data)
            return data;
        }

    }catch(e){
        console.log(e)
    }
}

async function updateChart(label){

    const empresa = await getData(label)
 
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

        for(var i = 0; i < a.length; i++){
            dataPoints1.push({x: new Date(a[i][0].slice(0,10)), y: [Number(a[i][1]["1. open"]), Number(a[i][1]["2. high"]), Number(a[i][1]["3. low"]), Number(a[i][1]["4. close"])], color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
            dataPoints2.push({x: new Date(a[i][0].slice(0,10)), y: Number(a[i][1]["4. close"]), color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
        }

        stockChart.render();  
    };

    //teste();
}
/*
window.onload = function () {

    function grafico(label){ 

        const empresa = async () => {

            const a = await getData(label);
            console.log(a)
        };

        empresa()

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

            for(var i = 0; i < a.length; i++){
                dataPoints1.push({x: new Date(a[i][0].slice(0,10)), y: [Number(a[i][1]["1. open"]), Number(a[i][1]["2. high"]), Number(a[i][1]["3. low"]), Number(a[i][1]["4. close"])], color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
                dataPoints2.push({x: new Date(a[i][0].slice(0,10)), y: Number(a[i][1]["4. close"]), color: a[i][1]["1. open"] < a[i][1]["4. close"] ? "green" : "red"});
            }

            stockChart.render();    
        };

//       teste();
    }

    grafico(label);
}
*/