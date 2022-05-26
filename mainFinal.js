
// Creo la clase Vehículos para incorporar y con el constructor elijo  los parámetros para definir la clase
class Vehiculo{
    constructor (tipo, precio, cantidad, impuesto, imagen){
        this.tipo = tipo;
        this.precio = parseFloat(precio);
        this.cantidad = cantidad;
        this.impuesto = impuesto;
        this.imagen = imagen;
    
    }
}

//Creando ALIAS

const{
    tipo: tipo,
    precio: precio,
    cantidad: cantidad,
    impuesto: impuesto,
    imagen: imagen,
}=Vehiculo

// Creo el Array de vehículos vacío para luego por medio del método push agregarle los objetos a este nuevo Array.

const vehiculos = []

//Con el metodo push agrego los vehículos de mi array.

const vehiculo1= vehiculos.push(new Vehiculo ("auto", 200000, 1, 10, "imagenes/nissan.png"));
const vehiculo2= vehiculos.push(new Vehiculo ("moto", 15000, 2, 5, "imagenes/moto.png"));
const vehiculo3= vehiculos.push(new Vehiculo ("avion", 1000000, 2, 15,"imagenes/avion.png"));
const vehiculo4= vehiculos.push(new Vehiculo ("lancha", 302000, 3, 20, "imagenes/lancha.png"));
const vehiculo5= vehiculos.push(new Vehiculo("camion", 400000, 3, 50, "imagenes/camion.png"));
const vehiculo6= vehiculos.push(new Vehiculo("cuatriciclo", 20000, 1, 80,"imagenes/cuatriciclo.png"));
const vehiculo7= vehiculos.push(new Vehiculo("anfibio", 50000, 1, 36, "imagenes/anfibio.png"));

//desestructuro el array y genero un nuevo array con los ultimos 4 elemntos los muestro a traves de un console log.
//metodo spread

//const [posicion1, posicion2, posicion3,...restoDeVehiculos]= vehiculos;
//console.log (posicion1, posicion2, posicion3, restoDeVehiculos);



//Limpio  el local Storage
localStorage.clear();

// REalizo una lista de vehículos con una función para agregar vehiculos mediante javascript al DOM

    function agregarVehiculoAHTML (vehiculo) {

//Uso operadores avanzandos, en este caso operador lógico de AND para poder simplificar el if que está mas abajo
        
    document.getElementById("list") && document.getElementById("list").remove();


        let ul = document.createElement("ul");

// Le doy el atributo ID= "list", a la lista para después poder llamarla y borrar la información de html anterior 

        ul.setAttribute("id","list");

        let li1 = document.createElement("li");
        li1.innerText = `El vehiculo que usted seleccionó ${vehiculo.tipo}`;
    
        let li2 = document.createElement("li");
        li2.innerText = `El precio es ${vehiculo.precio}`;
    
        let li3 = document.createElement("li");
        li3.innerText = `La cantidad es ${vehiculo.cantidad}`;

        let li4 = document.createElement("li");
        li4.innerText = `El impuesto es ${vehiculo.impuesto} %`;

            ul.append(li1, li2, li3, li4);
    
        contenedor.append(ul);
    }

//Obtengo el elemento del contenedor para poder crear la lista y se visualice en el HTML
 let contenedor= document.getElementById ("contenedor");

//Obtengo el elemento del select para poder comenzar a operar con el mismo
let select= document.getElementById("select-vehiculo");

//se crea una opción nula donde podamos empezar a elegir los vehículos

let opcionNula= document.createElement("option");
opcionNula.value= "";
opcionNula.innerText= "Seleccionar Vehículo";
select.append(opcionNula);


//Recorro el array de vehiculos

vehiculos.forEach((vehiculo) => {

    //creamos la opcion del select
    let option= document.createElement("option");
    option.value= vehiculo.precio;
    option.innerText= vehiculo.tipo;
    
    //agregamos la opcion al select
    select.append(option);

});

//Creo el botón "boton1"

let boton= document.getElementById("boton1");

// Le creo un evento "click", para que cada vez que se oprima, se imprima la información seleccionada
//en el DOM, le digo que si encuentra algo en el select me agregue el vehículo seleccionado al DOM.

boton.addEventListener("click", (e) => {
   const valueSelect= select.value;
  
   if(valueSelect != "" ){
       const vehiculoEncontrado= vehiculos.find ((vehiculo) =>{
           return vehiculo.precio == valueSelect;   
       });

       // Utilizo la librería sweetalert para poder mostrar a través de imágenes los vehículos seleccionados
       
           Swal.fire({
            title: 'Felicitaciones',
            // timer: 4000,
            text: 'Usted ha seleccionado un excelente vehículo.',
            imageUrl: vehiculoEncontrado.imagen,
            imageWidth: 350,
            imageHeight: 200,
            imageAlt: 'Custom image',
            
      }); 

       agregarVehiculoAHTML(vehiculoEncontrado);

//Seteo el localstorage para que sea seleccionado convierto a JSON el ARRAY

        localStorage.setItem("vehiculos", JSON.stringify 
           (vehiculos));
                      
           const vehiculosJSON= localStorage.getItem ("vehiculos");
           
//Parseo el JSON al nuevo array para que más adelante me muestre específicamente el objeto individual
           const vehiculosArray= JSON.parse(vehiculosJSON);
           
 //En el nuevo array elijo mediante el metodo filter el en el array de vehiculos para que me encuentre
 //el objeto seleccionado en el select y finalmente seteo el nuevo array con el elemento selecionado.
 
           const nuevoArray = vehiculosArray.filter ( (vehiculos) => {
               return  vehiculos.precio==valueSelect;
           });
           localStorage.setItem("vehiculos",JSON.stringify(nuevoArray));
    } 
  
});
// utilización de Fetch y archivo JSON
function agregarMarcaAside () {
    
// let Data=[]

// En el Json incorporo imagenes y detalles de los sponsor que voy a imprimir en el aside de la página
// y los traigo con fetch

fetch("/sponsor.json").then (
    (Response) => {
        return Response.json();
    }). then ((data) =>{
        
        imprimirMarcasEnAside (data) 
    });
   
}
agregarMarcaAside();

//creo la const document así puedo llamar directamente d 
const d=document

// recorro con el for each y le digo que por cada uno cree el elemento tanto div como imag y los imprima con el nombre
// de la marca elegida y la imagen que tengo en una carpeta local

const imprimirMarcasEnAside= (data) => {
    const aside=  d.querySelector ("aside");
    data.forEach(element => {
        const div= d.createElement("div");
        const imagen= d.createElement("img");
        imagen.setAttribute("id","imagen");
        imagen.setAttribute("src", element._imagen);
        const titulo= d.createElement("h3");
        titulo.innerHTML= element.nombre;
        div.appendChild(imagen);
        div.appendChild(titulo);
        aside.appendChild (div);
        
    });
}

//creo un nuevo párrafo 

const imprimirParrafo= () =>{
    let div2= document.getElementById("div2");
    let p1= document.createElement ("p");
    let p1Texto= document.createTextNode("Bienvenidos al mejor sitio de vehiculos donde usted podrá encontrar cualquier tipo de transporte que se ajuste a su necesidad");
    p1.appendChild (p1Texto);
    div2.appendChild (p1);
}

imprimirParrafo ();




