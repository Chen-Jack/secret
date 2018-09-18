const db = require('./../db')
const uuid = require('uuid/v4');
const bcrypt = require('bcryptjs')

/*
User Schema
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
*/
class User{
  //Callback takes in only errors
  static create(username, password, callback=()=>{}){
    bcrypt.hash(password, 8, function(err, hash) {
      if(err){
        console.log("Error with hashing password");
        callback("Error with password Hashing, User creation Aborted")
      }
      else{
        //SQL QUERY TO INSERT USER
        db.query('INSERT INTO user (id, username, password) VALUES(?,?,?)',
          [uuid(), username, hash],
          (err, results, fields)=>{
            //Let the callback handle the err, if it exists
            callback(err)
          })       
      }
    })
  }

  //Given a username string, it returns the first user entry on the table
  //Callback accepts an error and result
  static find(username, callback=()=>{}){
    db.query(`SELECT * FROM user WHERE username = ?`, username, (err, results, fields)=>{
      if(err)
        callback(err , null)
      else{
        //Return the first user of the search
        const user = {
          id: results[0].id,
          username: results[0].username,
          password: results[0].password
        }

        callback(null, user)
      }
    })
  }

  //Checks to see if the username and password is a match
  //Takes a callback of err and result, where result is a boolean
  static verify(username, raw_password, callback){
    User.find(username, (err, user)=>{
      bcrypt.compare(raw_password, user.password, (err, res)=>{
        //res is either true or false
        callback(err, res)
      });
    })
  }



}

module.exports = User