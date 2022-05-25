# Proyecto final del curso de Javascript de Coderhouse
![Imagen del proyecto](/dist/assets/images/screenshot.png)

## Idea

Utilizando la api de [Pexels](https://www.pexels.com/es-es/api/), la cual básicamente nos retorna imágenes aleatoriamente o si ingresamos una palabra en especifico nos devuelve imágenes relacionadas con esa palabra, plantee un aplicación que nos permita consumir esa api con el fin de encontrar las imagágenes que querramos a partir de una palabra o incluso una frase.

Incluso cada item que devuelve la api cuenta con el nombre del fotográfo que tomó la foto, por lo que se mostrará esa información mediante un modal al hacer click sobre una imagen.

## Simulador
Ahora, el simulador está un poco más avanzando. Se creó un objeto llamado Photo(foto en español) el cual posee algunos atributos que se detallan en la docmentación de la API que voy a utilizar. Además, se creó un array donde se instancian algunos objetos 'Photo' con la información pertinente de cada uno. Principalmente, a nosotros nos interesa lo que se encuentra en el atributo 'Alt' de cada foto, ya que es ese parámetro el que se evalua para determinar qué fotos devovler cuando se ingresa una query en la API. 

Al igual que antes, se debe ingresar una palabra y/o frase a traves del prompt y se devuelve por consola, en caso de que se produzca el matcheo de lo ingresado con el atributo 'alt' de algunas de las fotos cargadas en el array, el o los objetos 'Photo'. En caso de no cumplirse el matcheo, se avisa por alert que no hubo coincidencias.

Puede ver el simulador funcionando [aquí](https://lucapandolfelli.github.io/proyecto-final-javascript-coderhouse/).

Todavía queda mucho por mejorar del simulador, mostrando realmente los resultados en la web y no en la consola.
