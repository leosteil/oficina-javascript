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
			    		callback(request.status);
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
		btn_deleta : ".btn btn-danger btn-deleta",

		div_error_filmes : "div-error-filmes",
		div_error_series : "div-error-series",
		div_error_curtas : 'div-error-curtas',

		error_filmes : "error-filmes",
		error_series : "error-series",
		error_curtas : "error-curtas",

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
			console.log(tableRef);
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

				newBtn(trNova, "btn btn-primary btn-modal btn-info "  + tableRef, "Info", movies[i]._id);
				newBtn(trNova, "btn btn-danger btn-deleta", "Deletar", movies[i]._id);

				document.getElementById(tableRef).getElementsByTagName('tbody')[0].appendChild(trNova);
			}
		},

		preencheModalInfo: function(entry) {

			var p = document.getElementById('pAnoFim');

			document.getElementById('modalTituloPrimario').textContent = entry.tituloPrimario;

			document.getElementById('modalTituloOriginal').textContent = entry.tituloOriginal;

			document.getElementById('modalAnoInicio').textContent = entry.anoInicio;

			if(entry.anoFim != undefined) {
				if(p.hidden) p.hidden = false;
				document.getElementById('modalAnoFim').textContent = entry.anoFim;
			} else {
				if(!p.hidden) p.hidden = true;
			}

			document.getElementById('modalDuracaoMinutos').textContent = entry.duracaoMinutos;

			var ulGeneros = document.getElementById('modalGeneros');
			while(ulGeneros.firstChild) {
				ulGeneros.removeChild(ulGeneros.firstChild);
			}
			entry.generos.forEach(function(genero){
				var li = document.createElement('li');
				li.textContent = genero;
				ulGeneros.appendChild(li);
			});
		},

		errorMessage: function(erro, tabela_erro){
			var div = document.getElementById(tabela_erro);
			var alert = urlPart = tabela_erro.replace('div-', '');
			alert = document.getElementById(alert);

			div.style.display = ""; 
			alert.textContent = alert.textContent + " ERRO: " + 404;
		}

	};

})();


var controller = (function (dataCtrl, UICtrl) {
	var DOMtables = UICtrl.getTablesREF();
	var DOMstrings = UICtrl.getDOMstrings();

	var preencheTabelas = function(){
		var obj;		

		/*obj = dataCtrl.getData(function(obj){
			obj ? UICtrl.preencheTabela(obj, DOMtables.tabela_filmes) : alert("ERRO");
		}, "http://localhost:8080/api/filmes/pagina/1");		
	
		obj = dataCtrl.getData(function(obj){	
			obj ? UICtrl.preencheTabela(obj, DOMtables.tabela_series) : alert("ERRO");
		}, "http://localhost:8080/api/series/pagina/1");*/

		obj = dataCtrl.getData(function(obj){
			if(typeof obj == "object"){
				UICtrl.preencheTabela(obj, DOMtables.tabela_curtas);
				//criaEventListeners();
			}else UICtrl.errorMessage(obj, DOMstrings.div_error_curtas);
		}, "http://localhost:8080/api/curtas/pagina/1");
		
		criaEventListeners();

	}

	var	criaEventListeners = function() {
		document.getElementById(DOMstrings.btn_cadastro).addEventListener('click', ctrlAddItem);

		var btnCollDelete = document.getElementsByClassName("btn-deleta");
		for (var i = 0; i < btnCollDelete.length; i++) {
		    btnCollDelete[i].addEventListener('click', crtlDeleteItem);
		}
		
		var btnCollInfo = document.getElementsByClassName('btn-info');
		for(i = 0; i < btnCollInfo.length; i++) {
			console.log("aqui");
			btnCollInfo[i].addEventListener('click', ctrlInfoItem);
		}
		
	}

	var ctrlAddItem = function() {
		console.log("11111");
	}

	var crtlDeleteItem = function(e){
		//1. remover elemento do banco via datactrl
		//2. remover elemento da tabela via uictrl

		console.log(e.path[0].getAttribute("elem-id"));
	}

	var ctrlInfoItem = function(e) {

		var urlPart = document.getElementsByClassName('nav-link active')[0].getAttribute('href');
		urlPart = urlPart.replace('#', '');

		dataCtrl.getData(function(entry) {
			UICtrl.preencheModalInfo(entry);
		}, 'http://localhost:8080/api/' + urlPart + '/' + e.path[0].getAttribute('elem-id'));

	}

	return {
		init: function(){
			console.log("APP START");
			
			preencheTabelas();
		}
	};

})(dataController, UIController);


controller.init();