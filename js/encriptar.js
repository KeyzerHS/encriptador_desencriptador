let botonEncriptar = document.getElementById('btnEncriptar');
let botonCopiar = document.getElementById('btnCopiar');

botonEncriptar.addEventListener('click', MostrarResultado);
botonCopiar.addEventListener('click', copiar);

function encriptar() {
    let texto = document.getElementById('textEncriptar').value;
    let resultado = '';
    let estado = 0; // 0 = error, 1 = vacío/nulo, 2 = todo bien
    
    if (texto.length == 0) {
        resultado = 'error:cadenaVacia';
        estado = 1;
    } else {
        let arrayTexto = texto.split('');
        for (let i = 0; i < arrayTexto.length; i++){
            resultado += (arrayTexto[i].charCodeAt(0)).toString(2) + ' ';
            estado = 2;
        }
    }
    // console.log(resultado + ' / ' + estado);
    return [estado, resultado];
}

function MostrarResultado() {
    let txtAreaResultado = document.getElementById("TxtResultado");
    let [estado, resultado] = encriptar();
    // 0 = error, 1 = vacío/nulo, 2 = todo bien
    if (estado == 0) {
        txtAreaResultado.value = '';
        resultado = '[Error]';
        botonCopiar.disabled = true;
        Swal.fire({
            title: "Error",
            icon: 'error',
            confirmButtonColor: '#ef233c',
            confirmButtonText: 'Aceptar'
        })
    } else if (estado == 1) {
        txtAreaResultado.value = '';
        resultado = '[Cadena vacía]';
        botonCopiar.disabled = true;
        Swal.fire({
            title: "No se ingresó ningún valor",
            icon: 'warning',
            confirmButtonColor: '#023e8a',
            confirmButtonText: 'Aceptar'
        })
    } else {
        let resultadoFinal = resultado.substring(0, resultado.length - 1);
        txtAreaResultado.value = resultadoFinal;
        botonCopiar.disabled = false;
    }
    console.log('Estado = ' + estado + ' / ' + 'Resultado = ' + resultado);
}

// Copiar el resultado al portapapeles
function copiar() {
    var contenido = document.getElementById('TxtResultado');
    contenido.select();
    document.execCommand('copy');
    Swal.fire({
        title: 'Copiado al portapapeles',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
    })
}
