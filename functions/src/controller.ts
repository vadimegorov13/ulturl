import { Response } from "express";
import { db } from "./config/firebase";
import { isUri } from "valid-url";
import { generate as generateShortId } from "shortid";

type LongUrlType = {
  longUrl: string;
};

type Request = {
  body: LongUrlType;
  params: { urlCode: string };
};

type UrlObjType = {
  id: string;
  userId: string | null;
  isCustom: boolean;
  longUrl: string;
  shortUrl: string;
  urlCode: string;
  createdAt: number;
  updatedAt: number;
};

// Generate a random short url
const shortenUrl = async (req: Request, res: Response) => {
  const {
    body: { longUrl },
  } = req;
  const baseUrl = "https://ulturl.web.app";

  // Check base url
  if (!isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Check long url
  if (!isUri(longUrl)) {
    return res.status(401).json("Invalid long url");
  }

  try {
    // Check if longUrl already in db
    const urlDocExists: UrlObjType | null = await db
      .collection("shortUrl")
      .where("longUrl", "==", longUrl)
      .limit(1)
      .get()
      .then((snap) => {
        if (snap.empty) {
          return null;
        } else {
          return snap.docs[0].data() as UrlObjType;
        }
      });

    // Return short url from existing document
    if (urlDocExists !== null && urlDocExists.isCustom === false) {
      return res.status(200).json({
        status: "success",
        message: "This url already exists in our database",
        data: urlDocExists,
      });
    }

    // Create url code
    const urlCode = generateShortId();

    // Create document
    const urlDoc = db.collection("shortUrl").doc(urlCode);

    // Get values for the document
    const urlObj: UrlObjType = {
      id: urlCode,
      userId: null,
      isCustom: false,
      longUrl: longUrl,
      shortUrl: baseUrl + "/" + urlCode,
      urlCode: urlCode,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Set values to the document
    await urlDoc.set(urlObj);

    // Successfully created new short url
    return res.status(200).send({
      status: "success",
      message: "Url shorten successfully",
      data: urlObj,
    });
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};

// Redirect user to the long url
const redirectUrl = async (req: Request, res: Response) => {
  const {
    params: { urlCode },
  } = req;

  try {
    // Get url obj form db
    const url: UrlObjType = await db
      .collection("shortUrl")
      .doc(urlCode)
      .get()
      .then((doc) => {
        return doc.data() as UrlObjType;
      });

    // Redirect if url exists
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (error: unknown) {
    console.error(error);
    return res.status(500).json("Server Error");
  }
};

export { redirectUrl, shortenUrl };
