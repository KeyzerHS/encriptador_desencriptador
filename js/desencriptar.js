let botonDesencriptar = document.getElementById('btnDesencriptar');
let botonCopiar = document.getElementById('btnCopiar');

botonDesencriptar.addEventListener('click', mostrarResultado);
botonCopiar.addEventListener('click', copiar);

function desencriptar() {
    let cadenaBinario = document.getElementById('txtaBinario').value;
    let resultado = '';
    let estado = 0; // 0 = error, 1 = vacío/nulo, 2 = no es binario, 3 = cero, 4 = todo bien
    
    if (cadenaBinario.length == 0) {
        resultado = 'error:cadenaVacia';
        estado = 1;
    } else {
        let arrayBinarios = cadenaBinario.split(' ');
        for (let i = 0; i < arrayBinarios.length; i++) {
            if (BinarioDecimal(arrayBinarios[i]) == 'error:noBinario') {
                // console.log('NO SE INGRESARON BINARIOS');
                resultado += '';
                estado = 2;
            } else if (BinarioDecimal(arrayBinarios[i]) == 'error:valorCero') {
                // console.log('SE INGRESÓ UN 0');
                resultado += '';
                estado = 3;
            } else {
                // console.log('TODO BIEN');
                resultado += String.fromCharCode(BinarioDecimal(arrayBinarios[i]));
                estado = 4;
            }
        }
    }
    // console.log(resultado);
    // console.log('estado = ' + estado);
    return [resultado, estado];
}

function BinarioDecimal (binario) {
    let decimal = null;
    /* if (binario.constructor != String){
        return "Error";
    } */
    binario = binario.replace(/[^01]/gi, '');
    decimal = Number.parseInt(binario, 2);

    if (isNaN(decimal)) {
        // console.log('el valor ingresado no es un número binario');
        return 'error:noBinario';
    } else if (decimal == 0) {
        // console.log('el valor ingresado es 0');
        return 'error:valorCero';
    } else {
        // console.log(decimal);
        return decimal;
    }
}

function mostrarResultado () {
    let textArea = document.getElementById('txtaResultado');
    let [resultado, estado] = desencriptar();
    // 0 = error, 1 = vacío/nulo, 2 = no es binario, 3 = cero, 4 = todo bien
    if (estado == 0) {
        textArea.value = '';
        resultado = '[Error]';
        botonCopiar.disabled = true;
        Swal.fire({
            title: "Error",
            icon: 'error',
            confirmButtonColor: '#ef233c',
            confirmButtonText: 'Aceptar'
        })
    } else if (estado == 1) {
        textArea.value = '';
        resultado = '[Cadena vacía]';
        botonCopiar.disabled = true;
        Swal.fire({
            title: "No se ingresó ningún valor",
            icon: 'warning',
            confirmButtonColor: '#f26419',
            confirmButtonText: 'Aceptar'
        })
    } else if (estado == 2) {
        textArea.value = '';
        resultado = '[No binario]';
        botonCopiar.disabled = true;
        Swal.fire({
            title: "No es un valor binario",
            icon: 'warning',
            confirmButtonColor: '#023e8a',
            confirmButtonText: 'Aceptar'
        })
    } else if (estado == 3) {
        textArea.value = '';
        resultado = '[Valor cero]';
        botonCopiar.disabled = true;
        Swal.fire({
            title: "El valor ingresado es 0",
            icon: 'warning',
            confirmButtonColor: '#007f5f',
            confirmButtonText: 'Aceptar'
        })
    } else {
        textArea.value = resultado;
        botonCopiar.disabled = false;
        /* textArea.innerHTML = resultado;
        textArea.disabled = true;
        botonDesencriptar.disabled = true;
        botonLimpiar.disabled = false; */
    }
    console.log('Estado = ' + estado + ' / ' + 'Resultado = ' + resultado);
}

// Copiar el resultado al portapapeles
function copiar() {
    var contenido = document.getElementById('txtaResultado');
    contenido.select();
    document.execCommand('copy');
    Swal.fire({
        title: 'Copiado al portapapeles',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
    })
}

/* function limpiar() {
    botonDesencriptar.disabled = false;
    botonLimpiar.disabled = true;
    textArea.disabled = false;
    textArea.value = '';
    seccionResultado.innerHTML = '';
} */
