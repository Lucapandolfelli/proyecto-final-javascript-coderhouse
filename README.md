# Proyecto final del curso de Javascript de Coderhouse
![Imagen del proyecto](/dist/assets/images/screenshot.png)

## Idea

Utilizando la api de [Pexels](https://www.pexels.com/es-es/api/), la cual básicamente nos retorna imágenes aleatoriamente o si ingresamos una palabra en especifico nos devuelve imágenes relacionadas con esa palabra, plantee un aplicación que nos permita consumir esa api con el fin de encontrar las imagágenes que querramos a partir de una palabra o incluso una frase.

Incluso cada item que devuelve la api cuenta con el nombre del fotográfo que tomó la foto, por lo que se mostrará esa información mediante un modal al hacer click sobre una imagen.

## Simulador
Continuando con el simulador, al mismo se le agregó funcionalidades própias del DOM de Javascript. Ahora, en lugar de devolver el o los objetos por consola cuando matcheaba lo ingresado con el atributo 'alt' de alguna foto, devuelve a traves del DOM los items correspondientes. Previo a devolverlos, elimina los que ya se encontraban antes, los cuales representan fotos aleatorias que se muestran cuando no se buscó nada.

Además, cuando no se encontraron fotos a partir del ingreso, se notifica mediante un texto en la página, cuando antes se lo hacía mediante un alert.

Puede ver el simulador funcionando [aquí](https://lucapandolfelli.github.io/proyecto-final-javascript-coderhouse/).

Todavía queda mucho por mejorar del simulador, utilizando los eventos de Javascript.
