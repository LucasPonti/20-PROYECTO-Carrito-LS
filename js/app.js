// variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curso presioonando agregar
    listaCursos.addEventListener('click', agregarCurso);
    // elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    // muestra los cursos del local Storage
    document.addEventListener('DOMContentLoaded',() => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoHTML();
    });
    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito = [];//reseteamos el html
        limpiarHTML();
    });
}

// funciones
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// elimina un curso de la lista de carrito
function eliminarCurso(e){
    console.log(e.target.classList);
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // elimina del arreglo articuloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        console.log(articulosCarrito);
        carritoHTML();//iterar sobre el carrito y mostrar su HTML
    }
}

// lee el contenido del html que le dimos clic y extrae la infomracion del curso
function leerDatosCurso(curso){
    console.log(curso);

    // crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id){
                curso.cantidad++; //retorna objeto actualizado
                return curso;
            }else{
                return curso; //retorna los objetos que no son dupkicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        // agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    
    
    console.log(articulosCarrito);
    carritoHTML();
}


// muestra el carrito de compras en el HTML
function carritoHTML(){
    // limpiar el HTML
    limpiarHTML();
    // recorre el carrito y genera el html
    articulosCarrito.forEach( curso  => {
        const {imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    // sincronizar con storage
    sincronizarStorage();
};

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// elimina los cursos del table body
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = '';


    //Forma que es mejor utilizar y mas rapida 
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}