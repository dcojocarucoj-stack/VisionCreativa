// Coger el formulario y los dos divs donde saldrán los mensajes
var formulario = document.getElementById("formularioContacto");
var divErrores = document.getElementById("errores");
var divExito = document.getElementById("mensajeExito");

// Esta función se ejecuta cuando se pulsa "Enviar"
function validar(evento) {
    // Evitar que el formulario se envíe de verdad
    evento.preventDefault();

    // Borrar los mensajes anteriores
    divErrores.innerHTML = "";
    divExito.innerHTML = "";

    // Coger los valores que ha escrito el usuario
    var nombre = document.getElementById("nombre").value;
    var apellidos = document.getElementById("apellidos").value;
    var edad = document.getElementById("edad").value;
    var telefono = document.getElementById("telefono").value;
    var cp = document.getElementById("cp").value;
    var email = document.getElementById("email").value;
    var nacimiento = document.getElementById("nacimiento").value;
    var mensaje = document.getElementById("mensaje").value;
    var privacidad = document.getElementById("privacidad").checked;

    // Mirar qué radio está marcado
    var radios = document.getElementsByName("tipo");
    var tipo = "";
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            tipo = radios[i].value;
        }
    }

    // guardar los errores
    var errores = "";

    // El email tiene que llevar @ y .
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        errores = errores + "El email debe contener @ y .<br>";
    }

    // El teléfono tiene que tener 9 dígitos
    if (telefono.length != 9 || isNaN(telefono)) {
        errores = errores + "El teléfono debe tener 9 dígitos.<br>";
    }

    // El código postal tiene que tener 5 dígitos
    if (cp.length != 5 || isNaN(cp)) {
        errores = errores + "El código postal debe tener 5 dígitos.<br>";
    }

    // El mensaje tiene que tener mínimo 20 caracteres
    if (mensaje.length < 20) {
        errores = errores + "El mensaje debe tener al menos 20 caracteres.<br>";
    }

    // Tiene que haber un tipo de mensaje marcado
    if (tipo == "") {
        errores = errores + "Debes elegir un tipo de mensaje.<br>";
    }

    // La casilla de protección de datos tiene que estar marcada
    if (privacidad == false) {
        errores = errores + "Debes aceptar la protección de datos.<br>";
    }

    // Si hay errores los enseña y paro aquí
    if (errores != "") {
        divErrores.innerHTML = errores;
        return;
    }

    // Si no hay errores, se calcula el tiempo de respuesta según el tipo
    var horas = 0;
    if (tipo == "duda") {
        horas = 24;
    } else if (tipo == "sugerencia") {
        horas = 72;
    } else if (tipo == "queja") {
        horas = 12;
    } else {
        horas = 48;
    }

    // Mirar qué día y qué hora es ahora
    var ahora = new Date();
    var dia = ahora.getDay();    // 0 = domingo, 6 = sábado
    var hora = ahora.getHours();

    if (dia == 0 || dia == 6) {
        // Fin de semana: 12 horas más
        horas = horas + 12;
    } else if (hora >= 18) {
        // Día laborable a partir de las 18:00: 8 horas más
        horas = horas + 8;
    }

    // Enseñar el resumen de los datos y el tiempo estimado
    divExito.innerHTML = `
         <h2>Revisa tus datos</h2> 
        <p>Nombre:${nombre} ${apellidos}</p> 
        <p>Edad: ${edad}</p>
        <p>Teléfono: ${telefono} </p> 
        <p>Código postal:${cp}</p> 
        <p>Email:${email} </p> 
        <p>Fecha de nacimiento:${nacimiento}  </p> 
        <p>Tipo de mensaje:${tipo}  </p> 
        <p>Mensaje:${mensaje}  </p> 
        <p>Tiempo estimado de respuesta: ${horas} horas</p>
    `;
}

// Cuando se envíe el formulario, se ejecuta la función validar
formulario.addEventListener("submit", validar);
