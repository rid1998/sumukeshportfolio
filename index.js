const express = require('express');
const bodyParser = require('body-parser');
//const { json } = require('express');
const nodemailer = require('nodemailer');
var fs = require('fs')

const app = express();

const port = process.env.PORT || 3000;
// if(port == null || port == ""){
//   port = 3000
// }
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())


app.get('/' , (req,res)=> {
  res.sendFile(__dirname + '/public/index.html' )
});

app.get('/form', (req,res) => {
  res.sendFile(__dirname + '/public/form.html')
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next();
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/form', (req, res) => {
  if(req.body) {
    console.log(req.body);
    
    fs.appendFileSync('./user-data.json', JSON.stringify(req.body), (err) => {
        if(err){
          console.log(err);
        }
        console.log('Data saved to JSON file');
      })

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
      console.log('This is reachable');
      if(err){
        console.log(err);
        res.json('error')
      } else {
        console.log('Email sent !!');
        res.send('Success');

      }
    })
    
  } else {
    res.send('Failure')
  }
  
  // 

})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})