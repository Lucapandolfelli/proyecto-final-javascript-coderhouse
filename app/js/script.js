let palabra = prompt('Introduzca lo que desee buscar:');

const validarPalabra = () => {
    if (palabra.length < 3){
        alert('Debe introducir una palabra mayor a 3 letras');
    } else{
        listarImagenes(palabra);
    }
}

const listarImagenes = (palabra) => {
    for(let i=1; i<=12; i++){
        console.log('Imagen : ' + palabra + `(${i}).jpg`);
    }
}

validarPalabra()