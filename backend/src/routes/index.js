const express = require("express");
const { protect } = require("../middlewares/auth.middleware");

const authRoutes = require("./auth.routes");

// Public (read-mostly) routes — consumed by the public website.
const publicFilmRoutes = require("./public/films.routes");
const publicCrewRoutes = require("./public/crew.routes");
const publicWorkshopRoutes = require("./public/workshop.routes");
const publicBlogRoutes = require("./public/blog.routes");
const publicFaqRoutes = require("./public/faq.routes");
const publicTestimonialRoutes = require("./public/testimonial.routes");
const publicContactRoutes = require("./public/contact.routes");
const publicSettingsRoutes = require("./public/settings.routes");

// Admin (protected) routes — consumed by the admin panel.
const adminFilmRoutes = require("./admin/films.routes");
const adminCrewRoutes = require("./admin/crew.routes");
const adminWorkshopRoutes = require("./admin/workshop.routes");
const adminBlogRoutes = require("./admin/blog.routes");
const adminFaqRoutes = require("./admin/faq.routes");
const adminTestimonialRoutes = require("./admin/testimonial.routes");
const adminEnquiryRoutes = require("./admin/enquiry.routes");
const adminSettingsRoutes = require("./admin/settings.routes");
const adminUploadRoutes = require("./admin/upload.routes");
const adminDashboardRoutes = require("./admin/dashboard.routes");
const adminAdminsRoutes = require("./admin/admins.routes");

const router = express.Router();

router.get("/health", (_req, res) => res.json({ success: true, message: "API is healthy" }));

// ---- Auth (login is public, the rest self-protect) ----
router.use("/auth", authRoutes);

// ---- Public website API ----
router.use("/films", publicFilmRoutes);
router.use("/crew", publicCrewRoutes);
router.use("/workshops", publicWorkshopRoutes);
router.use("/blog", publicBlogRoutes);
router.use("/faqs", publicFaqRoutes);
router.use("/testimonials", publicTestimonialRoutes);
router.use("/contact", publicContactRoutes);
router.use("/settings", publicSettingsRoutes);

// ---- Admin panel API (everything below requires a valid admin JWT) ----
const adminRouter = express.Router();
adminRouter.use(protect);

adminRouter.use("/films", adminFilmRoutes);
adminRouter.use("/crew", adminCrewRoutes);
adminRouter.use("/workshops", adminWorkshopRoutes);
adminRouter.use("/blog", adminBlogRoutes);
adminRouter.use("/faqs", adminFaqRoutes);
adminRouter.use("/testimonials", adminTestimonialRoutes);
adminRouter.use("/enquiries", adminEnquiryRoutes);
adminRouter.use("/settings", adminSettingsRoutes);
adminRouter.use("/uploads", adminUploadRoutes);
adminRouter.use("/dashboard", adminDashboardRoutes);
adminRouter.use("/admins", adminAdminsRoutes);

router.use("/admin", adminRouter);

module.exports = router;
