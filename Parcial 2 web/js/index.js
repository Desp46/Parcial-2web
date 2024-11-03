let a = 1;
let tabla = document.getElementById("dos");
let marco = document.getElementById("encontrado");
let entrada = document.getElementById("fecha");
let boton = document.getElementById("desactivado");
let detalles = document.getElementById("detalles");
let imagen = document.getElementById("imagenr");
let cont1 = document.getElementById("id");
let cont2 = document.getElementById("martian");
let cont3 = document.getElementById("last");

let url1 = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=";
let url2 = "&api_key=mpeKrV5R5juzOWqTi4iJ0jzg04lxsdK2evCh6z3S&page="




function insertar_datos(id,rover,camara,img,sol){

    
   
    let tr = document.createElement("tr");

    let ids = document.createElement("td");
    ids.textContent = id;
    tr.appendChild(ids);

    let nombre = document.createElement("td");
    nombre.textContent = rover;
    tr.appendChild(nombre);

    let tipo = document.createElement("td");
    tipo.textContent = camara;
    tr.appendChild(tipo);

    let boton = document.createElement("button");
    boton.textContent = "More";
    boton.id = "tipo1";
    boton.addEventListener("click", () => {details(img, sol, id);});
    let espacio = document.createElement("td");
    espacio.appendChild(boton);
    tr.appendChild(espacio);


    tabla.appendChild(tr);
}

function cargar_datos() {
    tabla.innerText = "";
    let url = url1 + entrada.value + url2 + a;

    fetch(url)
        .then(response => {
            return response.json(); 
        })
        .then(data => {
            if (data.photos && data.photos.length > 0) {
                data.photos.forEach(photo => {
                    
                    let id = photo.id;
                    let rover = photo.rover.name;
                    let camara = photo.camera.name;
                    let imgUrl = photo.img_src;
                    let sol = photo.sol;

                    insertar_datos(id, rover, camara, imgUrl,sol);
                });
            } else {
                console.log('No se encontraron fotos.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos de la API:', error);
        });
}

function siguiente(){
    a++;
    tabla.innerText = "";
    cargar_datos();

    if(a > 1){
        boton.disabled = false;
    } 

    
}

function anterior(){

    if(a==1){
        boton.disabled = true;

    }else{
        a--;
        tabla.innerText = "";
        cargar_datos();
    }

}


function details(url,sol,id){
    detalles.textContent = "";
    imagen.img_src = "";
    cont1.textContent = "";
    cont2.textContent = "";
    cont3.textContent = "";

    fecha = entrada.value;

    detalles.textContent = "Photo details";
    imagen.src = url;
    cont1.textContent = "Id:" + id;
    cont2.textContent = "Martian sol: "+ sol;
    cont3.textContent = "Date: "  + fecha;

}




window.onload = function() {
    cargar_datos();
}