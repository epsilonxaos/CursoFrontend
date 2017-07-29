const CACHE_NAME = "viajes-v1"//Nombre de la cache en una constante y su version de cache
const cache_urls = [
					"/offline/view.html",
					"/offline/style.css",
					"/offline/map.png"
					] //guadamos en un arreglo las urls a usar

self.addEventListener("install", function(ev){
	console.log("Sw instalada")
	caches.open(CACHE_NAME)//Definimos nombre a nuestro cache
		.then(function(cache){//Se ejecuta 
			console.log("Cache abierta")
			return cache.addAll(cache_urls)
		})
})

//Eliminado Versiones de cache de la cache :)
self.addEventListener("activate", function(ev){
	ev.waitUntil(
		caches.keys().then(function(cache_names){
			//console.log(cache_names)
			return Promise.all(
				cache_names.map(function(cache_name){
					if(CACHE_NAME != cache_name){
						return caches.delete(cache_name)
					}
				})
			)
		})
	)
})

//Evento Fetch

self.addEventListener("fetch",function(ev){
	//console.log(ev.request)
	ev.respondWith(//colocamos nuestro codigo para responder a las peticiones que se hacen de internet para nuestra pagina
		caches.match(ev.request)
			.then(function(response){
				if(response){
					console.log("Estoy en cache t ahorre peticion")
					return response //Devolviendo el cache
				}
				return fetch(ev.request)//las promises se responden con el meodo .then
			}).catch(function(err){
				if(ev.request.mode == "navigate"){
					return caches.match("/offline/view.html")
				}
			})
	)
})

/*Un serviceWoking es un intermidiario entre el navegador y el usuario
	*Es un proxy

	Navegador -> sw -> Servidor

	ServiceWorkers
	Fetch
	Cache -> Nos permite guarda archivos en el cache del navegador

	Y se maneja via eventos y ademas se instala cuando cargamos la pag
	y con internet
*/