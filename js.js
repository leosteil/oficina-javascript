var movie = function(titPrimario, titSecundario, duracao){
	this.titPrimario = titPrimario;
	this.titSecundario = titSecundario;
	this.duracao = duracao;
}

var movie1 = new movie("Tropa de Elite 1", "Truepa de Elite 1", "190");
var movie2 = new movie("Tropa de Elite 2", "Truepa de Elite 2", "120");
var movie3 = new movie("Tropa de Elite 3", "Truepa de Elite 3", "120");

var movies = [movie1, movie2, movie3];

function newTD(trNova, txtValue){
	var td, txt, btn;
	
	td = document.createElement("td");
	txt = document.createTextNode(txtValue);
	td.appendChild(txt);
	trNova.appendChild(td);
}

function newBtn(trNova, btnClass, btnText){
	var td, txt, btn;

	td = document.createElement("td");
	
	btn = document.createElement("button");
	btn.type = "button";
	
	btn.setAttribute("data-toggle", "modal");
	btn.setAttribute("data-target", "#exampleModal");

	txt = document.createTextNode(btnText);
	btn.appendChild(txt);

	btn.className += btnClass;
	td.appendChild(btn);
	trNova.appendChild(td);
}


document.body.onload = function(event) {

	var tableRef = document.getElementById('tabela_principal').getElementsByTagName('tbody')[0];

	for(i = 0; i < movies.length; i++){
		var trNova = document.createElement("tr");


		Object.keys(movies[i]).forEach(function(key) {
    		if(key == 'titPrimario'){
				newTD(trNova, movies[i][key]);		
    		}
    		
    		if(key == 'titSecundario'){
    			newTD(trNova, movies[i][key]);
    		}

		});

		newBtn(trNova, "btn btn-primary btn-modal", "Info");
		newBtn(trNova, "btn btn-danger", "Deletar");

		tableRef.appendChild(trNova);

	}

};

var btn_modal = document.getElementsByClassName("btn btn-primary btn-modal");

var myFunction = function () {
	console.log(this);
	console.log("ID do BOTÃO (data-movie) -> ", this.dataset.movie)
}

//for (var i = 0; i < btn_modal.length; i++) {
    //btn_modal[i].addEventListener('click', myFunction, false);
//}
//
//console.log(btn_modal);

btn_modal[0].addEventListener('click', myFunction, false);



