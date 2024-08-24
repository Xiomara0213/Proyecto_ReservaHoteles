// Definir los Datos de los Hoteles
const hotels = [
    {
        name: "Lakewood",
        weekdayRates: { 
            regular: 110, rewards: 80
        },
        weekendRates: { 
            regular: 90, rewards: 80
        },
        rating: 3
    },
    {
        name: "Bridgewood",
        weekdayRates: { 
            regular: 160, rewards: 110
        },
        weekendRates: { 
            regular: 60, rewards: 50
        },
        rating: 4
    },
    {
        name: "Ridgewood",
        weekdayRates: { 
            regular: 220, rewards: 100
        },
        weekendRates: { 
            regular: 150, rewards: 40
        },
        rating: 5
    }
];

//Función para convertir la cadena de fecha a un objeto "Date"
function stringToDate(dateString) {
    // Verificar que la entrada es una cadena
    if (typeof dateString !== 'string') {
        console.error("dateString no es una cadena:", dateString);
        return null;
    }

    // Verifica que la cadena de fecha coincide con el formato esperado
    const match = dateString.match(/^(\d{2})([a-zA-Z]{3})(\d{4})\((\w{3})\)$/);
    if (!match) {
        console.error("Formato de cadena de fecha no válido:", dateString);
        return null;
    }

    //Desestructura los componentes: día, mes, y año
    const [, day, monthStr, year] = match;
    //Mapa para convertir los nombres de los meses a índices de meses
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    //Obtiene el número del mes y convierte el día y el año a enteros
    const month = monthMap[monthStr.slice(0,3)];
    const dayNumber = parseInt(day, 10);
    const yearNumber = parseInt(year, 10);

    // Verifica que los valores del mes, día, y año son números válidos
    if (isNaN(month) || isNaN(dayNumber) || isNaN(yearNumber)) {
        console.error("Datos de fecha no válidos:", { day, monthStr, year });
        return null;
    }
    return new Date(yearNumber, month, dayNumber);
}

// Parsear la Entrada del Usuario
export function parseInput(input) {
    // Valida que la entrada no sea nula o vacía y que sea de tipo cadena
    if (!input || typeof input !== 'string') {
        console.error('Entrada no válida');
        return { customerType: '', dates: [] };
    }
    // Divide la entrada en dos partes: el tipo de cliente y las fechas
    const parts = input.split(':').map(part => part.trim());
    if (parts.length !== 2) {
        console.error('Formato de entrada incorrecto');
        return { customerType: '', dates: [] };
    }
    //Desestructura las partes, divide la cadena de fechas en un array y convierte cada cadena en un objeto "Date"
    const [customerType, dateStringsPart] = parts;
    const dateStrings = dateStringsPart.split(',').map(part => part.trim());
    const dates = dateStrings.map(stringToDate);

    return { customerType, dates };
}

// Calcular el Costo de la Estadía
export function calculateCost(hotel, customerType, dates) {
    let totalCost = 0;
    // Normaliza el tipo de cliente
    customerType = customerType.toLowerCase();

    // Verifica que el tipo de cliente es válido
    if (customerType !== 'regular' && customerType !== 'rewards') {
        console.error("Tipo de cliente desconocido:", customerType);
        return 0;
    }
    // Itera sobre cada fecha para determinar si es fin de semana o día de semana
    dates.forEach(date => {
        const dayOfWeek = date.getDay(); 
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; //0 = domingo, 6 = sábado
        
        // Selecciona la tarifa según el tipo de cliente y el día de la semana
        let rate;
        if (customerType === 'regular') {
            rate = isWeekend ? hotel.weekendRates.regular : hotel.weekdayRates.regular;
        } else if (customerType === 'rewards') {
            rate = isWeekend ? hotel.weekendRates.rewards : hotel.weekdayRates.rewards;
        } else {
            console.error("Tipo de cliente desconocido:", customerType);
            return;
        }
        totalCost += rate;
    });
    return totalCost;
}

// Encuentra el Hotel Más Barato
export function findCheapestHotel(input) {
    const { customerType, dates } = parseInput(input);

    // Inicializa las variables para almacenar el hotel más barato y el costo mínimo encontrado
    let cheapestHotel = null;
    let minCost = Infinity; // Se establece en Infinity para asegurar que cualquier costo real sea menor que este valor inicial

    // Calcula el costo total para cada hotel
    hotels.forEach(hotel => {
        const cost = calculateCost(hotel, customerType, dates);

        // Actualiza el hotel más barato o mayor calificación en caso de empate
        if (cost < minCost || 
            (cost === minCost && hotel.rating > (cheapestHotel ? cheapestHotel.rating : 0))) {
            cheapestHotel = hotel;
            minCost = cost;
        }
    });
    return cheapestHotel ? cheapestHotel.name : "No existen hoteles disponibles";
}

// Muestra el Resultado en la Interfaz
export function showCheapestHotel() {
    const input = document.getElementById('input').value;
    
    // Obtiene el hotel más barato y calcula el costo total
    const { customerType, dates } = parseInput(input);
    const cheapestHotelName = findCheapestHotel(input);
    const cheapestHotel = hotels.find(hotel => hotel.name === cheapestHotelName);
    const totalCost = cheapestHotel ? calculateCost(cheapestHotel, customerType, dates) : 0;

    // Muestra el nombre del hotel y el costo total en la interfaz
    document.getElementById('result').textContent = `El hotel más barato es: ${cheapestHotelName} con un costo total de $${totalCost}`;
}

// Presenta las funciones globalmente para su uso en la interfaz de usuario (HTML)
window.calculateCost = calculateCost;
window.findCheapestHotel = findCheapestHotel;
window.parseInput = parseInput;
window.showCheapestHotel = showCheapestHotel;
