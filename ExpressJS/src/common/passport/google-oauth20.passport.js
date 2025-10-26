import { Strategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constant/app.constant.js";
import passport from "passport";

export function initStrategyGoogleOauth20() {
    passport.use(
        new Strategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3069/api/auth/google/callback",
            },
            function (accessToken, refreshToken, profile, cb) {
                User.findOrCreate({ googleId: profile.id }, function (err, user) {
                    return cb(err, user);
                });
            }
        )
    );
}



