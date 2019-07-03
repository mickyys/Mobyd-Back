
const express = require('express');
const api = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const util = require('../../util/util');
const { User } = require('../../user/user');
const bcrypt = require('bcrypt');

module.exports.initialize = passport.initialize();

passport.serializeUser((token, done)=>{
  done(null, token);
});

passport.use(
    new GoogleStrategy({
      clientID: '443501852054-9mba743jjm48bp6il549omjvbpbun3hr.apps.googleusercontent.com',
      clientSecret: 'HkQXkonZjHx_kK10nWEv8cM6',
      callbackURL: "/auth/google/callback"
    }, async (accessToken, refreshToken, profile, cb) => {

        let currentUser = await User.findOne({email : profile.emails[0].value, status : Status.active});
        if(currentUser){

          let photo = await util.getUrltoImageBase64(profile.photos[0].value);

          currentUser = await User.findOneAndUpdate(currentUser._id,{
            $set :{
                name : profile.name.givenName,
                lastName : profile.name.familyName,
                photo : photo
            }
          });
          
          cb(null,{ token : currentUser.generateAuthToken() });
        }else{

            const salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash('Time' + new Date().getTime(), salt); 
            let photo = await util.getUrltoImageBase64(profile.photos[0].value);

            currentUser = await new User({
                name : profile.name.givenName,
                lastName : profile.name.familyName,
                email : profile.emails[0].value,
                password : password,
                isAdmin : true,
                photo : photo,
                className : 'event-line',
                roles : ['Administrador', 'Doctor'],
                redSocial : {
                    id : profile.id,
                    name : 'Google'
                }
            }).save();
            cb(null, { token : currentUser.generateAuthToken() });
        }
    }
));

// module.exports.googleAuth = ;  
module.exports.googleCallback = (req, res) => {
    res.redirect('http://localhost:4200/loginSocial?token=' + req.user.token 
    );
}