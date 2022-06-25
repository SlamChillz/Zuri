const Flights = require("../models/Flight.json");
const fs = require("fs");
const {v4: uuid} = require("uuid");

/* flight current date and time constants */
const currentDate = new Date();
const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const current_date =
  currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

const current_time = new Date().toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const flights = Flights;

exports.addFlight = async (req, res) => {
  try {
    const { title, price } = await req.body;

    var flight = {
      id: uuid(),
      title,
      time: current_time,
      price,
      date: current_date,
    };

    flights.push(flight);

    let stringedData = JSON.stringify(flights, null, 2);
    fs.writeFile("./models/Flight.json", stringedData, function (err) {
      if (err) {
        return res.status(500).json({ message: err });
      }
    });

    res.status(200).json({
      message: "flight booked",
    });

    console.log(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFlights = async (req, res) => {
  try {
    res.status(200).json(flights);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getFlight = async (req, res) => {
  try {
    let id = req.params.id;
    let foundId = flights.find((flight) => {
      return String(flight.id) === id;
    });
    if (foundId) {
      console.log(foundId);
      return res.status(200).json({ flight: foundId });
    } else {
      return res.status(400).json({ message: "flight not found" });
    }
  } catch (err) {
    return err;
  }
};

exports.updateFlight = async (req, res) => {
  try {
    let id = req.params.id;
    let selectedId = flights.find((flight) => {
      return String(flight.id) == id;
    });
    const { title, price } = await req.body;
    selectedId.title = title;
    selectedId.price = price;

    res.status(200).json({ message: "flight updated" });
    console.log(selectedId);
    console.log(flights);
  } catch (err) {
    res.status(500).json({ message: "flight not found" });
  }
};

exports.deleteFlight = async (req, res) => {
  try {
    let id = req.params.id;
    let flight = flights.find((flight) => {
      return String(flight.id) == id;
    });
    flights.splice(flights.indexOf(flight), 1);
    res.status(200).json({ message: "flight deleted", flight });
  } catch (err) {
    res.status(400).json({ message: "flight not found" });
  }
};
