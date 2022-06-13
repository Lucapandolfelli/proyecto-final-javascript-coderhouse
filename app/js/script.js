/* 
Creamos un objeto teniendo en cuenta los parámetros que nos devuelve la API en la docmuentación de la misma. 
Link: https://www.pexels.com/es-es/api/documentation/#photos-overview.
*/
class Photo {
    constructor(id, url, src, photographer, alt){
        this.id = id; // Nro identificador de cada foto en particular.
        this.url = url; // URL de la imagen original subida en Pexels.
        this.src = src; // URL de la imagen para ser utilizada en nuestro proyecto.
        this.photographer = photographer; // Nombre del fotografo.
        this.alt = alt; // Texto descriptivo de la imagen el cual usa la API para filtrar y devolver resultados de búsqueda.
    }
}

// Creamos una función para generar Id's aleatorios. 
const generateId = () => {
    let id = Math.floor(Math.random() * 999) + 1;
    return id;
}

// Creamos un array que simule la base de datos donde se almacenan las fotos. 
const photos = [
    new Photo(generateId(), 'ejemploURL', '/dist/assets/images/caballomontaña.jpg', 'Jose Molina', 'Caballos en montaña'),
    new Photo(generateId(), 'ejemploURL', '/dist/assets/images/gatosaltando.jpg', 'Ignacio Fernandez', 'Gato saltando'),
    new Photo(generateId(), 'ejemploURL', '/dist/assets/images/formula1.jpg', 'Martin Caro', 'Autos de Formula 1'),
    new Photo(generateId(), 'ejemploURL', '/dist/assets/images/buenosaires.jpg', 'Beatriz Quiroga', 'Buenos Aires'),
    new Photo(generateId(), 'ejemploURL', '/dist/assets/images/personamontaña.jpg', 'Jose Molina', 'Persona en montaña')
];

let errorAlert = document.getElementById('errorAlert');
let inputSearch = document.querySelector('input');
let clearInputButton = document.getElementById('clearInput');
let searchForm = document.getElementById('searchForm');
let gallery = document.getElementById('gallery');
let galleryContainer = document.getElementById('galleryContainer');

// Creamos una función que nos permita validar si lo que ingresa el usuario cumple el requisito especificado. Si no lo cumple devuelve 'false', y si lo cumple devuelve 'true'. 
const validateSearch = (word) => {
    // Verificamos si la palabra posee más de 3 caracteres. 
    if (word.length < 3){
        return false;
    } else {
        return true;
    }
}

// Creamos una función que nos permita eliminar todos los hijos de un elemento.
const removeAllChild = (parent) => {
    // Evalua que mientras tenga hijos, los va a eliminar.
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Creamos una función que nos permita crear nuevos elementos (fotos) para la galería.
const createNewGalleryItem = (galleryTitle) => {
    // Creamos un nuevo elemento article.
    let newGalleryItem = document.createElement('article');
    // Le asignamos la clase que define los estilos que poseerán las fotos.
    newGalleryItem.classList.add('gallery__item');
    // Y le ponemos lo que el usuario quiera mostrar.
    newGalleryItem.innerHTML = galleryTitle;
    // Y por último le agregamos ese nuevo elemento a la galería. Utilicé el 'prepend' ya que quiero que se agregue al principio, para respetar el orden que simulo en el array.
    galleryContainer.prepend(newGalleryItem);
}

// Creamos una función que nos permita saber si lo que ingresa el usuario coincide de alguna forma con el atributo 'Alt' de alguna foto. 
const filterPhotos = (search) => {
    // Filtramos el array de objetos para ver si la palabra buscada se encuentra en el alt de la foto. 
    let filteredPhotos = photos.filter(photo => photo.alt.toLowerCase().includes(search));
    /* 
    Array.filter() devuelve un array nuevo si se cumple la condición y uno vacío si no se cumple. 
    Comprobamos si el array está vacío, es decir, que la plabra buscada no matcheó con ningún objeto de nuestro array(simulador de base de datos). 
    */
    if (filteredPhotos.length == 0){
        // Mostramos que ocurrió un error mediante un h2.
        gallery.innerHTML = `<h2>No se pudo encontrar ninguna foto relacionada a "${search}".</h2>`;
    } else{
        // Eliminamos todas las fotos de la gelería.
        removeAllChild(galleryContainer);

        // Aplicando la función 'forEach' de orden superior. Por cada foto filtrada devolvemos un nuevo elemento para la galería.
        filteredPhotos.forEach((photo) => {
            // Llamamos la función que crea un nuevo elemento de la galería.
            createNewGalleryItem(`<img src="${photo.src}" alt="${photo.alt}"></img>`);
        });
    }
}

// Creamos una función que al cargarse la página simule que se trajeron fotos aleatoriamente. La misma cargará 8 fotos.
const getInitialRandomPhotos = () => {
    for (let i=1; i <= 8; i++){
        // Llamamos la función que crea un nuevo elemento de la galería.
        createNewGalleryItem(`<img src="/dist/assets/images/example (${i}).jpeg" alt="Foto(${i})"></img>`);
    }
}

// Eveneto submit del form, donde se llama a una función que trae las fotos a partir de la búsqueda.
searchForm.addEventListener('submit', (e) => {
    getSearchedPhotos(e);
});

// Botón para limpiar el input del form.
clearInputButton.addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    removeAllChild(galleryContainer);
    getInitialRandomPhotos();
    errorAlert.innerText = '';
});

// Creamos una función que nos permita tomar lo que el usuario ingresa en la barra de búsqueda y fijarnos si matchea con alguna de las fotos que tenemos guardadas en el array (simulador de base de datos).
const getSearchedPhotos = (e) => {
    // Evitamos el funcionamiento por defualt del evento submit.
    e.preventDefault();
    // Tomamos al input del form y lo almacenamos.
    let inputSearch = e.target.querySelector('input');
    // Y también guardamos el value en otra.
    const userSearch = inputSearch.value;
    // Validamos el value del input.
    if (validateSearch(userSearch) === true){
        // Cuando sea 'true', llamamos a la función que filtra.
        filterPhotos(userSearch);
        errorAlert.innerText = '';
    } else{
        // Cuando sea 'false', avisamos el error.
        errorAlert.innerText = 'Debe introducir una palabra mayor a 3 letras';
    }
}

// Cuando se carge la ventana, llamamos a la función que nos carga 8 fotos simulando que son fotos aleatorias.
window.addEventListener('load', () => {
    getInitialRandomPhotos();
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

if (theme === 'darkTheme'){
    enableDarkTheme();
}else{
    disableDarkTheme();
}

// Cuando se aplique el evento click al botón toggle, si el local storage 'theme' no es 'darkTheme', lo habilitamos y sino lo deshabilitamos.
toggleTheme.addEventListener('click', () => {
    // Actualizamos el local storage cuando se hace click.
    theme = localStorage.getItem('theme');
    if (theme != 'darkTheme'){
        enableDarkTheme();
    }else{
        disableDarkTheme();
    }
});

