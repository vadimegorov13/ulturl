import * as functions from "firebase-functions";
import express from "express";
import { redirectUrl, shortenUrl } from "./controller";

const app = express();

app.get("/:urlCode", redirectUrl);
app.post("/api/shorten", shortenUrl);

exports.app = functions.https.onRequest(app);
