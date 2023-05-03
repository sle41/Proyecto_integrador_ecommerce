// Seleccionar la imagen y el formulario
const miImagen = document.getElementById("usuarios");
const miFormulario = document.getElementById("mi-formulario");

// Agregar un evento de clic a la imagen
miImagen.addEventListener("click", function() {

  //!-- PREGUNTAR
  // Mostrar el formulario si está oculto, o ocultarlo si está visible 
    console.log("login funcionando");
    if (miFormulario.style.display === "none") {
    miFormulario.style.display = "block";
    } else {
    miFormulario.style.display = "none";
    }
}); 

function login() {
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

if (username === 'usuario' && password === '123') {
    alert('Bienvenido usuario');


    console.log("ingreso usuario");

  // redirigir a la página del administrador 1
} else if (username === 'adminp' && password === '123') {
    alert('Bienvenido admin productos');
    window.open('/pages/admin/admin_products.html');
  // redirigir a la página del administrador 2
} else if (username === 'adminu' && password === '123') {
    alert('Bienvenido admin usuarios');
    window.open('/pages/admin/admin_users.html');
  // Error - contraeña incorrecto
} else {
    alert('Nombre de usuario o contraseña incorrectos');
}
}


function nuevousuario() {

    window.open('/pages/register/register.html');

}