const { validateName, validateEmail, checkPassword } = require("./validations");

const express = require("express"),
      app = express(),
      mongoose = require("mongoose"),
      bcrypt = require("bcrypt"),
      bodyParser = require("body-parser");

const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ssn = require ('jsonwebtoken');

const ssn_decrypt = "bsdbcj6576537hjwfbcnbdvjb";

mongoose.connect("mongodb+srv://sasalates:sakshi1999@cluster20.9bzrjxd.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const userSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  joined: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

// Home Page
app.get("/", (req, res) => {
  res.send("Welcome");
});

// Create new user
app.post("/user/create", async (req, res) => {

  try {

    let user = await User.findOne({ email: req.body.email });
    let passBool, emailBool, fullnameBool = false;

    if (user) {
      res.status(400).send({ message: "Email Address already exists." });
    } else {
      
      if (validateName(req.body.fullname)) { 
        // console.log("Proper fullname");
        fullnameBool = true;
      } else {
        fullnameBool = false;
        res.status(400).send({ message: "Please enter FullName correctly!"});
      }

      if (validateEmail(req.body.email)) {
        // console.log("Proper email address");
        emailBool = true;
      } else {
        emailBool = false;
        res.status(400).send({ message: "Please input email address correctly!"});
      }

      if (checkPassword(req.body.password) && (req.body.password == req.body.confirm_password)) {
        passBool = true;
        // console.log("Password is correct");
      } else {
        passBool = false;
        res.status(400).send({ message: "Please input password correctly!"});
      }

      if (passBool && emailBool && fullnameBool) {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const innerResult = await User.create({
          fullname: req.body.fullname,
          email: req.body.email,
          password: hashedPassword,
          user_type: req.body.user_type
        });
        res.status(201).send(innerResult);
      }   
    }    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error Occurred!"});
  }

});

// Update user details
app.put("/user/edit", async (req, res) => {

  const user = await User.findOne({email: req.body.email});
  
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {

      if (req.body.new_fullname != undefined && req.body.new_email != undefined && req.body.new_password != undefined && req.body.confirm_new_password != undefined ) {
        res.status(400).send({ message: "Please provide either new fullname or new password parameters only!" });
      } else if (req.body.new_fullname == undefined && req.body.new_email != undefined && req.body.new_password == undefined && req.body.confirm_new_password == undefined ) {
        // console.log("Update new email");
        // console.log("Seems good");
                res.status(404).send({
                  message: `Cannot update email!!`
                });
    } else if (req.body.new_fullname != undefined && req.body.new_email == undefined && req.body.new_password == undefined && req.body.confirm_new_password == undefined) {
            // console.log("Update fullname");
            if (validateName(req.body.new_fullname)) {
              // console.log("Seems good");
              User.findByIdAndUpdate(user._id, {fullname: req.body.new_fullname }, { useFindAndModify: false })
                .then(data => {
                  if (!data) {
                    res.status(404).send({
                      message: `Cannot update fullname with user id=${user._id}. User was not found!`
                    });
                  } else {
                    res.send({ message: "User fullname was updated successfully." })
                  };
                })
                .catch(err => {
                  res.status(500).send({
                    message: "Error updating User's fullname with id=" + user._id
                  });
                });
            } else {
              res.status(400).send({ message: "Please enter new fullname correctly!" });
            }
      } else if (req.body.new_fullname == undefined && req.body.new_email == undefined && req.body.new_password != undefined && req.body.confirm_new_password != undefined) {
        // console.log("Update new password");
        if (checkPassword(req.body.new_password) && req.body.new_password == req.body.confirm_new_password) {
          const newPassword = await bcrypt.hash(req.body.new_password, saltRounds);
          User.findByIdAndUpdate(user._id, { password: newPassword }, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update password with user id=${user._id}. User was not found!`
                });
              } else res.send({ message: "User password was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating User's password with id=" + user._id
              });
            });
        } else {
          res.status(400).send({ message: "Please enter password correctly!" });
        }
      } else {
        res.status(400).send({ message: "Please provide either the new email or new password!" });
      }
    } else {
      res.status(404).send({
        message: `Password incorrect entered, please retry.`
      });
    }
  } else {
    res.status(404).send({
      message: `User was not found! Please check the email address.`
    });
  }
});

// Get all users
app.get("/user/getAll", async (req, res) => {

  User.find({}, function (err, users) {
    users.forEach(user => delete user.fullname);  
    users.forEach(user => delete user.password); 
      const newResult = users.map(item => {
        return {
          id: item._id,
          fullname: item.fullname,
          email: item.email,
          password: item.password
        }
      })
      res.send(newResult);
  });
  
});

// Delete user
app.delete("/user/delete", async (req, res) => {

  const user = await User.findOne({email: req.body.email});

  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      User.findByIdAndDelete(user._id)
        .then(item => {
          if (!item) {
            res.status(404).send({
              message: `Cannot delete User with email=${user.email}. User not found!`
            });
          } else {
            res.send({
              message: `User with email id ${user.email} was deleted successfully!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Could not delete User with email=" + user.email
          });
        });
    } else {
      res.status(404).send({
        message: `Password incorrect entered, please retry.`
      });
    }
  } else {
    res.status(404).send({
      message: `User was not found! Please check the email address.`
    });
  }
});

app.post("/login", async(req,res) =>{
  const {fullname, password} = req.body;

  const user = await User.findOne({fullname});
  if(!user){
    return res.json({ status: "no", error: "User not Found"});
  }
  if(await bcrypt.compare(password,user.password)){
    const token = ssn.sign({}, ssn_decrypt);

    if(res.status(201)){
      return res.json({ status: "ok", data: token});
    } else {
      return res.json({ error : "error"});
    }
  }
  res.json({status: "error", error: "invalid Password"});
});

// Server config block
app.listen(8000, () => {
  console.log("Server started at port 8000");
});