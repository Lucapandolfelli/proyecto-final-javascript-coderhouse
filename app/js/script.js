/* 
Creamos un objeto teniendo en cuenta los parámetros que nos devuelve la API en la docmuentación de la misma. 
Link: https://www.pexels.com/es-es/api/documentation/#photos-overview.
*/
class Photo {
    // Creamos el constructor de la clase a partir de las propiedades del objeto dado por un json de una API.
    constructor(json){
        Object.assign(this, json);
    }
    /* showModal(){
        Swal.fire({
            width: '50rem',
            imageUrl: this.src.original,
            imageWidth: '60%',  
            showConfirmButton: false,  
            imageAlt: this.alt
        });
    } */
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

let pageIndex = 1;
let searchValue;

const fetchPhotos = async (baseURL) => {
    const res = await fetch(baseURL, HEADERS);
    const data = await res.json();
    return data;
}

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

const generateHTML = (data, photoType) => {
    data.photos.forEach((photoObject) => {
        const photo = new Photo(photoObject);
        // Creamos un nuevo elemento article.
        let newGalleryItem = document.createElement('article');
        // Le asignamos la clase que define los estilos que poseerán las fotos.
        newGalleryItem.classList.add('gallery__item');
        newGalleryItem.setAttribute('data-photo', photoType);
        // Y le ponemos una etiqueta img con los datos del objeto para que se muestren.
        newGalleryItem.innerHTML = `<img src="${photo.src.large}" alt="${photo.alt}"></img>`;
        // Y por último le agregamos ese nuevo elemento a la galería.
        galleryContainer.append(newGalleryItem);
    });
}

// Creamos una función que nos devuelva las fotos a partir de lo ingresado por el usuario en la barra de búsqueda.
const getSearchedPhotos = async (e) => {
    e.preventDefault();
    searchValue = e.target.querySelector('input').value;
    if (validateSearchValue(searchValue) === true){
        const data = await fetchPhotos(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=16`);
        if (!data.next_page){
            loadMoreBtn.style.display = 'none'
        }
        removeAllChild(galleryContainer);
        generateHTML(data, 'search');
    }
}

const getMoreSearchedPhotos = async (index) => {
    const data = await fetchPhotos(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=16&page=${index}`);
    if (!data.next_page){
        loadMoreBtn.style.display = 'none'
    }
    generateHTML(data, 'search');
}

// Creamos una función que nos devuelva fotos aleatorias.
const getInitialRandomPhotos = async (index) => {
    const data = await fetchPhotos(`https://api.pexels.com/v1/curated?per_page=16&page=${index}`);
    if (!data.next_page){
        loadMoreBtn.style.display = 'none'
    }
    generateHTML(data, 'curated');
}

const loadMorePhotos = () => {
    let index = ++pageIndex;
    let galleryItem = document.querySelector('article');
    let dataPhoto = galleryItem.getAttribute('data-photo')
    if (dataPhoto == 'curated'){
        getInitialRandomPhotos(index);
    }else{
        getMoreSearchedPhotos(index);
    }
}


/****  EVENTOS  ****/

// Evento submit del form, donde se llama a una función que trae las fotos a partir de la búsqueda.
searchForm.addEventListener('submit', (e) => getSearchedPhotos(e));
loadMoreBtn.addEventListener('click', () => loadMorePhotos());
// Cuando se carge la ventana, llamamos a la función que nos carga 8 fotos simulando que son fotos aleatorias.
document.addEventListener('DOMContentLoaded', getInitialRandomPhotos(pageIndex));

// Botón para limpiar el input del form.
clearInputButton.addEventListener('click', () => {
    let pageIndex = 1;
    // Limpiamos el input.
    document.getElementById('searchInput').value = '';
    // Cuando la galería tiene 3 hijos es porque no se tuvo que crear el h2 para error. Sino, si se tuvo que crear el h2 por lo que tiene más hijos.
    /* if (gallery.childNodes.length == 3){
        // Borra los hijos del contenedor de la galería.
        removeAllChild(galleryContainer);
        // Carga las fotos aleatorias del principio.
        getInitialRandomPhotos(pageIndex);
    }else{
        // Borra el h2 con el error.
        gallery.childNodes[1].remove();
        // Carga las fotos aleatorias del principio.
        getInitialRandomPhotos(pageIndex);
    } */
    removeAllChild(galleryContainer);
    getInitialRandomPhotos(pageIndex);
    loadMoreBtn.style.display = 'flex';
});






// Toggle theme functionality

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

