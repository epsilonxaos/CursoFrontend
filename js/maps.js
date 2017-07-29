;(function(){

	//Para obtener la localizacion del usuario
	class UserLocation{
		static get(callback){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition((location)=>{
					callback({
						lat: location.coords.latitude,
						lng: location.coords.longitude
					})
				})
			}else{
				alert("Tu navegador no soporta Geolocalización")
			}
		}
	}

	const my_place = {
		lat: 19.4248097,
		lng: -99.1949255999998
	}

	//funcion de nuestro mapa en index
	google.maps.event.addDomListener(window,"load",()=>{
		const map = new google.maps.Map(
			document.getElementById('map'),
			{
				//Atributos de nuestro mapa en conde colocamos
				//el lugar donde se encuetra el establecimiento.
				center: my_place,
				zoom: 15
			}
			)

		const marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "Bviajes jhkjahdj",
			visible: true
		})

		UserLocation.get((coords)=>{
			//Calcular distancia Usuario-establecimiento
			let origen = new google.maps.LatLng(coords.lat,
													coords.lng
												)//lat y lng
			let destino = new google.maps.LatLng(my_place.lat,
													my_place.lng
												)//lat y lng
			//Un servicio de Gogle
			let service = new google.maps.DistanceMatrixService()
			service.getDistanceMatrix({
				origins:[origen],
				destinations: [destino],
				travelMode: google.maps.TravelMode.DRIVING
			},(response,status)=>{
				if(status === google.maps.DistanceMatrixStatus.OK){
					const duration_element = response.rows[0].elements[0]
					const duracion_viaje = duration_element.duration.text
					document.querySelector("#message")
									.innerHTML = `
										Estas a ${duracion_viaje} de poder cumplir tus sueños
										en <span class="fredora-script medium">Bviajes Goznale</span>
									`
				}
			})
		})
	})
})()