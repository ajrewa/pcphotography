# The Wedding Filmer — Backend API

A standalone Node.js + Express + MongoDB backend for **The Wedding Filmer**
website and its admin panel. This repo is API-only — no frontend/UI is
included; it's meant to be consumed by the Next.js site (built separately)
and by whatever admin dashboard you build on top of it.

## Stack

- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — data layer
- **JWT** — admin authentication (Bearer token)
- **express-validator** — request validation
- **multer** — image uploads (local disk storage)
- **helmet, cors, express-rate-limit, express-mongo-sanitize** — security

## Folder structure

```
wedding-filmer-backend/
├── server.js                 # entrypoint: connect DB, start HTTP server
├── src/
│   ├── app.js                # express app, middleware stack, route mounting
│   ├── config/
│   │   ├── env.js            # env var loader/validator
│   │   └── db.js             # mongoose connection
│   ├── models/                # Admin, Film, Crew, Workshop,
│   │                          # WorkshopApplication, BlogPost, Testimonial,
│   │                          # FAQ, Enquiry, SiteSettings
│   ├── controllers/           # business logic per resource
│   ├── routes/
│   │   ├── index.js           # mounts /api/v1/... and gates /admin/* behind auth
│   │   ├── auth.routes.js
│   │   ├── public/            # read-only + public-write routes for the website
│   │   └── admin/             # protected CRUD routes for the admin panel
│   ├── middlewares/           # auth, error handler, 404, validation, upload
│   ├── validators/            # express-validator chains per resource
│   ├── utils/                 # ApiError, ApiResponse, asyncHandler, token, pagination
│   └── seed/seed.js           # creates a superadmin + sample content
└── uploads/                   # local image storage (served at /uploads/*)
```

## Getting started

```bash
npm install
cp .env.example .env      # then edit MONGO_URI, JWT_SECRET, etc.
npm run seed               # creates a superadmin account + sample content
npm run dev                 # starts on http://localhost:5000
```

Default seeded admin login (change `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`
in `.env` before seeding in anything but local dev):

```
email:    admin@theweddingfilmer.com
password: ChangeMe@123
```

To wipe seeded data: `npm run seed:destroy`.

## Auth model

- `POST /api/v1/auth/login` returns `{ admin, token }`. Send the token on
  every admin request as `Authorization: Bearer <token>`.
- Roles: `superadmin` (full access, including managing other admin accounts)
  and `editor` (content management, no admin-account management).
- All `/api/v1/admin/*` routes require a valid token; `/api/v1/admin/admins/*`
  additionally requires the `superadmin` role.

## Response shape

Every response follows the same envelope:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Films fetched",
  "data": [ /* ... */ ],
  "meta": { "page": 1, "limit": 12, "total": 42, "totalPages": 4, "hasNextPage": true, "hasPrevPage": false }
}
```

Errors:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Enter a valid email" }]
}
```

## API reference

### Auth — `/api/v1/auth`
| Method | Path | Access | Notes |
|---|---|---|---|
| POST | `/login` | Public | rate-limited (10 / 15 min) |
| POST | `/register` | superadmin | create another admin/editor account |
| GET | `/me` | Private | current admin profile |
| PUT | `/password` | Private | change own password |
| POST | `/logout` | Private | clears cookie if one was used |

### Public website API
| Resource | Routes |
|---|---|
| Films | `GET /api/v1/films` (query: `category`, `search`, `featured`, `page`, `limit`) · `GET /api/v1/films/:slug` |
| Crew | `GET /api/v1/crew` |
| Workshops | `GET /api/v1/workshops` (upcoming, published only) · `POST /api/v1/workshops/:id/apply` |
| Blog | `GET /api/v1/blog` (query: `tag`, `search`, `page`, `limit`) · `GET /api/v1/blog/:slug` |
| FAQs | `GET /api/v1/faqs` |
| Testimonials | `GET /api/v1/testimonials` |
| Contact | `POST /api/v1/contact` (rate-limited, 5 / hour) |
| Settings | `GET /api/v1/settings` (site stats, contact info, socials) |

### Admin panel API — `/api/v1/admin/*` (JWT required)
| Resource | Routes |
|---|---|
| Films | `GET /films` · `GET /films/:id` · `POST /films` · `PUT /films/:id` · `DELETE /films/:id` · `PATCH /films/:id/publish` |
| Crew | `GET /crew` · `GET /crew/:id` · `POST /crew` · `PUT /crew/:id` · `DELETE /crew/:id` |
| Workshops | `GET /workshops` · `GET /workshops/:id` · `POST /workshops` · `PUT /workshops/:id` · `DELETE /workshops/:id` |
| Workshop applications | `GET /workshops/applications` (query: `status`, `workshop`) · `PATCH /workshops/applications/:id/status` |
| Blog | `GET /blog` · `GET /blog/:id` · `POST /blog` · `PUT /blog/:id` · `DELETE /blog/:id` |
| FAQs | `GET /faqs` · `GET /faqs/:id` · `POST /faqs` · `PUT /faqs/:id` · `DELETE /faqs/:id` |
| Testimonials | `GET /testimonials` · `GET /testimonials/:id` · `POST /testimonials` · `PUT /testimonials/:id` · `DELETE /testimonials/:id` |
| Enquiries (leads) | `GET /enquiries` (query: `status`, `search`) · `GET /enquiries/:id` · `PATCH /enquiries/:id` (status/notes) · `DELETE /enquiries/:id` |
| Settings | `GET /settings` · `PUT /settings` |
| Uploads | `POST /uploads` (field `image`) · `POST /uploads/multiple` (field `images`, max 10) · `DELETE /uploads/:filename` |
| Dashboard | `GET /dashboard` — counts for films/blog/crew/workshops/enquiries, used to power the admin home screen |
| Admin accounts | `GET /admins` · `PATCH /admins/:id` · `DELETE /admins/:id` — **superadmin only** |

All list endpoints that can grow large (`films`, `blog`, `workshops
applications`, `enquiries`) support `?page=` and `?limit=` and return a
`meta` block with pagination info.

## Example requests

**Login**
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@theweddingfilmer.com","password":"ChangeMe@123"}'
```

**Create a film (admin)**
```bash
curl -X POST http://localhost:5000/api/v1/admin/films \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "couple": "Maya & Thomas",
    "location": "Santorini, Greece",
    "eventDate": "2024-09-12",
    "teaser": "A cliffside chapel and a sea the color of ink.",
    "category": "Destination",
    "coverImage": "https://example.com/maya-thomas-cover.jpg"
  }'
```

**Upload an image (admin)**
```bash
curl -X POST http://localhost:5000/api/v1/admin/uploads \
  -H "Authorization: Bearer <token>" \
  -F "image=@/path/to/photo.jpg"
```
Response `data.url` (e.g. `/uploads/1721650000-photo.jpg`) is served
statically from the API at that same path — store that URL on whichever
resource the image belongs to (`coverImage`, `photo`, `gallery`, etc.).

**Submit a contact enquiry (public)**
```bash
curl -X POST http://localhost:5000/api/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"names":"Priya & Arjun","email":"priya@example.com","message":"Hi! We are getting married in Jaipur in Feb."}'
```

## Notes on verification

In this sandbox there was no reachable MongoDB instance and no internet
access to download one, so the API was verified with:
- a syntax check (`node --check`) across every source file,
- loading `src/app.js` directly to confirm all routers mount without error.

It has **not** been exercised against a live database here. Before you rely
on it, run `npm run dev` locally against a real (or Atlas) MongoDB instance,
then `npm run seed` and walk through the example requests above — that will
exercise the full auth → CRUD → validation → error-handling path end to end.

## Connecting the frontend

The Next.js site built earlier expects its own data currently (static
`lib/films.ts`, etc.). To wire it to this API, replace those static arrays
with `fetch()` calls to `NEXT_PUBLIC_API_URL` (e.g.
`${NEXT_PUBLIC_API_URL}/api/v1/films`), and set `CLIENT_URL` in this
backend's `.env` to wherever the Next.js app runs so CORS allows it.
