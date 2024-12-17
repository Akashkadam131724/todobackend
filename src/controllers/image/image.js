import Image from "../../models/image/image.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";

const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).send(images);
  } catch (error) {
    res.status(400).send({
      error: error.message,
    });
  }
};

// const createImageMiddleware = (req, res) ={

// }

const createImage = async (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    const boundary = req.headers["content-type"].split("boundary=")[1];

    if (!boundary) {
      res.status(400).send("Invalid form-data");
      return;
    }

    // Split the body by the boundary
    const parts = body.split(`--${boundary}`);
    let imageField = null;

    parts.forEach((part) => {
      if (part.includes("Content-Disposition")) {
        const [headers, content] = part.split("\r\n\r\n");
        if (headers && content) {
          const nameMatch = headers.match(/name="([^"]+)"/);
          const fieldName = nameMatch ? nameMatch[1] : null;

          if (fieldName === "image_url") {
            imageField = content.trim(); // Extract the image content
          }
        }
      }
    });

    try {
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(imageField);

      const images = await Image.find(uploadResult);
      // Respond with the Cloudinary result
      res.send({
        message: "Success",
        data: images,
      });
    } catch (error) {
      console.error("Error uploading image:", error.message);
      res.status(500).send("Failed to upload image");
    }
  });
};

export { createImage, getAllImages };
