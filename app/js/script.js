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

// Creamos una función que nos permita saber si lo que ingresa el usuario coincide de alguna forma con el atributo 'Alt' de alguna foto. 
const filterPhotos = (word) => {
    // Filtramos el array de objetos para ver si la palabra buscada se encuentra en el alt de la foto. 
    let filteredPhotos = photos.filter(photo => photo.alt.toLowerCase().includes(word));

    /* 
        Array.filter() devuelve un array nuevo si se cumple la condición y uno vacío si no se cumple. 
        Comprobamos si el array está vacío, es decir, que la plabra buscada no matcheó con ningún objeto de nuestro array(simulador de base de datos). 
    */
    if (filteredPhotos.length == 0){
        alert('No se pudo encontrar ninguna foto relacionada a su búsqueda.');
    } else{
        // Y si matcheó simplemente devolvemos el objeto(la foto). 
        for (const photo of filteredPhotos){
            console.log(photo);
        }
    }
}

// A traves de prompt pedimos el ingreso de una palabra o una frase.
let search = prompt('Introduzca lo que desee buscar:');

// Validamos si el resultado es 'true' o 'false'.
if (validateSearch(search) == true){
    // Cuando sea 'true', llamamos a la función que filtra.
    filterPhotos(search);
} else{
    // Cuando es 'false', lanzamos la alerta de que no cumple la condición.
    alert('Debe introducir una palabra mayor a 3 letras');
}

