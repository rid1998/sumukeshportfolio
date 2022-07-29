const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const userFeedback = require("../models/userFeedback");


router.post('/form', (req, res) => {
    var userFB;
    var email = req.body.email;
    
    userFeedback.find(email)
    .exec((err, user) => {
        if(err || !user) {
          const feedback = new userFeedback(req.body)
          feedback.save((err, user) => {
            if(err){
              return err
            }
            console.log('User successfully saved ---> ', user);
          })
        }
    })

    if(req.body) {

      //console.log(req.body); 
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'guptasuumu@gmail.com',
          pass: 'aswtvpoygjbywpxi'
        }
      })
  
      const mailOptions = {
        from: 'guptasuumu@gmail.com',
        to: req.body.email,
        subject: `Message from ${req.body.email}`,
        text: `Dear ${req.body.firstName}, Thank You for Your Feedback! - From sumukesh.herokuapp.com`
      }
  
     transporter.sendMail(mailOptions, (err, info) => {
       // console.log('This is reachable');
        if(err){
          console.log(err);
          res.json('error')
        } else {
          //console.log(info);

        //   res.send({
        //     status: 'Success',
        //     UC: userCount,
        //     message: 'Thank your for submitting'
        // })

         res.send('Success');
          
        }
      })
      
    } else {
      res.send('Failure')
    }
    
    // 
  
  })


router.get('/usercount', (req, res) => {
  userFeedback.count({}, (err, count) => {
    if(err) throw err
    res.send({userCount: count})
  })
})

module.exports = router