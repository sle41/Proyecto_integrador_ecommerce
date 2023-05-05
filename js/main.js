//  

const Products =JSON.parse(localStorage.getItem('lsproducto'));

//1- Obtener el body de la tabla para poder modificarlo desde JS
const tableBody = document.querySelector('#table-body');


//2- Definir una función para iterar el array
function renderizarTabla() {
    tableBody.innerHTML = '';


for (let i = Products.length -1 ; i < Products.length; i++) {

    console.log(`Elemento ${i}:`);

    for (let j = 0; j < Products[i].length; j++) {

    console.log(`  ${Products[i][j]}`);
    const producto =Products[i][j]

        let imageSrc = producto.image ? producto.image : '/assets/images/no-product.png';
        
        const CARD = ` 
        
                <article class="card">
                    <div class="card__header">
                        <img src="${imageSrc}" alt="${producto.name}"  class="card__img">
                    </div>
                    <div class="card__body">
                        <div class="card__title">
                            ${producto.producto}
                        </div>
                        <p class="card__description">
                            ${producto.description}
                        </p>
                        
                    </div>
                    <div class="card__fepre">
                        <div class="card__date">
                            ${producto.fecha}
                        </div>
                        <div class="card__price">
                            $${producto.price}
                        </div>
                    </div>
                    <div class="card__footer">
                        <div class="card__btn-container">
                            <a class="card__btn-det" href="#">
                                Detalles
                            </a>

                            <a class="card__btn-com" href="#">
                                COMPRAR
                            </a>
                        </div>
                    </div>
                </article> `

    //   tableBody.innerHTML += tableRow   ;   
	tableBody.innerHTML += CARD;

    }
    }
    

}

renderizarTabla();

function addProduct(evt) {
    

    evt.preventDefault();
    console.dir(evt.target);
    const elements = evt.target.elements; 

    
    const newProduct = {
        
        name: elements.name.value,
        description: elements.description.value,
        };

    const newFormData = new FormData(evt.target);
    const newProductFormData = Object.fromEntries(newFormData);
    
    console.log(newProductFormData);
    Products.push(newProductFormData);
    
    locals();
    renderizarTabla();
    evt.target.reset();
    elements.name.focus();
    


    };


	


function locals(){
    var datos_existentes = JSON.parse(localStorage.getItem('transito'));
     //var datos_existentes = localStorage.getItem('transito');
    //datos_existentes = datos_existentes === null ? [] : JSON.parse(datos_existentes);
    if (datos_existentes === null)  {datos_existentes=[] };
    datos_existentes.push(Products);    
    localStorage.setItem('transito', JSON.stringify(datos_existentes));
    console.log("local storage recibio actualizacion");
    cuenta();
}

		localStorage.setItem('test', JSON.stringify(Products));








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