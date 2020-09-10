const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getElementsByPerson, getAllQuotes } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

/** 
 * GET a random quote
 * Path: /api/quotes/random
 * Send: {
 *   quote: { quote object }
 *  } 
 */
app.get('/api/quotes/random', (req, res, next) => {
	try {
		const randomQuoteObj = getRandomElement(quotes);
		res.send({quote: randomQuoteObj});
	} catch(error) {
		console.log(error);
		res.status(404).send(error);
	}
});

/**
 * GET all quotes 
 * 	if person attribute is set, return all quotes by that person
 * 	if no person is set, return all quotes
 * Path: /api/quotes
 * Query: {optional} person="the person name"
 * Send: {
 *   quotes: [ Array of requested quotes ]
 *  }
 */
app.get('/api/quotes', (req, res, next) => {
	const person = req.query.person;
	try {
		if (person) {
			const quoteArr = getElementsByPerson(quotes, person);
			res.send({quotes: quoteArr});
		} else {
			res.send({'quotes': quotes});
		}
	} catch(error) {
		console.log(error);
		res.status(404).send(error);
	}
});

/** 
 * POST new quote
 * Path: /api/quotes
 * Query: quote='the quote'&person='the person name'
 * Send: {
 * 	quote: { new quote object }
 * }
 */
app.post('/api/quotes', (req, res, next) => {
	const person = req.query.person;
	const quote = req.query.quote;
	if (person && quote) {
		const newQuote = { 'quote': quote, 'person': person };
		quotes.push(newQuote);
		res.send({'quote': newQuote});
	} else {
		res.status(400).send("Invalid Person or Quote");
	}
});

app.listen(PORT, () => {
	console.log(`Server started and listening on port ${PORT}`);
})