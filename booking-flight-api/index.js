const express = require("express");
const { json } = require("express");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json(), routes);

//port listen
const port = process.env.PORT || 3000;

// Root URI call
app.get( "/", ( req, res ) => {
	res.send( "Zuri Flights" );
      } );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});