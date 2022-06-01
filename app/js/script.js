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
    new Photo(generateId(), 'ejemploURL', 'ejemploSRC', 'Jose Molina', 'Caballos en montaña'),
    new Photo(generateId(), 'ejemploURL', 'ejemploSRC', 'Ignacio Fernandez', 'Gato saltando'),
    new Photo(generateId(), 'ejemploURL', 'ejemploSRC', 'Martin Caro', 'Autos de Formula 1'),
    new Photo(generateId(), 'ejemploURL', 'ejemploSRC', 'Beatriz Quiroga', 'Buenos Aires'),
    new Photo(generateId(), 'ejemploURL', 'ejemploSRC', 'Jose Molina', 'Persona en montaña')
];

console.table(photos);

// Creamos una función que nos permita validar si lo que ingresa el usuario cumple el requisito especificado. Si no lo cumple devuelve 'false', y si lo cumple devuelve 'true'. 
const validateSearch = (word) => {
    // Verificamos si la palabra posee más de 3 caracteres. 
    if (word.length < 3){
        return false;
    } else {
        return true;
    }
}

let gallery = document.getElementById('gallery');

// Creamos una función que nos permita eliminar todos los hijos de un elemento.
const removeAllChild = (parent) => {
    // Evalua que mientras tenga hijos, los va a eliminar.
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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
        alert('No se pudo encontrar ninguna foto relacionada a su búsqueda.');
    } else{
        // Eliminamos todas las fotos de la gelería.
        removeAllChild(gallery);

        // Aplicando la función 'forEach' de orden superior. Por cada foto filtrada devolvemos un nuevo elemento para la galería.
        filteredPhotos.forEach((photo) => {
            // Creamos un nuevo elemento article.
            let newGalleryItem = document.createElement('article');
            // Le asignamos la clase que define los estilos que poseerán las fotos.
            newGalleryItem.classList.add('gallery__item')
            // Y le ponemos en el h2 el atributo 'alt' de la/las fotos filtradas.
            newGalleryItem.innerHTML = `<h2>${photo.alt}</h2>`;
            // Y por último le agregamos ese nuevo elemento a la galería. Utilicé el 'prepend' ya que quiero que se agregue al principio, para respetar el orden que simulo en el array.
            gallery.prepend(newGalleryItem);
        });
    }
}

// Creamos una función que al cargarse la página simule que se trajeron fotos aleatoriamente. La misma cargará 8 fotos.
const loadInitialRandomPhotos = () => {
    for (let i=0; i > 7; i++){
        // Creamos un nuevo elemento article.
        let galleryItem = document.createElement('article');
        // Le asignamos la clase que define los estilos que poseerán las fotos.
        galleryItem.classList.add('gallery__item')
        // Y le ponemos en el h2 el nombre de 'Foto' y entre paréntesis el número de foto. Ejemplo 'Foto(1)'.
        galleryItem.innerHTML = `<h2>Foto(${i})</h2>`;
        // Y por último le agregamos ese nuevo elemento a la galería. Utilicé el 'prepend' ya que quiero que se agregue al principio, para respetar el orden que simulo en el array.
        gallery.prepend(galleryItem);
    }
}

// IMPORTANTE. Mantengo el prompt ya que necesito si o si los eventos para poder leer el input y devolver las fotos.
// Tuve que poner esto ya que, a pesar que todavia no lo vimos, me molestaba bastante que no me cargue la página sino interactuaba con el prompt.
window.onload = () => {
    while(true){
        // A traves de prompt pedimos el ingreso de una palabra o una frase.
        let search = prompt('Introduzca lo que desee buscar:');
        // Validamos si el resultado es 'true' o 'false'.
        if (validateSearch(search) == true){
            // Cuando sea 'true', llamamos a la función que filtra.
            filterPhotos(search);
            break;
        } else{
            // Cuando es 'false', lanzamos la alerta de que no cumple la condición.
            alert('Debe introducir una palabra mayor a 3 letras');
        }
    }
}
