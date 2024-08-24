import { calculateCost, findCheapestHotel } from '../src/app';

// Prueba de la Función "calculateCost"
test('calcula el costo para un cliente regular en días de semana', () => {
  const hotel = {
    name: "Lakewood",
    rating: 3,
    weekdayRates: { regular: 110, rewards: 80 },
    weekendRates: { regular: 90, rewards: 80 }
  };
  const dates = [new Date('16Mar2009(mon)'), new Date('17Mar2009(tue)')];
  const cost = calculateCost(hotel, 'regular', dates);
  expect(cost).toBe(220);  // 110 + 110
});

test('calcula el costo para un cliente con recompensas en fines de semana', () => {
  const hotel = {
    name: "Ridgewood",
    rating: 5,
    weekdayRates: { regular: 220, rewards: 100 },
    weekendRates: { regular: 150, rewards: 40 }
  };
  const dates = [new Date('21Mar2009(sat)'), new Date('22Mar2009(sun)')];
  const cost = calculateCost(hotel, 'rewards', dates);
  expect(cost).toBe(80);  // 40 + 40
});

// Prueba de la Función "findCheapestHotel"
test('debe devolver Lakewood para un cliente regular durante la semana', () => {
  const input = 'Regular: 17Mar2009(tue), 18Mar2009(wed), 19Mar2009(thu)';
  const result = findCheapestHotel(input);
  expect(result).toBe('Lakewood');
});

test('debe devolver Ridgewood para un cliente con recompensas durante el fin de semana', () => {
  const input = 'Rewards: 27Mar2009(fri), 28Mar2009(sat), 29Mar2009(sun)';
  const result = findCheapestHotel(input);
  expect(result).toBe('Ridgewood');
});

test('debe devolver Ridegewood en caso de empate por calificación', () => {
  const input = 'Rewards: 26Mar2009(thu), 27Mar2009(fri), 28Mar2009(sat)';
  const result = findCheapestHotel(input);
  expect(result).toBe('Ridgewood');  // Lakewood tiene el mismo valor que Ridgewood pero este tiene 5 estrellas
});
