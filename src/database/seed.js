// import dotenv from "dotenv";
// import mysql from "mysql2/promise";

// import bookings from "bookingData.json";
// import users from "userData.json";
// import rooms from "roomData.json";
// import contacts from "contactData.json";

// dotenv.config();

// const config = {
//   host: "localhost",
//   user: "root",
//   password: process.env.DB_PASSWORD,
//   database: "database_miranda",
// };

// const connection = mysql.createConnection(config);

// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   users.forEach((user) => {
//     connection.query("INSERT INTO users SET ?", user, function (err, res) {
//       if (err) throw err;
//       console.log("Last insert ID:", res.insertId);
//     });
//   });
//   rooms.forEach((room) => {
//     connection.query("INSERT INTO rooms SET ?", room, function (err, res) {
//       if (err) throw err;
//       console.log("Last insert ID:", res.insertId);
//     });
//   });
//   bookings.forEach((booking) => {
//     connection.query(
//       "INSERT INTO bookings SET ?",
//       booking,
//       function (err, res) {
//         if (err) throw err;
//         console.log("Last insert ID:", res.insertId);
//       }
//     );
//   });
//   contacts.forEach((contact) => {
//     connection.query(
//       "INSERT INTO contacts SET ?",
//       contact,
//       function (err, res) {
//         if (err) throw err;
//         console.log("Last insert ID:", res.insertId);
//       }
//     );
//   });
//   connection.end();
// });
