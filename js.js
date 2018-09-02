document.body.onload = function(event) {
	var request = new XMLHttpRequest();
	var tableRef = document.getElementById('tabela-filmes').getElementsByTagName('tbody')[0];

	request.onreadystatechange = function() {
	 	if(request.readyState === 4) {
	    	if(request.status === 200) {
	    		var obj = JSON.parse(request.responseText); 
	    		preencheTabela(obj, tableRef);
	    	} else {
	      		console.log('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
	    	} 
	  	}
	}

	request.open('Get', 'http://localhost:8080/api/filmes/pagina/1');
	request.send();

	loadSeries();
}

function loadSeries(){
	var request = new XMLHttpRequest();
	var tableRef = document.getElementById('tabela-series').getElementsByTagName('tbody')[0];

	request.onreadystatechange = function() {
	 	if(request.readyState === 4) {
	    	console.log("AQUIdsfds")
	    	if(request.status === 200) {
	    		var obj = JSON.parse(request.responseText); 
	    		preencheTabela(obj, tableRef);
	    	} else {
	      		console.log('An error occurred during your request: ' +  request.status + ' ' + request.statusText);
	    	} 
	  	}
	}

	request.open('Get', 'http://localhost:8080/api/series/pagina/1');
	request.send();
}

function newTD(trNova, txtValue){
	var td, txt, btn;
	
	td = document.createElement("td");
	txt = document.createTextNode(txtValue);
	td.appendChild(txt);
	trNova.appendChild(td);
}

function newBtn(trNova, btnClass, btnText, btnElemId){
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
}

function preencheTabela(movies, tableRef){

	for(i = 0; i < movies.length; i++){
		var trNova = document.createElement("tr");


		Object.keys(movies[i]).forEach(function(key) {
    		if(key == 'primaryTitle'){
				newTD(trNova, movies[i][key]);		
    		}
    		
    		if(key == 'originalTitle'){
    			newTD(trNova, movies[i][key]);
    		}

		});

		newBtn(trNova, "btn btn-primary btn-modal", "Info", movies[i]._id);
		newBtn(trNova, "btn btn-danger", "Deletar");

		tableRef.appendChild(trNova);

	}

};

var btn_modal = document.getElementsByClassName("btn btn-primary btn-modal");

var myFunction = function () {
	console.log(this);
	console.log("ID do BOTÃO (data-movie) -> ", this.dataset.movie)
}

for (var i = 0; i < btn_modal.length; i++) {
    btn_modal[i].addEventListener('click', myFunction, false);
}