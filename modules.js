var dataController = (function () {

	var Item = function(tipoTitulo, tituloPrimario, tituloOriginal, anoInicio, anoFim, duracaoMinutos, generos){
		this.tipoTitulo = tipoTitulo;
		this.tituloPrimario = tituloPrimario;
		this.tituloOriginal = tituloOriginal;
		this.anoInicio = anoInicio;
		this.anoFim = anoFim;
		this.duracaoMinutos = duracaoMinutos;
		this.generos = generos;
	}

	return {
		getData: function(callback, url){
			var request = new XMLHttpRequest();
			
			request.onreadystatechange = function() {
			 	if(request.readyState === 4) {
			    	if(request.status === 200) {
			    		var obj = JSON.parse(request.responseText);
			    		callback(obj);
			    	} else {
			    		callback(false);
			    	} 
			  	}
			}

			request.open('Get', url);
			request.send();
		}
	};

})();

var UIController = (function () {
	
	var tablesREF = {
		tabela_filmes : "tabela-filmes",
		tabela_series : "tabela-series",
		tabela_curtas : "tabela-curtas"
	};

	var DOMstrings = {
		tipo_titulo : "tipoTitulo",
		titulo_original : "tituloOriginal",
		titulo_primario : "tituloPrimario",
		duracao : "duracao",
		ano_inicio : "anoInicio",
		ano_fim : "anoFim",
		generos: "generos",

		btn_cadastro : "btn-cadastra",
		btn_deleta : ".btn btn-danger btn-deleta"
	}

	var newBtn = function (trNova, btnClass, btnText, btnElemId){
		var td, txt, btn;

		td = document.createElement("td");
		btn = document.createElement("button");
		
		btn.type = "button";
		

		if(btnText != "Deletar"){
			btn.setAttribute("data-toggle", "modal");
			btn.setAttribute("data-target", "#exampleModal");
		}
		btn.setAttribute("elem-id", btnElemId);

		txt = document.createTextNode(btnText);
		btn.appendChild(txt);

		btn.className += btnClass;
		td.appendChild(btn);
		trNova.appendChild(td);
	};

	var newTD = function (trNova, txtValue, classe){
		var td, txt, btn;
		
		td = document.createElement("td");
		txt = document.createTextNode(txtValue);
		td.appendChild(txt);

		trNova.appendChild(td);
	}

	return {

		getTablesREF: function() {
			return tablesREF;
		},

		getDOMstrings: function() {
			return DOMstrings;
		},

		preencheTabela: function(movies, tableRef){
			for(i = 0; i < movies.length; i++){
				var trNova = document.createElement("tr");

				Object.keys(movies[i]).forEach(function(key) {
		    		if(key == 'tituloPrimario'){
						newTD(trNova, movies[i][key]);		
		    		}
		    		
		    		if(key == 'tituloOriginal'){
		    			newTD(trNova, movies[i][key]);
		    		}

				});

				newBtn(trNova, "btn btn-primary btn-modal", "Info", movies[i]._id);
				newBtn(trNova, "btn btn-danger btn-deleta", "Deletar", movies[i]._id);

				document.getElementById(tableRef).getElementsByTagName('tbody')[0].appendChild(trNova);
			}
		}

	};

})();


var controller = (function (dataCtrl, UICtrl) {
	var DOMtables = UICtrl.getTablesREF();
	var DOMstrings = UICtrl.getDOMstrings();

	var preencheTabelas = function(){
		var obj;

		obj = dataCtrl.getData(function(obj){
			obj ? UICtrl.preencheTabela(obj, DOMtables.tabela_filmes) : alert("ERRO");
		}, "http://localhost:8080/api/filmes/pagina/1");		
	
		obj = dataCtrl.getData(function(obj){			
			obj ? UICtrl.preencheTabela(obj, DOMtables.tabela_series) : alert("ERRO");
		}, "http://localhost:8080/api/series/pagina/1");

		obj = dataCtrl.getData(function(obj){			
			if(obj){
				UICtrl.preencheTabela(obj, DOMtables.tabela_curtas);
				criaEventListeners();
			}else alert("ERRO");
		}, "http://localhost:8080/api/curtas/pagina/1");
		
	}

	var	criaEventListeners = function() {
		document.getElementById(DOMstrings.btn_cadastro).addEventListener('click', ctrlAddItem);
		console.log(document.getElementById(DOMstrings.btn_cadastro));


		var btn_collection = document.getElementsByClassName("btn-deleta");

		for (var i = 0; i < btn_collection.length; i++) {
		    btn_collection[i].addEventListener('click', function(){
		    }, false);
		}
	}

	var ctrlAddItem = function() {
		console.log("teste")
	}

	var crtlDeleteItem = function(){
		//1. remover elemento do banco via datactrl

		//2. remover elemento da tabela via uictrl


		console.log("Leonardo");
	}


	return {
		init: function(){
			console.log("APP START");
		
			preencheTabelas();
		}
	};

})(dataController, UIController);


controller.init();