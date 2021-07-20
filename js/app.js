// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando se agrega un nuevo Tweet
    formulario.addEventListener("submit", agregarTweet)

    // Cuando el documento está listo
    document.addEventListener("DOMContentLoaded", () => {
        tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        crearHTML();
    })
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    const tweet = document.querySelector("#tweet").value;
    
    if(!tweet.length) {
        mostrarError("El tweet no puede quedar vacio.");
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Crear el HTML
    crearHTML();

    // Reiniciar el form
    formulario.reset();
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement("p");
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("error");

    // Insertarlo en el contenedor
    const contenido = document.querySelector("#contenido");
    if(!contenido.querySelector(".error")) {
        contenido.appendChild(mensajeError);

        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
    }
}

function crearHTML() {
    limparHTML();
    if(tweets.length) {
        tweets.forEach(tweet =>  {
            // Agregar un boton
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.textContent = "X";
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement("li");
            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);

            listaTweets.appendChild(li);
        });
    }
    sincronizarStorage();
}

function limparHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

function sincronizarStorage() {
    localStorage.setItem("tweets", JSON.stringify(tweets));
}