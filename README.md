# DATOS

Alexandra Xiomara Montaño Apolo

alexandra130255@gmail.com

# Hotel Reservation Challenge

## Descripción del Proyecto
Este proyecto proporciona una aplicación para encontrar el hotel más barato en función de la entrada del usuario, que incluye el tipo de cliente ((regular o con recompensas)) y las fechas de estadía. La aplicación compara las tarifas de tres hoteles y muestra el más económico.

## Estructura del Proyecto
    ````bash
    Proyecto_ReservaHoteles/
    │
    ├── desafio/: Contiene todo el código fuente de la aplicación. 
    │   │
    │   ├── src/
    │   │   └── app.js: Lógica principal para la funcionalidad de la aplicación.
    │   │
    │   │── test/
    │   │   └── app.test.js: Lógica para pruebas unitarias con el fin de garantizar la funcionalidad de la aplicación. Las pruebas se realizan utilizando **Jest**.
    │   │
    │   │── index.html: Página principal de la aplicación con la interfaz de usuario.
    │   │   
    │   └── styles.css: Estilos CSS básicos para el diseño y ejecución de la aplicación.
    │
    └── README.md: Instrucciones para instalar y ejecutar la aplicación.
    ````
        
## Requisitos
° Lenguaje: Javascript.
° Frameworks: Ninguno(CSS personalizado).
° Navegador: Compatible con cualquier navegador

## Suposiciones del Problema
° Los nombres de los días de la semana se derivan directamente del formato de fecha proporcionado.
° Los tipos de clientes siempre serán Regular o Rewards.
° No se contempla la validación de fechas pasadas o fuera de rango.

## Instalación
### Clona el repositorio
````bash
git clone https://github.com/tu-usuario/hotel-reservation-challenge.git
````
### Navega a la carpeta del proyecto
````bash
cd Proyecto_ReservaHoteles/desafio
````
### Abre `index.html` en un navegador para ejecutar la aplicación.

No se requiere configuración adicional ya que todo el código corre localmente en el navegador.

## Componentes
### Datos de los Hoteles
Están definidos en un array de objetos. Cada objeto representa un hotel y contiene la siguiente información:
````javascript
const hotels = [
    {
        name: "hotel",
        weekdayRates: { 
            regular: 110, rewards: 80
        },
        weekendRates: { 
            regular: 90, rewards: 80
        },
        rating: 3
    }
];
````
### Funciones Principales
° stringToDate(dateString)
    Convierte una cadena de fecha en un objeto Date. El formato esperado de la cadena es "16Mar2009(mon)".
° parseImput(input)
    Parsea la entrada del usuario y devuelve el tipo de cliente y las fechas en formato de objetos "Date".
° calculateCost(hotel, customerType, dates)
    Calcula el costo total de estadía en un hotel dado el tipo de cliente y las fechas. Devuelve el costo total.
° findCheapestHotel(input)
    Encuentra el hotel más barato basado en la entrada del usuario y devuelve el nombre del hotel más económico o con mayor calificación en caso de empate.
° showCheapestHotel()
    Muestra el nombre del hotel más barato en la interfaz del usuario.
    
## Uso
### Cargar el Archivo JavaScript
Asegúrate de que el archivo app.js esté cargado en tu archivo HTML.
### Interacción con la Aplicación
El usuario ingresa los datos en un campo de texto y presiona un botón para encontrar el hotel más barato. 
° Ejemplos de entrada válidos:
    Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)
    Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)
### Resultado
° La aplicación mostrará el hotel más barato basado en el tipo de cliente y las fechas ingresadas.
° En caso de empate en precios, el hotel con la calificación más alta será seleccionado.

## Diseño de la solución
La solución fue diseñada para ser simple y eficiente:
    ° Estructura de Datos: Los hoteles se almacenan en un array de objetos que contiene sus tarifas y calificaciones.
    ° Lógica de Cálculo: Se evalúan las tarifas según las fechas proporcionadas y se selecciona el hotel con el menor costo.
    ° Empate: En caso de que dos hoteles tengan el mismo costo, se selecciona el de mayor calificación.

## Pruebas
### Configura "Jest"
Asegúrate de que Jest esté instalado y configurado en tu proyecto. Si no lo tienes instalado, puedes hacerlo fácilmente utilizando npm:
````bash
npm init -y  #Inicializa un package.json si no lo tienes
npm install --save-dev jest
````
### Escribir Pruebas Unitarias:
Dentro de app.test.js, puedes escribir pruebas para verificar la funcionalidad de cada parte clave de tu aplicación.
### Ejecutar Pruebas
Una vez escritas las pruebas, puedes ejecutarlas utilizando npm:
````bash
npm test
````        
Esto ejecutará Jest y mostrará si las pruebas pasan o fallan.

## Autor
Creado por Alexandra Montaño Apolo como parte de un desafío técnico.
