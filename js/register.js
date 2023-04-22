//1-Obtener formulario y almacenarlo en una variable deJS
const registerForm = document.querySelector('#registerForm');
    //b) obtener botón de submit
const registerBtn = document.getElementById('registerSubmit');
//2-Vamos a escuchar el evento directamente en JS
registerForm.addEventListener('submit', (event) => {

    console.log(`Submit event`)

    //a) preventDefault
        event.preventDefault();
    //b) Tomar los datos y armar el objeto usuario
        const el = event.target.elements;

    //d) Verificar que los datos ingresados de password y password2 son exactamente igual
        if(el.password1.value!==el.password2.value) {
            console.warn('El password no coinciden');
            return;
        }


    //c) Verificar si hay en el localStorage algun usuario guardado ya con ese email
    
        //-------------------1- Obtener los usuarios guardados en el localStorage
        // !No se me guarda en el localStorage, revisar.
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        const userExist = checkIfUserExist(users, el.mail.value)

        //existe: retorno y muestro un alert
        if(userExist){
            alert(`El usuario ya se encuentra registrado`, 'error')
            return;
        }
    
        //no existe: sigo con mi sintaxis normalmente.
        const user = {
            fullName: el.fullName.value,
            age: el.age.value,
            mail: el.mail.value,
            password1: el.password1.value,
            gender: el.gender.value
        }


            //existe: retorno y muestro un alert
            //no existe: sigo con mi sintaxis normalmente.


    //e- Insertar en mi Array de usuarios el nuevo user (Lista de usuarios)
    users.push(user)

    //e) Guardarlo en el localStorage
        localStorage.setItem('users', JSON.stringify (users) )//users ahora tiene un usuario más
    //f) Limpiamos el formulario, o mismo podemos llevar al usuarioa la pagina de login
        //a- Resetear el formulario
            //registerForm.resset();

    showAlert('El usuario se registra correctamente', 'warning');
    return;

        
});

function checkIfUserExist(users, emailToSearch) {
                    //** 3 VERSIONES. */

        //-------------------2- Recorrer el array con un forEach

        // *=======Solucion 3_
        const indexOfUser = users.findIndex(usuario => {

            if(usuario.mail === emailToSearch) {
                
                //Solamente trabaja dentro del findIndex
                return true
            }

            if(indexOfUser >= 0) {
                console.warn(`El usuario ya existe findIndex`)
                
                //! retorno de mi función
                return;

            }

            return false
        })

        // !=======Solucion 1_ -
        // users.forEach(usr => {
            
        //     if(usr.email === el.mail.value) {
        //        userEmailExist = true;
        //     }

        //     if(userEmailExist) {
        //         console.warn(`El usuario ya existe`);return            
        //     }
        // })

        // TODO=======Solucion 2_
        // const userExist = users.find(user => {
        //     if (user.mail === el.mail.value) {
        //         return true;
        //     }

        //     return false; //no es necesario ya que si no lo defino, se hace un return undefined (falsy)
        // })

        // if(userExist) {
        //     console.warn(`El usuario ya existe`);
        //     return;
        // }

        
}



function showAlert(text, type = 'sucess') {
    // * VAMOS A HACER NUESTRO ALERT CUSTOM
    //!--Revisar no me estaria funcionando :(
    // Crea unm elemento HTML Node
    
    const alertDialog = document.createElement('div');
    // Añade una clase
    alertDialog.classList.add('alert-dialog');
    alertDialog.innerText = text;
    document.body.appendChild(alertDialog);
    
    if(type === 'error') {
        alertDialog.style.backgroundColor = 'red';
    }
    if(type === 'warning') {
        alertDialog.style.backgroundColor =  'orangered'
    }
    // Para demorar su aparición luego de haberlo creado lineas anterior con document createElement
    setTimeout(() => alertDialog.classList.add('show'), 10)

    setTimeout(() => {
        alertDialog.classList.remove('show');

        setTimeout(() => {
            alertDialog.remove();
        }, 1000)
        // window.location.href = '/pages/login/login.html'     
    }, 3000);

}


