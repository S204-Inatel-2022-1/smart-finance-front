let label = 'AZUL4';

window.onload = getData(label)

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