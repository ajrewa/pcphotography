const mongoose = require("mongoose");
const slugify = require("slugify");

const FILM_CATEGORIES = ["Destination", "Indian", "Intimate", "Editorial"];

const filmSchema = new mongoose.Schema(
  {
    couple: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    location: { type: String, required: true, trim: true },
    eventDate: { type: Date, required: true },
    teaser: { type: String, required: true, trim: true, maxlength: 400 },
    story: { type: String, trim: true },
    category: { type: String, enum: FILM_CATEGORIES, required: true },
    coverImage: { type: String, required: true },
    gallery: [{ type: String }],
    videoUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  { timestamps: true }
);

filmSchema.index({ couple: "text", location: "text", teaser: "text" });

filmSchema.pre("validate", function generateSlug(next) {
  if (this.couple && (!this.slug || this.isModified("couple"))) {
    this.slug = slugify(this.couple, { lower: true, strict: true });
  }
  next();
});

filmSchema.statics.CATEGORIES = FILM_CATEGORIES;

module.exports = mongoose.model("Film", filmSchema);
module.exports.CATEGORIES = FILM_CATEGORIES;
