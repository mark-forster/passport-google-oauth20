const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const User= require('../models/user.model');
module.exports= (passport)=>{
    passport.use(new GoogleStrategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:7000/auth/google/callback"
      },
     async function(accessToken, refreshToken, profile, done) {
       
            const user= await User.findOne({ googleId: profile.id});
            if(user){
              return  done(null, user)
            }
            else{
                // create new User
                const newUser= new User({
                    googleId:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    image:profile.photos[0].value
                });
                const user=await newUser.save();
                return done(null, user)
            }
      }
    ));

    passport.serializeUser(async(user, done)=>{
    
      done(null, user.id);
    });
    
    passport.deserializeUser(async(id, done) =>{
    
      try {
          const user = await User.findById(id);
          if(!user){
            throw new Error('User not found');
          }
          done(null, user);
       
      } catch (err){
        done(err, null);
      }
  })

    
}
