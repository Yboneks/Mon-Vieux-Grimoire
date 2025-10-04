const sharp = require("sharp");
const path = require("path");
const fs = require("fs").promises;

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const originalPath = req.file.path;
    const fileExtension = path.extname(req.file.filename);

    // Nouveau nom du fichier
    const webpFilename = req.file.filename.replace(fileExtension, ".webp");
    const webpPath = path.join(path.dirname(originalPath), webpFilename);

    // Conversion/Compression format WebP
    await sharp(originalPath)
      .resize(1920, 1080, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        effort: 6,
      })
      .toFile(webpPath);

    // Suppression fichier de base
    await fs.unlink(originalPath);

    // Mettre à jour req.file avec les nouvelles infos
    req.file.path = webpPath;
    req.file.filename = webpFilename;

    console.log(`✅ Image convertie en WebP: ${webpFilename}`);

    next();
  } catch (error) {
    console.error("❌ Erreur compression:", error);
    next();
  }
};

module.exports = compressImage;
