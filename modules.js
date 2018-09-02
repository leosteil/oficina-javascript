var dataController = (function () {
	var request = new XMLHttpRequest();

	var getFilmes = function (callback) {
		request.onreadystatechange = function() {
		 	if(request.readyState === 4) {
		    	if(request.status === 200) {
		    		var obj = JSON.parse(request.responseText);
		    		return obj;
		    	} else {
		      		console.log('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
		    	} 
		  	}
		}

		request.open('Get', 'http://localhost:8080/api/filmes/5b8947446f506266bc522f38');
		request.send();
	}

	return {
		filmes: function (){
			getFilmes();
		}
	};

})();

var UIController = (function () {
	var tablesREF = {
		tabela_filmes : "tabelas-filmes",
		tabela_series : "tabela-series"
	};


	return {

		getTablesREF: function() {
			return tablesREF;
		}

	};

})();


var controller = (function (dataCtrl, UICtrl) {
	var DOM = UICtrl.getTablesREF();

	var preencheFilmes = function(){
		var obj = dataCtrl.filmes();
		
		setTimeout(function(){
			console.log(obj);

		}, 5000);
	}

	return {
		init: function(){
			console.log("APP START");
			preencheFilmes();
		}
	};

})(dataController, UIController);


controller.init();