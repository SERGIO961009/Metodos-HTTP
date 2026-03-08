//Variables globals
let tablePro = document.querySelector("#table-pro");
let searchInput = document.querySelector("#search-input")

//Evento cuando cargue la pagina

document.addEventListener("DOMContentLoaded",()=>{
    //alert("Carga Completa ✅")
    getProducts();
})

//Funcion pata traer los productos
async function getProducts() {
    try {
        let url = "http://localhost:3000/api/productos";
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        //Validar respuesta del servidor
        if(respuesta.status == 204){
            console.log("No hay datos en la BD")
        }else{
            //Pasar los datos
            let datos = await respuesta.json();
            console.log("productos", datos)
            
            datos.forEach((pro) =>{
                let tablepro = document.querySelector("#table-pro")
                let fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${pro.id}</td>
                    <td>${pro.nombre}</td>
                    <td>${pro.descripcion}</td>
                    <td>${pro.precio}</td>
                    <td>${pro.stock}</td>
                    <td><img src= "${pro.imagen}" width="80px"></td>
                    <td>
                        <button id="btn-edit" onclick="editDataTable(${pro.id})" class="btn btn-warning">🖊️</button>
                        <button id="btn-delete" onclick="deleteDataTable(${pro.id})" class="btn btn-danger">✖️</button>
                    </td>
                `
                 //Agregar productos a la tabla
            tablepro.appendChild(fila);
            });
           
        }
    } catch (error) {
        console.log(error)
    }
}


//funcion para editar tabla
let editDataTable = (id)=>{

}
//Funcion para eliminar de la tabla
let deleteDataTable = async (id) => {
    let url = `http://localhost:3000/api/productos/${id}`;
    try {
        let respuesta = await fetch(url, {
            method: "DELETE"
        });
        if (respuesta.ok) {
            alert("Producto eliminado correctamente");
            // Recargar la tabla
            location.reload();
        } else {
            alert("No se pudo eliminar el producto");
        }
    } catch (error) {
        console.log(error);
    }
};