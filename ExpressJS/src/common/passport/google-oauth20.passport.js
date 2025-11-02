import { Strategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constant/app.constant.js";
import passport from "passport";
import prisma from "../prisma/connect.prisma.js";
import { BadRequestException } from "../helpers/exception.helper.js";

export function initStrategyGoogleOauth20() {
    passport.use(
        new Strategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:3069/api/auth/google/callback",
            },
            async function (accessToken, refreshToken, profile, cb) {
                const email = profile.emails[0].value;
                const fullName = profile.displayName;
                const avatar = profile.photos[0].value;
                const googleId = profile.id;
                const verified = profile.emails[0].verified;

                if (!verified) {
                    throw new BadRequestException(" email chưa verify");
                }

                let userExist = await prisma.users.findUnique({
                    where: {
                        email: email,
                    },
                });

                // nếu userExist có dữ liệu (tồn tại) => người dùng CŨ cho đi tiếp thành công
                // nếu userExist không có dữ liệu => create người dùng MỚI
                if (!userExist) {
                    userExist = await prisma.users.create({
                        data: {
                            email: email,
                            fullName: fullName,
                            avatar: avatar,
                            googleId: googleId,
                        },
                    });
                }

                // console.dir({ accessToken, refreshToken, profile, cb, userExist }, { colors: true, depth: null });

                // thành công
                return cb(null, userExist);

                // thất bại
                // return cb("lỗi người dùng không hợp lệ", null);
            }
        )
    );
}
