;(function(){

	//$(".step:nth-child(1)").addClass("active")

	//Llamamos nuestro formulario
	const selector = "#contacto-form"


//Para entrar presionando enter
	$(".step textarea").on("keydown",(ev)=>{
		console.log("Entro")
		if(ev.keyCode == 13){
			console.log("entro al if")
			ev.preventDefault()
			$(ev.target).blur()
			console.log("entro al keydown")
			}
	})

	$(".path-step").on("click",(ev)=>{
		const $current_circle = $(ev.target)

		focus_circle($current_circle)

		const posicion = $current_circle.index(".path-step") + 1

		let $test = $(".step:nth-child("+posicion+")")//.active()

		siguiente($test)

		//console.log($current_circle.index(".path-step"))
	})

	/*decimos que nuestro formulario tome todos los valores 
	que sean de la clase input y despues con ON suscribimos 
	un listened*/
	$(selector).find(".input").on("change",(ev)=>{
		//console.log("cambie de valor")

		const $input = $(ev.target)
		const $next_step = $input.parent().next(".step")
		const is_form_valid = es_valido_formulario()

		if(!is_form_valid && $next_step.length >0){
			siguiente($next_step)
		}else{
			validar_formulario()
		}

		//console.log(es_valido_formulario())
		//console.log($el)
		//console.log("cambie de valor")
		
	})

	//Helpers
	function validar_formulario(){
		if(es_valido_formulario()){
			enviar_formulario()
		}else{
			let $fieldset_invalido = $(selector).find(".input:invalid").first().parent()
			siguiente($fieldset_invalido)
		}

	}

	function es_valido_formulario(){
		return document.querySelector(selector).checkValidity()
	}

	function siguiente($next_step){
		$(".step.active").removeClass("active")
		$next_step.addClass("active")
		$next_step.find(".input").focus()

		//Coordinar los circulos
		const posicion = ($next_step.index(".step")) + 1

		//console.log(posicion)
		//console.log($(".path-step:nth-child("+posicion+")"))
		const $circle = $(".path-step:nth-child("+posicion+")")

		focus_circle($circle)
		//$next_input.focus()

	}

	function focus_circle($circle){
		$(".path-step.active").removeClass("active")
		$circle.addClass("active")
	}

	function enviar_formulario(){
		const $form = $(selector)
		$.ajax({
			url: $form.attr("action"),
			method: "POST",
			data: $form.formObject(),
			dataType: "json",
			success: function(){
				$form.slideUp()
				$("#info").html("Enviamos tu mensaje")
			}
		})
	}

})()