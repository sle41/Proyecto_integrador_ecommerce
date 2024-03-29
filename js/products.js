if (!localStorage.getItem('lsproducto')) {
    console.log("local Storage inexistente, no realizado hasta el momento");
    lsnull();
    const test= [
        {   
            description: 'Muestra tu amor por Star Wars con nuestro soporte de exhibición TIE fighter, un diseño preciso y detallado impreso en 3D que dará vida a tu colección.',
            fecha: '4/5/2023',
            image: '/assets/images/cards/img1.jpg',
            price: 2.500,
            producto: 'Soporte de exhibición TIE fighter',
            
            
        },
        {   
            description: 'Lleva la emoción del espacio a tu hogar con nuestro "Transbordador espacial Rocket booster", una pieza realista e impresionante impresa en 3D que hará volar tu imaginación.',
            fecha: '1/5/2023',
            image: '/assets/images/cards/img2.jpg',
            price: 10.200,
            producto: 'Transbordador espacial Rocket booster',
            
            
        },
        {   
            description: '¡Haz que tu colección de Warcraft cobre vida con nuestro Caza TIE de Terrallende! Un diseño preciso y detallado que hará que cualquier fanático se emocione.',
            fecha: '25/4/2023',
            image: '/assets/images/cards/img3.jpg',
            price: 12.000,
            producto: 'Caza TIE de Terrallende',
            
            
        },
        {   
            description: 'Con nuestro modelo 3D X Wing, podrás admirar de cerca la nave espacial más emblemática de Star Wars. Detallado y preciso, es perfecto para los fans y coleccionistas más exigentes.',
            fecha: '12/4/2023',
            image: '/assets/images/cards/img4.jpeg',
            price: 22.500,
            producto: 'X wing',
            
            
        },];
        localStorage.setItem('lsproducto', JSON.stringify([test]))

 }else{console.log("local Storage ok")

}   




const n = JSON.parse(localStorage.getItem('lsproducto')).length
const Products =JSON.parse(localStorage.getItem('lsproducto'))[n-1];

//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');


//2- Definir una función para iterar el array
function renderizarTabla() {
    tableBody.innerHTML = '';

    //3- Iterar el array para acceder a cada producto
    //esto lo usamos para hacer la tabla//
    Products.forEach((producto, index) => { 

    
        let imageSrc = producto.image ? producto.image : '/assets/images/no-product.png'; 

        //4- Introducir dentro del tbody una fila por producto con sus respectivas celdas
       const tableRow = `<tr class="product">
                            <td class="product__img-cell"><img class="product__img" src="${imageSrc}" alt="${producto.producto}"></td>
                            <td class="product__name">${producto.producto}</td>
                            <td class="product__desc">${producto.description}</td>
                            <td class="product__desc">${producto.fecha}</td>
                            <td class="product__price">$ ${producto.price}</td>
                            
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
        image: elements.image.value,
        producto: elements.producto.value,
        description: elements.description.value,
        price: elements.price.value,
        fecha: elements.fecha.value,
        };
	
    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);
    newProductFormData.price = +newProductFormData.price
  
    console.log(newProductFormData);
    Products.push(newProductFormData);
    locals();
    renderizarTabla();
    evt.target.reset();
    elements.producto.focus();

}



function deleteProduct(indice) {
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Se borrará el producto ',//+Products,
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
    var datos_existentes = JSON.parse(localStorage.getItem('lsproducto'));
    if (datos_existentes === null)  {datos_existentes=[] };
    datos_existentes.push(Products);    
    localStorage.setItem('lsproducto', JSON.stringify(datos_existentes));
    console.log("local storage recibio actualizacion");
 
}


//!--- BUSCADOR

function filtro(){
        
    const nom_p2 = document.getElementById("buscar");
    if(nom_p2.value != "")//{nom_p2.value=""};
    {nom_p2.value = nom_p2.value[0].toUpperCase()+ nom_p2.value.toLowerCase().substring(1);}
    
    
    var cuenta_ingreso= Object.values(JSON.parse(localStorage.lsproducto)).length;
    console.log("cantidad de actividad en LS: "+cuenta_ingreso);
    var x=cuenta_ingreso - 1;//descuento 1 para el array que empieza en 0 
    var cuenta_objetos= Object.values(JSON.parse(localStorage.lsproducto)[x]);
    const result = cuenta_objetos.filter(word => word.producto == nom_p2.value);
    console.log(result);
    console.log(result.length);
    console.log(nom_p2.value);
    
    
    document.getElementById("resultados").innerHTML = "Se encontraron " + result.length + " resultados.";
    
}

function nom_propio() {
    const nom_p = document.getElementById("producto");
    nom_p.value = nom_p.value[0].toUpperCase()+ nom_p.value.toLowerCase().substring(1);   
  }

  function random_(){
    var num_random_ = Math.random().toString().slice(2,11);
    document.getElementById("random").value = num_random_;
    
    
   
}

function eliminoLS() {
     if (document.getElementById("random").value === document.getElementById("valida").value)
     {   localStorage.removeItem("transito");
         console.log("local storage borrado");
         Swal.fire({  icon: 'error',  title: 'Se borro local storage'});}
    location.reload()
    
}


//!-----------
