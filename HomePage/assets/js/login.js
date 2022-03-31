//Mudar o estado de login para cadastro e vice-verso
        var btn_Entrar = document.querySelector("#Entrar")
        var btn_Cadastrar = document.querySelector("#Cadastrar")

        var body = document.querySelector("body")

        btn_Entrar.addEventListener("click", function(){ //Eventos
            body.className = "Entrar-js" //Body recebe uma classe com nome   
        })

        btn_Cadastrar.addEventListener("click", function(){ //Eventos
            body.className = "Cadastrar-js" //Body recebe uma classe com nome   
        })