/* 
Creamos un objeto teniendo en cuenta los parámetros que nos devuelve la API en la docmuentación de la misma. 
Link: https://www.pexels.com/es-es/api/documentation/#photos-overview.
*/
class Photo {
    // Creamos el constructor de la clase a partir de las propiedades del objeto dado por un json de una API.
    constructor(json){
        Object.assign(this, json);
    }
    showModal(){
        Swal.fire({
            width: '50rem',
            imageUrl: this.src.large2x,
            imageWidth: '60%',  
            showConfirmButton: false,  
            imageAlt: this.alt,
            footer: `<p>Foto por: ${this.photographer}</p>`
        });
    }
}

// La API key que pedí a la API de Pexels.
const API_KEY = '563492ad6f9170000100000124f75ece770b47a49b4bfa89770d506a';
// Guardo los headers en una constante para usarlos cuando necesite hacer un fetch.
const HEADERS = {
    method: 'GET', 
    headers: {
        Accept: 'application/json',
        Authorization: API_KEY
    }
}

// Definimos los elementos del DOM que necesitaremos.
let topBtn = document.getElementById('topBtn')
let loadMoreBtn = document.getElementById('loadMoreBtn');
let errorAlert = document.getElementById('errorAlert');
let clearInputButton = document.getElementById('clearInput');
let searchForm = document.getElementById('searchForm');
let gallery = document.getElementById('gallery');
let galleryContainer = document.getElementById('galleryContainer');


// Creamos una función que nos permita eliminar todos los hijos de un elemento.
const removeAllChild = (parent) => {
    // Evalua que mientras tenga hijos, los va a eliminar.
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Definimos algunas variables globales que necesitaremos.
let pageIndex = 1;
let searchValue;

// Creamos una función que nos permita realizar el fetch a partir de una URL y retornar la 'data' para asi trabajarla como querramos.
const fetchPhotos = async (baseURL) => {
    const res = await fetch(baseURL, HEADERS);
    const data = await res.json();
    return data;
}

// Creamos una función que valide lo ingresado por el usuario.
const validateSearchValue = (searchValue) => {
    if (searchValue.length < 3){
        // Avisamos el error.
        errorAlert.innerText = 'Debe introducir una palabra mayor a 3 letras.';
        // Creamos un timer que limpie el 'errorAlert' despues de 1.5 segundos.
        setTimeout(() => {
            errorAlert.innerText = '';
        }, 1500);
    }else{
        return true;
    }
}

// Creamos una función que nos permita mapear las fotos devueltas por la API, crear una instancia del objeto Photo a partir de los datos de la API, y crear su respectivo elemento en HTML.
const generateHTML = (data, photoType) => {
    data.photos.forEach((photoObject) => {
        const photo = new Photo(photoObject);
        // Creamos un nuevo elemento article.
        let newGalleryItem = document.createElement('article');
        // Le asignamos la clase que define los estilos que poseerán las fotos.
        newGalleryItem.classList.add('gallery__item');
        // Le asignamos un atributo 'data-photo' para poder saber si la foto es el resultado de una búsqueda o es una foto random.
        newGalleryItem.setAttribute('data-photo', photoType);
        // Y le ponemos una etiqueta img con los datos del objeto para que se muestren.
        newGalleryItem.innerHTML = `<img src="${photo.src.large}" alt="${photo.alt}"></img>`;
        // Y por último le agregamos ese nuevo elemento a la galería.
        galleryContainer.append(newGalleryItem);
        // Por último, cuando se realiza click sobre un elemento de la galería se lanza el método 'showModal'.
        newGalleryItem.addEventListener('click', () => photo.showModal());
    });
}

// Creamos una función que nos permita validar algunos errores para asi mostrarlos por el HTML.
const validateErrors = (data, searchValue) => {
    // Si no tiene más paginaciones, oculta el botoón de cargar más fotos.
    if (!data.next_page){
        loadMoreBtn.style.display = 'none'
    }
    // Si la API nos devuelve una array vacio, por medio de un H2 informamos el error.
    if (data.photos.length === 0){
        let textError = document.createElement('h2');
        textError.innerText = `No se encontraron fotos de '${searchValue}'`;
        gallery.prepend(textError);
    }
}

// Creamos una función que nos devuelva las fotos a partir de lo ingresado por el usuario en la barra de búsqueda.
const getSearchedPhotos = async (e) => {
    e.preventDefault();
    // Capturamos el valor del input mediante el evento.
    searchValue = e.target.querySelector('input').value;
    // Y lo validamos.
    if (validateSearchValue(searchValue) === true){
        // Realizamos el fetch de la petición.
        const data = await fetchPhotos(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=16`);
        // Validamos los errores si los hay.
        validateErrors(data, searchValue);
        // Vaciamos el contenedor de la galería.
        removeAllChild(galleryContainer);
        // Cargamos los nuevos items de la galería.
        generateHTML(data, 'search');
    }
}

// Creamos una función que nos devuelva otras páginas de fotos respecto de la búsqueda anterior.
const getMoreSearchedPhotos = async (index) => {
    // Realizamos el fetch de la petición.
    const data = await fetchPhotos(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=16&page=${index}`);
    // Validamos los errores si los hay.
    validateErrors(data, searchValue);
    // Cargamos los nuevos items de la galería.
    generateHTML(data, 'search');
}

// Creamos una función que nos devuelva fotos aleatorias.
const getInitialRandomPhotos = async (index) => {
    // Realizamos el fetch de la petición.
    const data = await fetchPhotos(`https://api.pexels.com/v1/curated?per_page=16&page=${index}`);
    // Verificamos si no tiene otra página de paginación para no mostrar más el botón.
    if (!data.next_page){
        loadMoreBtn.style.display = 'none'
    }
    // Cargamos los nuevos items de la galería.
    generateHTML(data, 'curated');
}

// Creamos una funcióm que nos permita cargar las paginaciones dependiendo del tipo de foto.
const loadMorePhotos = () => {
    let index = ++pageIndex;
    let galleryItem = document.querySelector('article');
    let dataPhoto = galleryItem.getAttribute('data-photo')
    // Según el valor del 'data-photo' se llama a la función que corresponde.
    if (dataPhoto == 'curated'){
        getInitialRandomPhotos(index); // Función para fotos random.
    }else{
        getMoreSearchedPhotos(index); // Función para fotos buscadas.
    }
}

// Creamos una función que nos permita limpiar el 'value' del input además de limpiar la galería según su contenido.
const clearInputAndGallery = () => {
    let pageIndex = 1;
    // Limpiamos el input.
    document.getElementById('searchInput').value = '';
    // Cuando la galería tiene 5 hijos es porque no se tuvo que crear el h2 para error. Sino, si se tuvo que crear el h2 por lo que tiene más hijos.
    if (gallery.childNodes.length === 5){
        // Borra los hijos del contenedor de la galería.
        removeAllChild(galleryContainer);
        // Carga las fotos aleatorias del principio.
        getInitialRandomPhotos(pageIndex);
    }else{
        // Borra el h2 con el error.
        gallery.childNodes[0].remove();
        // Borra los hijos del contenedor de la galería.
        removeAllChild(galleryContainer);
        // Carga las fotos aleatorias del principio.
        getInitialRandomPhotos(pageIndex);
    }
    // Mostramos el botón de cargar más fotos.
    loadMoreBtn.style.display = 'flex';
}


/****  EVENTOS  ****/

// Cuando se carge la ventana, llamamos a la función que nos carga 8 fotos simulando que son fotos aleatorias.
document.addEventListener('DOMContentLoaded', getInitialRandomPhotos(pageIndex));
// Evento submit del form, donde se llama a una función que trae las fotos a partir de la búsqueda.
searchForm.addEventListener('submit', (e) => getSearchedPhotos(e));
// Evento click del botón para cargar más fotos mediante las paginaciones de la API.
loadMoreBtn.addEventListener('click', () => loadMorePhotos());
// Evento click del botón para limpiar el input y la galería.
clearInputButton.addEventListener('click', () => clearInputAndGallery());
// Evento para el botón de volver arriba.
window.addEventListener("scroll", () => {
    if (window.scrollY > 1){
        // Si se hace scroll, se muestra el botón cambiandole el display.
        topBtn.style.display = 'flex';
    }else if(window.scrollY < 1){
        // Si se vuelve a la parte superior, se vuelve a ocultar el botón.
        topBtn.style.display = 'none';
    }
})

/*******************/



/****  TOGGLE THEME FUNCIONALITY  ****/

let toggleTheme = document.getElementById('toggleTheme');
let ball = document.getElementById('ball');
let theme = localStorage.getItem('theme');

// Creamos una función que nos permita habiltar el tema oscuro de la página, agregando la clase correspondiente al body y seteando el local storage para guardar el modo.
const enableDarkTheme = () => {
    document.body.classList.add('dark-theme');
    localStorage.setItem('theme', 'darkTheme');
    ball.style.transform = 'translateX(20px)';
}

// Creamos una función que nos permita deshabiltar el tema oscuro de la página, removiendo la clase al body y seteando el local storage para guardar el modo.
const disableDarkTheme = () => {
    document.body.classList.remove('dark-theme');
    localStorage.setItem('theme', 'normal');
    ball.style.transform = 'translateX(0)';
}

theme === 'darkTheme' ? enableDarkTheme() : disableDarkTheme();

// Cuando se aplique el evento click al botón toggle, si el local storage 'theme' no es 'darkTheme', lo habilitamos y sino lo deshabilitamos.
toggleTheme.addEventListener('click', () => {
    // Actualizamos el local storage cuando se hace click.
    theme = localStorage.getItem('theme');
    theme != 'darkTheme' ? enableDarkTheme() : disableDarkTheme();
});

/*************************************/
//# sourceMappingURL=script.js.map
