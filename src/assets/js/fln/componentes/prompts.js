function preguntar(callback,pregunta,descripcion,placeholder,value,alternativas){
	/*
	Para cualquier página
	Permite abrir una ventana para preguntar algo
	Se deben enviar las 5 variables solicitadas, pero se puede enviar cualquier otro parámetro adicional que será devuelto a la función callback junto con la respuesta (la respuesta irá como último parámetro)
	*/

	if(typeof(callback)!="function"){ alert("El primer parámetro debe ser una función"); return; }
	if(typeof(callback)!="function"){ alert("Se debe especificar una pregunta"); return; }
	if(typeof(descripcion)!="string"){ descripcion=""; }
	if(typeof(placeholder)!="string"){ placeholder=""; }
	if(typeof(alternativas)!="object"){ alternativas={}; }
	if(alternativas==null){ alternativas={}; }
	if(typeof(value)!="string"){ value=""; }

	var args={
		callback:'',
		variables:[]
	};
	Object.each(arguments,function(el,i){
		if(i==0){
			args.callback=el;
		}
		if(i>5){ //saltarse los argumentos 1 al 5 (pregunta,descripcion,placeholder,value,alternativas)
			args.variables.push(el);
		}
	});

	if(!$('pregunta')){
		var html='<div class="contenido">';
			html+='<h4>'+pregunta+'</h4>';
			html+='<p>'+descripcion+'</p>';

			var accion="";
			if(Object.getLength(alternativas)){
				html+='<select id="pregunta_text" onchange="validarRespuesta(this.value);">';
				html+='<option value="">Seleccionar</option>';
				Object.each(alternativas,function(texto,value){
					html+='<option value="'+value+'">'+texto+'</option>';
				});
				html+='</select>';
				accion="selecciona";
			}
			else{
				html+='<input id="pregunta_text" type="text" class="text" placeholder="'+placeholder+'" value="'+value+'" onkeyup="validarRespuesta(this.value);">';
				accion="ingresa";
			}
			html+='<div class="error slide" style="display:none;">Por favor, '+accion+' una respuesta</div>';
			html+='<div class="botonera">';
			html+='<a href="#" class="boton gris" onclick="responder(null); return false;">Cancelar</a>';
			html+='<a href="#" class="boton" onclick="responder(pregunta); return false;">Aceptar</a>';
			html+='<div>';
			html+='</div>';

		var pregunta=new Element("div#pregunta");
		pregunta.args=args;
		pregunta.set('html',html);
		pregunta.fade('hide');

		$('contenido').adopt(pregunta);
		escanear();
	}
	$('pregunta').fade('in');
}

function validarRespuesta(valor){
	if(valor){
		pregunta.getElement('.error').slide('out');
	}
}

function responder(pregunta){
	if(pregunta){
		var respuesta=$('pregunta_text').value;
		if(!respuesta){ $('pregunta').getElement('.error').slide('in'); return; }
		pregunta.args.variables.push(respuesta);

		if(respuesta!=null){
			var evaluar='pregunta.args.callback(';
			pregunta.args.variables.each(function(el,i){
				evaluar+='"'+el+'"';
				if(i<pregunta.args.variables.length-1){ evaluar+=','; }
			});
			evaluar+=')';
			eval(evaluar);
		}
	}

	$('pregunta').fade('out').get('tween').chain(function(){
		$('pregunta').dispose();
	});