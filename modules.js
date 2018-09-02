var dataController = (function () {

	var getData = function (callback, url) {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
		 	if(request.readyState === 4) {
		    	if(request.status === 200) {
		    		var obj = JSON.parse(request.responseText);
		    		callback(obj);
		    	} else {
		      		console.log('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
		    	} 
		  	}
		}

		request.open('Get', url);
		request.send();
	}

	return {
		filmes: function (callback){
			return getData(callback, 'http://localhost:8080/api/filmes/pagina/1');
		},

		series: function(callback){
			return getData(callback, 'http://localhost:8080/api/series/pagina/1');
		},

		curtas: function(callback){
			return getData(callback, 'http://localhost:8080/api/curtas/pagina/1');
		}
	};

})();

var UIController = (function () {
	var tablesREF = {
		tabela_filmes : "tabela-filmes",
		tabela_series : "tabela-series",
		tabela_curtas : "tabela-curtas"
	};


	var newBtn = function (trNova, btnClass, btnText, btnElemId){
		var td, txt, btn;

		td = document.createElement("td");
		
		btn = document.createElement("button");
		btn.type = "button";
		
		btn.setAttribute("data-toggle", "modal");
		btn.setAttribute("data-target", "#exampleModal");
		btn.setAttribute("elem-id", "btnElemId");

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


	var preencheTabela = function(movies, tableRef){

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
			newBtn(trNova, "btn btn-danger", "Deletar");

			document.getElementById(tableRef).getElementsByTagName('tbody')[0].appendChild(trNova);
		}
	}

	return {

		getTablesREF: function() {
			return tablesREF;
		},

		preencheTabela: function(movies, tableRef){
			preencheTabela(movies, tableRef);
		}

	};

})();


var controller = (function (dataCtrl, UICtrl) {
	var DOM = UICtrl.getTablesREF();

	var preencheFilmes = function(){
		var obj = dataCtrl.filmes(function(obj){
			UICtrl.preencheTabela(obj, DOM.tabela_filmes);
		});
	}

	var preencheSeries = function(){
		var obj = dataCtrl.series(function(obj){
			UICtrl.preencheTabela(obj, DOM.tabela_series);
		});
	}

	var preencheCurtas = function(){
		var obj = dataCtrl.curtas(function(obj){
			UICtrl.preencheTabela(obj, DOM.tabela_curtas);
		});
	}



	return {
		init: function(){
			console.log("APP START");
			preencheFilmes();
			preencheSeries();
			preencheCurtas();
		}
	};

})(dataController, UIController);


controller.init();