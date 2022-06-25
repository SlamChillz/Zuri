# FLIGHT SCHEDULING API
A simple REST API for a flight scheduling.

## Endpoints
1. /flights/:id
	- GET: Returns a flight with the given id.
	- PUT: Updates a flight with the given id.
	- DELETE: Deletes a flight with the given id.

2. /flights
	- Returns all flight(s).

3. /addflight
	- Book a flight.

	- [ ] An example of the request body is as follows
	{
		title: "flight to canada",
		price: 26000
	}
