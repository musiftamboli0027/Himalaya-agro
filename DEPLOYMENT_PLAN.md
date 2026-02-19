# Deployment Implementation Plan - Himalaya Agro

This document outlines the steps to prepare and deploy the Himalaya Agro application (Backend, Frontend, and Admin Panel).

## 1. Environment Configuration
### Backend (`/backend/.env`)
Ensure the following variables are set for production:
- `NODE_ENV=production`
- `PORT=5000`
- `MONGO_URI`= (Your production MongoDB Atlas string)
- `JWT_SECRET`= (A strong random string)
- `CLOUDINARY_CLOUD_NAME`= (Your Cloudinary name)
- `CLOUDINARY_API_KEY`= (Your API key)
- `CLOUDINARY_API_SECRET`= (Your API secret)

### Frontend (`/frontend/.env`)
- `VITE_API_URL`= (The URL of your deployed backend, e.g., `https://himalaya-api.onrender.com`)

### Admin Panel (`/admin/.env`)
- `VITE_API_URL`= (The same URL as above + `/api`, e.g., `https://himalaya-api.onrender.com/api`)

## 2. Code Adjustments for Production
- **CORS Handling**: Update `backend/app.js` to restrict origins to your production frontend domains.
- **Frontend Paths**: Ensure all internal links use relative paths.
- **Static Asset Serving**: If deploying as a single unit, configure the backend to serve the `frontend/dist` and `admin/dist` directories.

## 3. Platform Specific Setup

### Render (Backend)
1. **New Web Service**: Connect your GitHub repo.
2. **Root Directory**: `backend`
3. **Build Command**: `npm install`
4. **Start Command**: `node server.js`
5. **Environment Variables**:
   - `MONGO_URI`: (Your Atlas connection string)
   - `JWT_SECRET`: (Any long random string)
   - `NODE_ENV`: `production`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `FRONTEND_URL`: `https://your-himalaya-site.netlify.app`

### Netlify (Frontend & Admin)
You should create **two** separate sites on Netlify:

#### Site 1: Customer Frontend
1. **New Site from Git**: Connect your repo.
2. **Base directory**: `frontend`
3. **Build command**: `npm run build`
4. **Publish directory**: `frontend/dist`
5. **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend-on-render.onrender.com`

#### Site 2: Admin Dashboard
1. **New Site from Git**: Connect your repo.
2. **Base directory**: `admin`
3. **Build command**: `npm run build`
4. **Publish directory**: `admin/dist`
5. **Environment Variables**:
   - `VITE_API_URL`: `https://your-backend-on-render.onrender.com`

## 4. Troubleshooting
- **404 on Refresh**: I have added a `_redirects` file in both `frontend/public` and `admin/public`. Netlify will use this to ensure React Router handles the routing.
- **Backend Spin-up**: Render's free tier "sleeps" after 15 mins of inactivity. The first request might take 30-50 seconds to respond.

## 5. Security Checklist
- [ ] Remove `registerAdmin` endpoint or protect it with a secret key.
- [ ] Use HTTPS for all connections.
- [ ] Ensure `JWT_SECRET` is not committed to version control.
