//Variables globales

const d = document;

let nameInput = d.querySelector("#productos-select")
let priceInput =d.querySelector("#precio-pro")
let stockInput = d.querySelector("#stock-pro")
let descripcionInput = d.querySelector("#des-pro")
let imagen = d.querySelector("#imagen-pro")
let btnCreate = d.querySelector(".btn-create")

/////// AGregar un evento al boton 

btnCreate.addEventListener("click", ()=>{
    //alert("producto: " + nameInput.value)
    let dataProduct = getDataProduct();
    sendDataProduct(dataProduct);
})

//Obtener datos formulario
let getDataProduct = () =>{
    //Validar formulario
    let product;
    if(nameInput.value && priceInput.value && descripcionInput.value && imagen.src){
        product = {
            nombre: nameInput.value,
            descripcion: descripcionInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            imagen: imagen.src
        }
        priceInput.value= ""
        descripcionInput.value= ""
        stockInput.value = ""
        imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg"
        console.log(product)
    }else{
        alert("Todos los campos son obligatorios")
    }return product 
}
//Funcion para recibir los datos y realizar la peticion

let sendDataProduct = async (data)=>{
    let url = "http://localhost:3000/api/productos";
    try{
        let respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    });

        if(respuesta.status === 406){
        alert("Los datos enviados no son admitidos")
        }else{
            let mensaje = await respuesta.json();
            alert(mensaje.message)
            location.href = "./listado-pro.html"
            
        }        
    }   catch(error){
    console.log(error)
        }
}   