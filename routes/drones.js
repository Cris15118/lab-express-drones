const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model.js")

//GET "/drones"=> rederizar la lista de los drones
router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
  .then((allDrones) => {
    
    res.render("drones/list.hbs", {
      allDrones
    })
  })
  .catch((err) => {
    next(err)
  });
  
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone

  res.render("drones/create-form.hbs")

});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  console.log("creando dron", req.body)
  Drone.create({
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  })
  .then(() =>{

   res.redirect("/drones")

  })
  .catch((err)=>{
    next(err)
  })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone.findById(req.params.id)
  .then((droneDetails) => {
    console.log(droneDetails)
    res.render("drones/update-form.hbs", {
      droneDetails
    })
  })
  .catch((err)=>{
    next(err)
  })

});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  
  Drone.findByIdAndUpdate(req.params.id),{
    name: req.body.name,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  }
  .then(()=>{

   res.redirect("/drones")

  })
   .catch((err)=>{
    next(err)
   })
   
  });

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
});

module.exports = router;
