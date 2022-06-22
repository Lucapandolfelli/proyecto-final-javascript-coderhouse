# Proyecto final del curso de Javascript de Coderhouse
![Imagen del proyecto](/dist/assets/images/screenshot.png)

## Idea

Utilizando la api de [Pexels](https://www.pexels.com/es-es/api/), la cual básicamente nos retorna imágenes aleatoriamente o si ingresamos una palabra en especifico nos devuelve imágenes relacionadas con esa palabra, plantee un aplicación que nos permita consumir esa api con el fin de encontrar las imagágenes que querramos a partir de una palabra o incluso una frase.

Incluso cada item que devuelve la api cuenta con el nombre del fotográfo que tomó la foto, por lo que se mostrará esa información mediante un modal al hacer click sobre una imagen.

## Simulador
Se cambió considerablemente algunas cosas del simulador. Ahora tenemos un array de objetos cuyos primeros 8 items los usé para las 'fotos aleatorias' y los restantes para que sean buscados por la barra de búsqueda. Para eso se utilizan dos funciones distintas, que obtienen lo que se desea apartir de ese array de objetos y una función los convierte en la clase Photo y renderiza un elemento para el HTML.

Además, se creó un método para la clase Photo el cual utiliza la libreria SweetAlert y lanza un modal con la foto. 

Puede ver el simulador funcionando [aquí](https://lucapandolfelli.github.io/proyecto-final-javascript-coderhouse/).


