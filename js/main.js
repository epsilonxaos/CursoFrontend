if(navigator.serviceWorker){
	navigator.serviceWorker.register("/sw.js")
}

;(function () {

	/*Sticky navigation para la funcion del scroll*/
	let sticky = false
	/*Posicion inicial para galeria de imagenes*/
	let currentPosition = 0
	/*Contador de imagenes totales el cual obtenemos de nuestro index*/
	const contadorImagenes = $("[data-name='image-counter']").attr("content")

	const email = "chuy_2808@hotmail.com"

	/*Agregar un escuchame o listened a un evento decimos que el
	primer elemento que queremos escuchar es el submit ya que es el 
	elemento que se esta disparando y 
	*/
	$("#contacto-form").on("submit",function(ev){
		/*Evitamos que se envie el formulario*/
		ev.preventDefault()
		/*Llamdo a nuestra funcion Sendforms y el objeto this hace referencia
		a lo que se haya disparado en el evento*/
		sendForm($(this))

		/*Evitamos que se envie el formulario*/
		return false

	})

	$("#sticky-navigation").removeClass("hidden")
	$("#sticky-navigation").slideUp(0)
	chechScroll()
	isOpen()

	//funcion para que al dar click al icono se active
	/*$("#menu-opener").on("click", function(){
		$("#responsive-nav ul").toggleClass("active")
		//Mostrar el cerrar responsive
		$(this).toggleClass("glyphicon-list")
	})*/

	$("#menu-opener").on("click", toggleNav)
	$(".menu-link").on("click", toggleNav)

	setInterval(()=>{
		
		/*Verificamos que sea menor a nuestras images y lo incrementamos en 1*/
		if(currentPosition < contadorImagenes){
			currentPosition++
		}else{/*Si no lo devolvemos a 0*/
			currentPosition = 0
		}
		/*Hacemos que los elemento de nuestro css coloquen un nuevo valor a nuestro left
		para que se muevan las imagene hacia la izquierda multiplicada en 100 por la posicion de cada imagen*/
		$("#gallery .inner").css({
			left:"-"+currentPosition*100+"%"
		})
	},3000)

	$(window).scroll(chechScroll)

	function chechScroll(){
				const inBottom = isinBottom()

		if(inBottom && !sticky){
			//Mostrar la navegacion sticky
			sticky = true
			stickNavigation()
		}
		if(!inBottom && sticky){
			//Ocultar la navegacion sticky
			sticky = false
			unStickNavigation()
		}
	}

	function stickNavigation(){
		$("#description").addClass("fixed").removeClass("absolute")
		$("#navigation").slideUp("fast")
		$("#sticky-navigation").slideDown("fast")
	}

	function unStickNavigation(){
		$("#description").removeClass("fixed").addClass("absolute")
		$("#navigation").slideDown("fast")
		$("#sticky-navigation").slideUp("fast")
	}

	function isinBottom(){
		const $description = $("#description")
		const descriptionHeight = $description.height()

		return $(window).scrollTop() > $(window).height() - (descriptionHeight * 2)
	}

	function toggleNav(){
		$("#responsive-nav ul").toggleClass("active")
		$(".menu-opener").toggleClass("glyphicon-list")
	}

	function isOpen(){
		//Reloj 24 => 5pm -> 17hrs
		const date = new Date()
		const current_hour = date.getHours()

		if(current_hour < 12 || current_hour > 23){
			$("#is-open .text").html("Cerrado ahora <br> Abierto de 5:00pm a 11:00pm")
		}
	}

})()