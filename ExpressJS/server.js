import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { appError } from "./src/common/app-error/app.error.js";
import cors from "cors";
import { initStrategyGoogleOauth20 } from "./src/common/passport/google-oauth20.passport.js";
import passport from "passport";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./src/common/graphql/schema.graphql.js";
import { root } from "./src/common/graphql/root.graphql.js";
import protectGraphQL from "./src/common/middlewares/protect-graphql.middleware.js";
import { createServer } from "http";
import { initSocket } from "./src/common/socket/init.socket.js";

const app = express();

// Giúp nhận được dữ liệu của body
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:3000", "google.com"],
    })
);
app.use(passport.initialize());
initStrategyGoogleOauth20();
app.use(express.static("public"));

// Create and use the GraphQL handler
app.all(
    "/graphql",
    createHandler({
        schema: schema,
        rootValue: root,
        context: async (req) => {
            console.log(req.headers);
            const user = await protectGraphQL(req);

            return { user };
        },
    })
);

app.use("/api", rootRouter);

app.use(appError);

// socket
const httpServer = createServer(app);
initSocket(httpServer);

const PORT = 3069;
httpServer.listen(PORT, () => {
    console.log(`🤷 Server online at http://localhost:${PORT}`);
});
