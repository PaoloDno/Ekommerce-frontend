
#                     Ekommerce — Full Stack                   #
#                  MERN E-Commerce Application                #

Ekommerce is a full-stack e-commerce platform built using the MERN stack — MongoDB, Express.js, React (Vite), and Node.js.
It provides the foundation for an online store with product browsing, shopping cart, and user authentication.

Both frontend and backend are separate repositories under GitHub (PaoloDno) and are designed to work together.

#                         Architecture                         #

Ekommerce
├── Frontend (React + Vite) — UI + User interactions
├── Backend (Node.js + Express) — REST API + business logic
└── MongoDB — NoSQL database for storing users, products, carts, etc.

#                        Repositories                          #

# Frontend
URL: https://github.com/PaoloDno/Ekommerce-frontend

Features:
- Product listing
- Product details
- Cart interactions
- User login / registration
- Redux / state management
- API communication with backend

Structure:
- src/ — React components, pages, state management
- public/ — static assets
- vite.config.js — Vite configuration

# Backend
URL: https://github.com/PaoloDno/Ekommerce-backend

Features:
- Product CRUD operations
- User authentication (JWT)
- Cart and order logic
- Database connection (MongoDB)

Structure:
- controllers/ — route controllers
- routes/ — API routes
- models/ — Mongoose models
- middlewares/ — authentication and error handling
- server.js — entrypoint for the Express server

#                           Features                            #

- Full Stack MERN architecture
- RESTful API for products, users, carts, authentication
- React UI with Redux state management
- JWT authentication
- Ready for deployment (Render, Vercel, Netlify)

#                        Installation                           #

Replace YOUR_MONGO_URI with your MongoDB Atlas connection string.

# Backend (Local)
git clone https://github.com/PaoloDno/Ekommerce-backend.git
cd Ekommerce-backend
npm install
# create .env with:
# MONGO_URI=mongodb+srv://YOUR_MONGO_URI
# JWT_SECRET=your_secret
npm run dev

# Frontend (Local)
git clone https://github.com/PaoloDno/Ekommerce-frontend.git
cd Ekommerce-frontend
npm install
# create .env with:
# VITE_API_URL=http://localhost:5000/kommerce
npm run dev

#                   Environment Variables                       #

# Backend .env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Frontend .env
VITE_API_URL=http://localhost:5000/kommerce

On production (Render), set VITE_API_URL to your deployed backend URL.

#                          Deployment                            #

# Backend (Render)
1. Connect the backend repository to Render
2. Set build/start commands:
   Build: npm install
   Start: npm start
3. Add environment variables (MONGO_URI, JWT_SECRET) in Render UI
4. Backend will be live on https://your-app.onrender.com

# Frontend (Render)
1. Deploy as a Static Site
2. Build command: npm install && npm run build
3. Publish directory: dist
4. Set environment variable: VITE_API_URL=https://your-backend.onrender.com/kommerce
5. Deploy

#                            Usage                               #

Once deployed:
- Browse products
- Register/Login users
- Add items to cart
- API calls use import.meta.env.VITE_API_URL
- Redux state handles UI interactions

#                        Contributions                           #

Contributions are welcome:
- Improve UI/UX
- Add payment processing (Stripe, PayPal)
- Add admin panel
- Add order history

#                           License                               #

This project is open source and free to use/modify.
