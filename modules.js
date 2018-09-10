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

			request.open('GET', url);
			request.send();
		},

		postData: function(callback, data, url) {
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
			
			request.open('POST', url);
			request.setRequestHeader("Content-Type", "application/json");
			request.send(data);
		},

		removeData: function(callback, url, data){
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

			request.open('DELETE', url);
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

		btn_cadastra : "btn-cadastra",
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
		},

		removeTR: function(table, tr){
			document.getElementById(table).getElementsByTagName('tbody')[0].removeChild(tr);
		}

	};

})();


var controller = (function (dataCtrl, UICtrl) {
	var DOMtables = UICtrl.getTablesREF();
	var DOMstrings = UICtrl.getDOMstrings();

	var preencheTabelas = function(){		

		dataCtrl.getData(function(obj){
			if(typeof obj == "object"){
				UICtrl.preencheTabela(obj.docs, DOMtables.tabela_filmes);
				//criaEventListeners();
			}else UICtrl.errorMessage(obj.docs, DOMstrings.div_error_filmes);
		}, "http://localhost:8080/api/filmes/pagina/1");		
	
		dataCtrl.getData(function(obj){	
			if(typeof obj == "object"){
				UICtrl.preencheTabela(obj.docs, DOMtables.tabela_series);
				//criaEventListeners();
			}else UICtrl.errorMessage(obj.docs, DOMstrings.div_error_series);
		}, "http://localhost:8080/api/series/pagina/1");

		dataCtrl.getData(function(obj){
			console.log(obj);
			if(typeof obj == "object"){
				UICtrl.preencheTabela(obj.docs, DOMtables.tabela_curtas);
				criaEventListeners();
			}else UICtrl.errorMessage(obj.docs, DOMstrings.div_error_curtas);
		}, "http://localhost:8080/api/curtas/pagina/1");
		
	}

	var	criaEventListeners = function() {
		document.getElementById(DOMstrings.btn_cadastra).addEventListener('click', ctrlAddItem);

		var btnCollDelete = document.getElementsByClassName("btn-deleta");
		for (var i = 0; i < btnCollDelete.length; i++) {
		    btnCollDelete[i].addEventListener('click', crtlDeleteItem);
		}
		
		var btnCollInfo = document.getElementsByClassName('btn-info');
		for(i = 0; i < btnCollInfo.length; i++) {
			btnCollInfo[i].addEventListener('click', ctrlInfoItem);
		}
		
	}

	var ctrlAddItem = function(e) {

		var item = {
			tituloPrimario: document.getElementById('formTituloPrimario').value,
			tituloOriginal: document.getElementById('formTituloOriginal').value,
			anoInicio: document.getElementById('formAnoInicio').valueAsNumber,
			anoFim: document.getElementById('formAnoFim').valueAsNumber,
			duracaoMinutos: document.getElementById('formDuracao').valueAsNumber,
			generos: document.getElementById('formGeneros').value,
		}
		var urlPart = document.getElementById('formTipoTitulo').value;

		console.log(item);
		console.log(urlPart);

		dataCtrl.postData(function(e) {
			console.log(e);
		}, JSON.stringify(item), 'http://localhost:8080/api/' + urlPart);

		// 1. Get the field input data
		// 2. Add the item to the budget controller
		// 3. Add the item to the UI
		// 4. Clear the fields
	}

	var crtlDeleteItem = function(e){

		var urlPart = document.getElementsByClassName('nav-link active')[0].getAttribute('href');
		var tabela = document.getElementsByClassName('nav-link active')[0].getAttribute('id');

		urlPart = urlPart.replace('#', '');
		tabela = "tabela-" + tabela.replace('-tab', '') + "";

		if(window.confirm('Você tem certeza que deseja excluir este item?')) {
			
			dataCtrl.removeData(function(res) {
				if(typeof res != "number"){
					UICtrl.removeTR(tabela, e.path[2]);
				}
			}, 'http://localhost:8080/api/' + urlPart + '/' + e.path[0].getAttribute('elem-id'));

		}

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