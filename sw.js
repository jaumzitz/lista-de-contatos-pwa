const registrarServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js", {
                scope: "/",
            });


            if (registration.installing) {
                console.log("Instalando service worker...")
            } else if (registration.waiting) {
                console.log("Service worker instalado.")
            } else if (registration.active) {
                console.log("Service worker ativo.");
            }

        } catch (error) {
            console.error(`Registro do service worker falhou: ${error}`)
        }
    }
}

registrarServiceWorker();



const addAoCache = async (recursos) => {
    const cache = await caches.open("v1")
    await cache.addAll(recursos)
}


self.addEventListener("install", (evento) => {
    evento.waitUntil(
        addAoCache([
            "/",
            "/index.html",
            "/icon.png",
            "/manifest.json",
            
            "contatos.json"
        ])
    )
})