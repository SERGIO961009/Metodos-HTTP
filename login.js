const d = document;
userInput = d.querySelector("#usuarioForm");
passInput = d.querySelector("#contraForm")
btnLogin = d.querySelector(".btnLogin")

btnLogin.addEventListener("click", () => {
    const data = getData();
    if (data) {
        sendData(data);
    }
});


//Funcion para validad formulario y obteber datos del formulario 

let getData = () =>{
    //Validar formulario
    let user;
    if(userInput.value && passInput.value){
        user = {
            usuario: userInput.value,
            contrasena: passInput.value
        }
        userInput.value= ""
        passInput.value= ""
    }else{
        alert("El usuario y la contraseña es obligatorio")
        return null
    }
    //console.log(user);
    return user;
}

//Funcion para recibir los datos y realizar la peticion

let sendData = async (data)=>{
    let url = "http://localhost:3000/api/login";
    try{
        let respuesta = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    });

        if(respuesta.status === 401){
        alert("El usuario o la contraseña es incorrecta")
        }else{
            let userLogin = await respuesta.json();
            //Console.ddd
            alert(`Bienvenido: ${userLogin.usuario}`)
            //Guardar datos en localstorage
            localStorage.setItem("userLogin",JSON.stringify(userLogin))
            location.href  = "index.html" 
        }        
    }   catch(error){
    console.log(error)
        }
}
    


