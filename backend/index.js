const config = require('./utils/config');
const cors = require('cors');
const { uploadRouter } = require("./routes/uploadRoutes")
const { createUploadthingExpressHandler } = require("uploadthing/express");
// const multer = require('multer');

//Server settings
const express = require('express');
const app = express();

//Server params
const baseUrl = `http://localhost:${config.PORT}`;
const PORT = config.PORT;
const API_VER = config.API_VER;

app.use(cors());
//For parsing application/json data
app.use(express.json());


// would be useful if you want to pass form data

// const upload = multer({dest: "uploads/"})
// const middleware = upload.single('image')
// app.use(middleware)

//For parsing application/x-www-form-urlencoded data
app.use(express.urlencoded({ extended: true }));

//Import sequelize
const sequelize = require('./config/database');

//Seed data
const seedData = require('./utils/dbInit');

//Initialise associations
// const initAssociations = require('./models/associations');


// //Account routes
// app.use(API_VER, require('./routes/accountRoutes'))
// //User routes
// app.use(API_VER + '/users', require('./routes/userRoutes'));
// //Organiser routes
// app.use(API_VER + '/organisers', require('./routes/organiserRoutes'));
// //Programme routes
// app.use(API_VER + '/programmes', require('./routes/programmeRoutes'));


// uploadthing creates signed s3 url and give to frontend
// frontend uploads straight to url without passing the image to us
// they only give a name,size and reserve a slot in s3 for the image
app.use("/api/uploadthing", createUploadthingExpressHandler({
    router: uploadRouter,
    config: {
        callbackUrl: baseUrl + "/api/uploadthing/link",
        uploadthingId : config.UPLOADTHING_APP_ID,
        uploadthingSecret : config.UPLOADTHING_SECRET,
        }
    })
);

app.use('/', (req, res) => res.status(200).json("all good :)"))

sequelize
  .authenticate()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Connected to DB, server is listening on port ${PORT}`);
      })
  })
  .catch((err) => {
      console.error("Error: unable to connect to DB");
  })

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("[SYSTEM] All models synchronized successfully!");

    seedData();
  })
  .catch((err) => {
    console.error("[ERROR] Error synchronizing models:", err);
  });

// initAssociations();