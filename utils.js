const getRandomElement = (arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getElementsByPerson = (arr, person) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  if (typeof person != 'string') throw new Error('Expecting person to be string');
  return arr.filter((quoteObj => quoteObj.person === person));
}

const getAllQuotes = (arr) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr.map((quoteObj => quoteObj.quote));
}

module.exports = {
  getRandomElement,
  getElementsByPerson,
  getAllQuotes,
};
