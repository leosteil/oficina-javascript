var dataController = (function () {

	var erroDefault = { 
		mensagem: {
			errors: {
				default: { message: 'Erro 404 na requisição!' }
			}
		}
	};

	return {
		getData: function(callback, url){
			var request = new XMLHttpRequest();
			
			request.onreadystatechange = function() {
			 	if(request.readyState === 4) {
			    	if(request.status === 200) {
			    		var obj = JSON.parse(request.responseText);
			    		callback(obj);
			    	} else if(request.status === 500){
			    		var obj = JSON.parse(request.responseText);
			    		callback(obj);
			    	} else {
						callback(erroDefault);
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
			    	} else if(request.status === 500){
			    		var obj = JSON.parse(request.responseText);
			    		callback(obj);
			    	} else {
						callback(erroDefault);
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
			    	} else if(request.status === 500){
			    		var obj = JSON.parse(request.responseText);
			    		callback(obj);
			    	} else {
						callback(erroDefault);
					}
			  	}
			}

			request.open('DELETE', url);
			request.send();
		} 
	};

})();

var UIController = (function () {
	
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
				newBtn(trNova, "btn btn-primary btn-modal btn-editar "  + tableRef, "Editar", movies[i]._id);
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

		limpaForm: function() {

			document.getElementById('formTituloPrimario').value = '';
			document.getElementById('formTituloOriginal').value = '';
			document.getElementById('formAnoInicio').value = '';
			document.getElementById('formAnoFim').value = '';
			document.getElementById('formDuracao').value = '';
			document.getElementById('formGeneros').value = '';
			document.getElementById('formTipoTitulo').value = '';
			
		},

		mensagemErro: function(erros){
			var ulErros = document.getElementById('ul-erros');
			var erros = erros.mensagem.errors;

			erros = Object.keys(erros).map(function(key) {
				return Number(key), erros[key].message;
			});

			while(ulErros.firstChild) {
				ulErros.removeChild(ulErros.firstChild);
			}

			erros.forEach(function(erro) {
				var li = document.createElement('li');
				li.textContent = erro;
				ulErros.appendChild(li);
			});


			var divErros = document.getElementById('div-erros');
			if(!divErros.classList.contains('show')) divErros.classList.add('show');
		},

		removeTR: function(table, tr){
			document.getElementById(table).getElementsByTagName('tbody')[0].removeChild(tr);
		}

	};

})();


var controller = (function (dataCtrl, UICtrl) {

	var preencheTabelas = function(){		

		dataCtrl.getData(function(obj){
			if(obj.mensagem){
				UICtrl.mensagemErro(obj);
			} else {
				UICtrl.preencheTabela(obj, 'tabela-filmes');
			}
		}, "http://localhost:8080/api/filmes/pagina/1");		
	
		dataCtrl.getData(function(obj){	
			if(obj.mensagem){
				UICtrl.mensagemErro(obj);
			} else {
				UICtrl.preencheTabela(obj, 'tabela-series');
			}
		}, "http://localhost:8080/api/series/pagina/1");

		dataCtrl.getData(function(obj){
			if(obj.mensagem){
				UICtrl.mensagemErro(obj);
			} else {
				UICtrl.preencheTabela(obj, 'tabela-curtas');
			}
			criaEventListeners();
		}, "http://localhost:8080/api/curtas/pagina/1");
		
	}

	var	criaEventListeners = function() {
		document.getElementById('btn-cadastra').addEventListener('click', ctrlAddItem);

		var btnCollDelete = document.getElementsByClassName("btn-deleta");
		for (var i = 0; i < btnCollDelete.length; i++) {
		    btnCollDelete[i].addEventListener('click', crtlDeleteItem);
		}
		
		var btnCollInfo = document.getElementsByClassName('btn-info');
		for(i = 0; i < btnCollInfo.length; i++) {
			btnCollInfo[i].addEventListener('click', ctrlInfoItem);
		}
		
	}

	var ctrlAddItem = function() {

		var varAnoFim = document.getElementById('formAnoFim').valueAsNumber;

		var item = {
			tituloPrimario: document.getElementById('formTituloPrimario').value,
			tituloOriginal: document.getElementById('formTituloOriginal').value,
			anoInicio: document.getElementById('formAnoInicio').valueAsNumber,
			anoFim: (!Number.isNaN(varAnoFim)) ? varAnoFim : undefined,
			duracaoMinutos: document.getElementById('formDuracao').valueAsNumber,
			generos: document.getElementById('formGeneros').value,
		}
		var urlPart = document.getElementById('formTipoTitulo').value;

		dataCtrl.postData(function(post) {
			if(post.mensagem){
				UICtrl.mensagemErro(post);
			} //else {
				//UICtrl.insereTabela(item);
			// }
			UICtrl.limpaForm();
		}, JSON.stringify(item), 'http://localhost:8080/api/' + urlPart);

	}

	var crtlDeleteItem = function(e){

		var urlPart = document.getElementsByClassName('nav-link active')[0].getAttribute('href');
		var tabela = document.getElementsByClassName('nav-link active')[0].getAttribute('id');
		var path = e.path || (e.composedPath && e.composedPath());

		urlPart = urlPart.replace('#', '');
		tabela = "tabela-" + tabela.replace('-tab', '') + "";

		if(window.confirm('Você tem certeza que deseja excluir este item?')) {
			
			dataCtrl.removeData(function(res) {
				if(typeof res != "number"){
					UICtrl.removeTR(tabela, path[2]);
				}
			}, 'http://localhost:8080/api/' + urlPart + '/' + path[0].getAttribute('elem-id'));

		}

	}

	var ctrlInfoItem = function(e) {

		var urlPart = document.getElementsByClassName('nav-link active')[0].getAttribute('href');
		urlPart = urlPart.replace('#', '');
		var path = e.path || (e.composedPath && e.composedPath());

		dataCtrl.getData(function(entry) {
			UICtrl.preencheModalInfo(entry);
		}, 'http://localhost:8080/api/' + urlPart + '/' + path[0].getAttribute('elem-id'));

	}

	return {
		init: function(){
			console.log("APP START");
			
			preencheTabelas();
		}
	};

})(dataController, UIController);


controller.init();