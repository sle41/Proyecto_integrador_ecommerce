
if (!localStorage.getItem('lsusuario')) {
    console.log("local Storage inexistente, no realizado hasta el momento");
    // lsnull();
    const test= [
        {
            nombre: 'test nombre',
            apellido: 'test apellido',
            mail: 'test@test',
            
        },];
       localStorage.setItem('lsusuario', JSON.stringify([test]))

 }else{console.log("local Storage ok")

}   


const n = JSON.parse(localStorage.getItem('lsusuario')).length
const Products =JSON.parse(localStorage.getItem('lsusuario'))[n-1];

//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');


//2- Definir una función para iterar el array
function renderizarTabla() {
    tableBody.innerHTML = '';
    //3- Iterar el array para acceder a cada producto
    //esto lo usamos para hacer la tabla//
    Products.forEach((producto, index) => { 

    
       // '/assets/images/no-product.png';
        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
       const tableRow = `<tr class="product" id="pepe">
                            <td class="product__name">${producto.nombre}</td>
                            <td class="product__desc">${producto.apellido}</td>
                            <td class="product__desc">${producto.mail}</td>
                            
                            <td class="product__actions">
                                <button class="product__action-btn" onclick="deleteProduct(${index})">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                           
                                <button class="product__action-btn btn-edit">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>
                                <button class="product__action-btn btn-favorite">
                                    <i class="fa-regular fa-star"></i>
                                </button>
                            
                            </td>
                        </tr>`
     

        

       tableBody.innerHTML += tableRow   ;   
	 
		

    } )
    ;
    
}

renderizarTabla();

function addProduct(evt) {
    evt.preventDefault();
    console.dir(evt.target);
    const elements = evt.target.elements;

    const newProduct = {
        nombre: elements.nombre.value,
        apellido: elements.apellido.value,
        mail: elements.mail.value,
        
        };
	
    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);
    newProductFormData.price = +newProductFormData.price
  
    


    console.log(newProductFormData);
    Products.push(newProductFormData);
    locals();
    renderizarTabla();
    evt.target.reset();
    elements.nombre.focus();
  }





function deleteProduct(indice) {
    Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Se borrará el usuario ',//+Products,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        Products.splice(indice, 1);
        locals();
        renderizarTabla();
        Swal.fire(
          'Borrado',
          'El producto ha sido borrado',
          'success'
        )
      }
    })
  }
  



function locals(){
  
        // Si no existe un producto con el mismo nombre, agregar el nuevo producto al array y almacenar el array actualizado en el localStorage
       

        filtro('nombre');
        // console.log(resultado);
        // let resultado = filtro('nombre').result;
        // console.log(resultado);
        // console.log(resultado);
      
        //     if (resultado.length >0) {
        //       // Mostrar un mensaje de error si ya existe un producto con el mismo nombre
        //       Swal.fire({
        //         icon: "error",
        //         title: "Error",
        //         text: "Ya existe un producto con el mismo nombre",
        //       });
        //     } else {


    var datos_existentes = JSON.parse(localStorage.getItem('lsusuario'));
    if (datos_existentes === null)  {datos_existentes=[] };
    datos_existentes.push(Products);    
    localStorage.setItem('lsusuario', JSON.stringify(datos_existentes));
    console.log("local storage recibio actualizacion");
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Carga completa',
    //     text: 'el usuario se ha cargado correctamente.'
    //   });


           
      

}







function filtro(filtrar){
    
    const nom_p2 = document.getElementById(filtrar);
    if(nom_p2.value != "")//{nom_p2.value=""};
    {nom_p2.value = nom_p2.value[0].toUpperCase()+ nom_p2.value.toLowerCase().substring(1);}
    
    
    var cuenta_ingreso= Object.values(JSON.parse(localStorage.lsusuario)).length;
    console.log("cantidad de actividad en LS: "+cuenta_ingreso);
    var x=cuenta_ingreso - 1;//descuento 1 para el array que empieza en 0 
    var cuenta_objetos= Object.values(JSON.parse(localStorage.lsusuario)[x]);
    const result = cuenta_objetos.filter(word => word.nombre == nom_p2.value);
    console.log(result);
    console.log(result.length);
    console.log(nom_p2.value);
    
    // if(nom_p2.value === ""){Swal.fire("ingrese nombre");}
    // else 
    
    Swal.fire("se encontraron "+result.length+" coincidencias");
    return { resultado: result.length };
   
}



//!------------------------------------

function nom_propio() {
    const nom_p = document.getElementById("nombre");
    nom_p.value = nom_p.value[0].toUpperCase()+ nom_p.value.toLowerCase().substring(1);   
  }

  function ape_propio() {
    const ape_p = document.getElementById("apellido");
    ape_p.value = ape_p.value[0].toUpperCase()+ ape_p.value.toLowerCase().substring(1);   
  }

  function validarEmail() {
    const correo = document.getElementById('mail').value;
    if (correo.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El correo electrónico es requerido'
      });
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingrese un correo electrónico válido'
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Correo electrónico válido'
      });
    }
  }

  