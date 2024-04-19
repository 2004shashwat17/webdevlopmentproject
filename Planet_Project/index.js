const { parse } = require('csv-parse');
const fs = require('fs');

const HabitablePlanet = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
   && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
   && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
  .pipe(parse({
    comment: '#',
    columns: true,
  }))
  .on('data', (data) => {
    if (isHabitablePlanet(data)) {
      HabitablePlanet.push(data);
    }
  })
  .on('error', (err) => {
    console.log(err);
  })
  .on('end', () => {
    console.log(HabitablePlanet.map((planet)=> {
      return planet['kepler_name'];
    }));
    console.log(`${HabitablePlanet.length} habitable planets found!`);
  });
