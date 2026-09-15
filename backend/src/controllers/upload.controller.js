const fs = require("fs");
const path = require("path");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const env = require("../config/env");

// @route  POST /api/v1/admin/uploads
// @access Private
const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest("No image file was provided (field name: 'image')");
  }

  const relativePath = `/${env.UPLOAD_DIR}/${req.file.filename}`;
  new ApiResponse(
    201,
    {
      url: relativePath,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
    },
    "Image uploaded"
  ).send(res);
});

// @route  POST /api/v1/admin/uploads/multiple
// @access Private
const uploadImages = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw ApiError.badRequest("No image files were provided (field name: 'images')");
  }

  const files = req.files.map((file) => ({
    url: `/${env.UPLOAD_DIR}/${file.filename}`,
    filename: file.filename,
    size: file.size,
    mimetype: file.mimetype,
  }));

  new ApiResponse(201, files, "Images uploaded").send(res);
});

// @route  DELETE /api/v1/admin/uploads/:filename
// @access Private
const deleteImage = asyncHandler(async (req, res) => {
  const filename = path.basename(req.params.filename); // strip any path traversal
  const filePath = path.join(process.cwd(), env.UPLOAD_DIR, filename);

  if (!fs.existsSync(filePath)) {
    throw ApiError.notFound("File not found");
  }

  fs.unlinkSync(filePath);
  new ApiResponse(200, null, "Image deleted").send(res);
});

module.exports = { uploadImage, uploadImages, deleteImage };
