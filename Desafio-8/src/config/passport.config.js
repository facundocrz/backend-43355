import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/auth.js";
import CustomErrors from "../utils/errors/Custom.errors.js";
import { generateUserErrorInfo } from "../utils/errors/info.errors.js";
import enumErrors from "../utils/errors/enum.errors.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age, role } = req.body;
        if (!first_name || !last_name || !email || !age) {
          CustomErrors.createError({
            name: "User creation error",
            cause: generateUserErrorInfo({ first_name, last_name, email, age }),
            message: 'Error trying to create user',
            code: enumErrors.INVALID_TYPE_ERROR
          })
        }
        try {
          const user = await userModel.findOne({ email: username });
          if (user) {
            return done(null, false, { message: "User already exists" });
          }
          const newCart = await fetch("http://localhost:8080/api/carts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: newCart.payload,
            role,
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error obtaining user" + error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            return done(null, false, { message: "User not found" });
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, { message: "Invalid password" });
          }
          return done(null, user);
        } catch (error) {
          return done("Error obtaining user" + error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.a2b97e6454493b04",
        clientSecret: "403fd77397d35c85fc8596dda5c5a9b5c2e29237",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await userModel.findOneAndDelete({
            email: profile._json.email,
          });
          if (!user) {
            const newCart = await fetch("http://localhost:8080/api/carts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => res.json());
            const newUser = {
              first_name: profile._json.name.split(" ")[0],
              last_name: " ",
              age: 18,
              email: profile._json.email,
              password: " ",
              cart: newCart.payload,
            };
            const result = await userModel.create(newUser);
            done(null, result);
          } else {
            done(null, user);
          }
        } catch (error) {
          return done("Error obtaining user" + error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
