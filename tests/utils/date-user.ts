// First name
export async function getRandomFirstName() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const usernameLength = 6;

  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    username += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  const firstLetter = username.charAt(0).toUpperCase();
  const restOfName = username.slice(1).toLowerCase();

  const firstName = `${firstLetter}${restOfName}`;
  return firstName;
}
// console.log(getRandomFirstName());

// -------

// Last name
export async function getRandomLastName() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const usernameLength = 8;

  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    username += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  const firstLetter = username.charAt(0).toUpperCase();
  const restOfSurname = username.slice(1).toLowerCase();

  const surname = `${firstLetter}${restOfSurname}`;
  return surname;
}
// console.log(getRandomLastName());

// -------

// Password
export async function getRandomPassword() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString;
}
// console.log(getRandomPassword());
