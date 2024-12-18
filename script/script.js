// Aggiunge un listener per l'evento 'DOMContentLoaded' per assicurarsi che lo script venga eseguito solo dopo che il DOM è completamente caricato
document.addEventListener("DOMContentLoaded", function() {
    // Controlla se il cookie "login" non è presente nei cookie del documento
    if(document.cookie.search("login") == -1){
        // Se il cookie "login" non è trovato, lo imposta su "false"
        document.cookie="login=false";
    }
    
    // Se il valore del cookie "login" è "true" (utente è loggato)
    if(getCookie("login") === "true"){
        // Recupera il contenuto HTML dell'header per utenti loggati
        fetch("components/header.html")
            .then(response => response.text()) // Converte la risposta in testo
            .then(data => {
                // Inserisce l'HTML recuperato nell'elemento con ID "header"
                document.getElementById("header").innerHTML = data;
            });
    }
    // Se il valore del cookie "login" non è "true" (utente non è loggato)
    else {
        // Recupera il contenuto HTML dell'header per utenti non loggati
        fetch("components/header_no_login.html")
            .then(response => response.text()) // Converte la risposta in testo
            .then(data => {
                // Inserisce l'HTML recuperato nell'elemento con ID "header"
                document.getElementById("header").innerHTML = data;
            });
    }
    
    // Recupera il contenuto HTML del componente search bar
    fetch("components/searchbar.html")
        .then(response => response.text()) // Converte la risposta in testo
        .then(data => {
            // Inserisce l'HTML recuperato nell'elemento con ID "searchbar"
            document.getElementById("searchbar").innerHTML = data;
        });
    
    // Recupera il contenuto HTML del componente login form
    fetch("components/loginform.html")
        .then(response => response.text()) // Converte la risposta in testo
        .then(data => {
            // Inserisce l'HTML recuperato nell'elemento con ID "loginform"
            document.getElementById("loginform").innerHTML = data;

            // Chiama la funzione per aggiungere listener agli elementi appena caricati
            addEventListeners();
        });

    // Seleziona l'elemento con la classe "next" (pulsante avanti)
    let next = document.querySelector('.next');
    // Seleziona l'elemento con la classe "prev" (pulsante indietro)
    let prev = document.querySelector('.prev');
    
    // Aggiunge un listener per il click sul pulsante "next"
    next.addEventListener('click', function(){
        // Seleziona tutti gli elementi con la classe "item"
        let items = document.querySelectorAll('.item');
        // Sposta il primo elemento alla fine della lista aggiungendolo all'elemento padre con classe "slide"
        document.querySelector('.slide').appendChild(items[0]);
    });
    
    // Aggiunge un listener per il click sul pulsante "prev"
    prev.addEventListener('click', function(){
        // Seleziona tutti gli elementi con la classe "item"
        let items = document.querySelectorAll('.item');
        // Sposta l'ultimo elemento all'inizio della lista inserendolo all'inizio dell'elemento padre con classe "slide"
        document.querySelector('.slide').prepend(items[items.length - 1]); // Qui la lunghezza di items è supposta essere 6
    });
});

// Funzione per aggiungere listener agli eventi
function addEventListeners() {

    // Seleziona l'elemento con ID "search" (pulsante di ricerca)
    let btnsearch = document.querySelector("#search");
    // Seleziona l'elemento con classe "searchbar" (barra di ricerca)
    let searchbar = document.querySelector(".searchbar");
    // Seleziona l'elemento con ID "close" (pulsante di chiusura della barra di ricerca)
    let close = document.querySelector("#close");

    // Controlla se il pulsante di ricerca, la barra di ricerca e il pulsante di chiusura esistono nel DOM
    if (btnsearch && searchbar && close) {
        // Aggiunge un listener per il click sul pulsante di ricerca per alternare la visibilità della barra di ricerca
        btnsearch.addEventListener("click", function () {
            searchbar.classList.toggle("show_searchbar");
        });

        // Aggiunge un listener per il click sul pulsante di chiusura per alternare la visibilità della barra di ricerca
        close.addEventListener("click", function () {
            searchbar.classList.toggle("show_searchbar");
        });
    }

    // Seleziona l'elemento con ID "btn_form" (pulsante per aprire il form)
    let btn_form = document.querySelector("#btn_form");
    // Seleziona l'elemento con classe "form" (elemento del form)
    let form = document.querySelector(".form");
    // Seleziona l'elemento con ID "close_form" (pulsante per chiudere il form)
    let close_form = document.querySelector("#close_form");

    // Controlla se il pulsante del form, il form e il pulsante di chiusura del form esistono nel DOM
    if (btn_form && form && close_form) {
        // Aggiunge un listener per il click sul pulsante del form per alternare la visibilità del form
        btn_form.addEventListener("click", function () {
            form.classList.toggle("show_form");
        });

        // Aggiunge un listener per il click sul pulsante di chiusura del form per alternare la visibilità del form
        close_form.addEventListener("click", function () {
            form.classList.toggle("show_form");
        });
    }

    // Array di oggetti utente con proprietà "user" e "pass"
    let utenti = [
        {
            "user" : "user1@example.com",
            "pass" : "password1"
        },
        {
            "user" : "user2@example.com",
            "pass" : "password2"
        }
    ];

    // Seleziona l'elemento con ID "email" (campo di input email)
    let email = document.getElementById("email");
    // Seleziona l'elemento con ID "password" (campo di input password)
    let password = document.getElementById("password");
    // Seleziona l'elemento con ID "login_button" (pulsante di login)
    let bottone = document.getElementById("login_button");
    // Seleziona l'elemento con ID "login_display" (area di visualizzazione messaggi di login)
    let loginDisplay = document.getElementById('login_display');

    // Controlla se il cookie "login" non è presente nei cookie del documento
    if(document.cookie.search("login") == -1){
        // Se il cookie "login" non è trovato, lo imposta su "false"
        document.cookie="login=false";
    }

    // Aggiunge un listener per il click sul pulsante di login per gestire la validazione del login
    bottone.addEventListener("click", function (e) {
        let lo_ho_trovato = false; // Flag per controllare se l'utente è trovato
        for(let i = 0; i < 2; i++)
        {
            // Controlla se l'email corrisponde a un utente nell'array utenti
            if(utenti[i].user == email.value)
            {
                lo_ho_trovato = true; // Utente trovato
                // Controlla se la password corrisponde alla password dell'utente
                if(utenti[i].pass == password.value)
                {
                    document.cookie="login=true"; // Imposta il cookie di login su true
                    loginDisplay.textContent = 'Login successful'; // Visualizza il messaggio di successo
                    window.location.href = 'servizi.html'; // Reindirizza a servizi.html
                } 
                else
                {
                    loginDisplay.textContent = 'Wrong password'; // Visualizza il messaggio di password errata
                }
            }
        }

        if(!lo_ho_trovato)
        {
            loginDisplay.textContent = 'You are not a registered user'; // Visualizza il messaggio di utente non registrato
        }
    });

    // Controlla se il cookie "mode" non è presente nei cookie del documento
    if(document.cookie.search("mode") == -1){
        // Se il cookie "mode" non è trovato, lo imposta su "light"
        document.cookie="mode=light";
    }
    
    // Seleziona l'elemento con ID "change_theme_icon" (icona per cambiare tema)
    let icon = document.getElementById('change_theme_icon');
    // Controlla il valore del cookie "mode" per impostare l'icona e le classi appropriate
    if(getCookie("mode") === "light"){
        icon.className = "bi bi-moon-stars"; // Imposta l'icona a moon-stars per la modalità chiara
        change_theme_classes(false); // Applica le classi per la modalità chiara
    } else {
        icon.className = "bi bi-sun"; // Imposta l'icona a sun per la modalità scura
        change_theme_classes(true); // Applica le classi per la modalità scura
    }

    // Seleziona l'elemento con ID "change_theme" (pulsante per cambiare tema)
    let change_color_mode = document.getElementById("change_theme");

    // Aggiunge un listener per il click sul pulsante di cambio tema per alternare tra modalità chiara e scura
    change_color_mode.addEventListener("click", function () {
        let icon = document.getElementById('change_theme_icon');
        if(getCookie("mode") === "light"){
            icon.className = "bi bi-sun"; // Cambia l'icona a sun per la modalità scura
            document.cookie="mode=dark"; // Imposta il cookie di modalità su dark
            change_theme_classes(true); // Applica le classi per la modalità scura
        } else {
            icon.className = "bi bi-moon-stars"; // Cambia l'icona a moon-stars per la modalità chiara
            document.cookie="mode=light"; // Imposta il cookie di modalità su light
            change_theme_classes(false); // Applica le classi per la modalità chiara
        }
    });
}

// Inizializza lo slider
const initSlider = () => {
    // Seleziona l'elemento con la classe "image-list" (lista di immagini nello slider)
    const imageList = document.querySelector(".slider-wrapper .image-list");
    // Seleziona tutti gli elementi con la classe "slide-button" (pulsanti per scorrere le immagini)
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    // Seleziona l'elemento con la classe "slider-scrollbar" (scrollbar personalizzata per lo slider)
    const sliderScrollbar = document.querySelector(".slider_container .slider-scrollbar");
    // Seleziona l'elemento con la classe "scrollbar-thumb" (thumb della scrollbar personalizzata)
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    // Calcola la larghezza massima scrollabile per la lista di immagini
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Aggiunge un listener per l'evento "mousedown" sul thumb della scrollbar per il drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX; // Memorizza la posizione iniziale del mouse sull'asse X
        const thumbPosition = scrollbarThumb.offsetLeft; // Memorizza la posizione iniziale del thumb
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth; // Calcola la posizione massima del thumb
        
        // Funzione per gestire il movimento del mouse durante il drag
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX; // Calcola il cambiamento della posizione del mouse sull'asse X
            const newThumbPosition = thumbPosition + deltaX; // Calcola la nuova posizione del thumb

            // Assicura che la nuova posizione del thumb rimanga entro i limiti della scrollbar
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft; // Calcola la nuova posizione di scroll della lista di immagini
            
            scrollbarThumb.style.left = `${boundedPosition}px`; // Sposta il thumb della scrollbar nella nuova posizione
            imageList.scrollLeft = scrollPosition; // Scorre la lista di immagini nella nuova posizione
        }

        // Funzione per gestire l'evento "mouseup" (fine del drag)
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove); // Rimuove il listener dell'evento mousemove
            document.removeEventListener("mouseup", handleMouseUp); // Rimuove il listener dell'evento mouseup
        }

        // Aggiunge i listener per gli eventi mousemove e mouseup per gestire l'interazione di drag
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Aggiunge i listener per il click sui pulsanti di scorrimento delle immagini
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1; // Determina la direzione di scorrimento in base all'ID del pulsante
            const scrollAmount = imageList.clientWidth * direction; // Calcola la quantità di scroll
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" }); // Scorre la lista di immagini in modo fluido della quantità calcolata
        });
    });

    // Funzione per mostrare o nascondere i pulsanti di scorrimento in base alla posizione corrente di scroll della lista di immagini
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex"; // Nasconde il pulsante "prev" se è all'inizio
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex"; // Nasconde il pulsante "next" se è alla fine
    }

    // Funzione per aggiornare la posizione del thumb della scrollbar in base alla posizione corrente di scroll della lista di immagini
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft; // Ottiene la posizione corrente di scroll della lista di immagini
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth); // Calcola la nuova posizione del thumb
        scrollbarThumb.style.left = `${thumbPosition}px`; // Sposta il thumb della scrollbar nella nuova posizione
    }

    // Aggiunge un listener all'evento "scroll" della lista di immagini per aggiornare la posizione del thumb della scrollbar e i pulsanti di scorrimento
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition(); // Aggiorna la posizione del thumb della scrollbar
        handleSlideButtons(); // Aggiorna la visibilità dei pulsanti di scorrimento
    });
}

// Aggiunge i listener per gli eventi "resize" e "load" per inizializzare lo slider
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

// Funzione per ottenere il valore di un cookie per nome
function getCookie(cookieName) {
    let cookie = {}; // Inizializza un oggetto vuoto per memorizzare i cookie come coppie chiave-valore
    // Divide la stringa document.cookie per il punto e virgola e itera su ogni parte
    document.cookie.split(';').forEach(function(el) {
        let [key, value] = el.split('='); // Divide ogni parte per il segno di uguale per ottenere chiave e valore
        cookie[key.trim()] = value; // Rimuove gli spazi bianchi e aggiunge la coppia chiave-valore all'oggetto cookie
    });
    return cookie[cookieName]; // Restituisce il valore del cookie richiesto per nome
}

// Funzione per alternare la classe del body per modalità chiara e scura
function change() {
    if(getCookie("mode") === "light"){
        body.className = "bodyDark"; // Imposta la classe del body su modalità scura
        document.cookie="mode=dark"; // Aggiorna il cookie di modalità su scura
    } else {
        body.className = "bodyLight"; // Imposta la classe del body su modalità chiara
        document.cookie="mode=light"; // Aggiorna il cookie di modalità su chiara
    }
}

// Funzione per cambiare le classi del tema in base alla modalità
function change_theme_classes(change_to_dark) {
    if (change_to_dark) {
        // Aggiunge classi o stili per la modalità scura
        document.getElementById('header').className = "header_dark";
        document.getElementById('searchbar').className = "searchbar_dark";
        document.getElementById('loginform').className = "loginform_dark";
        document.getElementById('home').className = "home home_dark";
        document.getElementById('background').className = "background background_dark";
    } else {
        // Aggiunge classi o stili per la modalità chiara
        document.getElementById('header').className = "header_light";
        document.getElementById('searchbar').className = "searchbar_light";
        document.getElementById('loginform').className = "loginform_light";
        document.getElementById('home').className = "home home_light";
        document.getElementById('background').className = "background background_light";
    }
}