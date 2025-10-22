let reservations = {}; // { "YYYY-MM-DD": ["HH:MM"] }

function generateAllTimes() {
  const times = [];
  for (let hour = 9; hour <= 17; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return times;
}

exports.getAvailableTimes = (req, res) => {
  const date = req.query.date;
  const allTimes = generateAllTimes();
  const reserved = reservations[date] || [];
  const available = allTimes.filter(t => !reserved.includes(t));
  res.json(available);
};

exports.bookTime = (req, res) => {
  const { date, time } = req.body;
  if (!reservations[date]) {
    reservations[date] = [];
  }
  if (!reservations[date].includes(time)) {
    reservations[date].push(time);
    res.send('Booked successfully');
  } else {
    res.status(400).send('Time already booked');
  }
};