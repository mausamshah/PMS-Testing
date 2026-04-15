// Current Day Number
export async function getCurrentDayNumber() {
  const today = new Date();
  const numberDay = today.getDate();

  return numberDay;
}

// Number Day Next
export async function getNumberDayNext() {
  const today = new Date();
  const currentDayNumber = today.getDate();

  today.setDate(currentDayNumber + 1);
  const numberDay = today.getDate();

  return numberDay;
}

// Random Day Number
export async function getRandomDayNumber() {
  const randomDay = Math.floor(Math.random() * 28) + 1;

  return randomDay;
}

// Current Month
export async function getCurrentMonth() {
  const today = new Date();
  const nameMonth = today.toLocaleString('en-US', { month: 'long' });

  return nameMonth;
}

// Current Month by number
export async function getCurrentMonthNumber() {
  const today = new Date();
  const monthNumber = today.getMonth() + 1;
  return monthNumber;
}

// Random Month Number
export async function getRandomMonthNumber() {
  const randomDay = Math.floor(Math.random() * 12) + 1;

  return randomDay;
}

// Random Month
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export async function getRandomMonth() {
  const randomIndex = Math.floor(Math.random() * months.length);
  const randomMonth = months[randomIndex];

  return randomMonth;
}

// Current Year
export async function getCurrentYear() {
  const today = new Date();
  const yearNumber = today.getFullYear();

  return yearNumber;
}

// Year Birth Adult
export async function getYearBirthAdult() {
  const today = new Date();
  const year = today.getFullYear() - 19;

  return year;
}
