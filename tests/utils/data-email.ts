export async function getRandomEmail() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const usernameLength = 8;
  const domainLength = 5;

  // Randomly generate user's name
  let username = '';
  for (let i = 0; i < usernameLength; i++) {
    username += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Random generate email domain
  let domain = '';
  for (let i = 0; i < domainLength; i++) {
    domain += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Construct a full e-mail address
  const email = `${username}@${domain}.com`;
  return email;
}
