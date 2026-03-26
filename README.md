Real-Time Messaging API

A scalable real-time messaging backend built with Node.js, Express, Socket.IO, MongoDB, and Redis.

🚀 Features
🔐 JWT Authentication (Access + Refresh Tokens)
💬 Real-time messaging with Socket.IO
📦 Persistent message storage (MongoDB)
📊 Message status (sent → delivered → read)
📂 Conversations with last message preview
📜 Pagination for message history
🟢 Online/Offline presence tracking
🧪 Fully tested (Jest + Supertest)
🐳 Docker support


🛠 Tech Stack
Node.js + Express
MongoDB (Mongoose)
Redis (ioredis)
Socket.IO
JWT Authentication
Docker


⚙️ Environment Variables

Create .env file:
PORT=3000
MONGO_URI=mongodb://mongo:27017/chatapp
JWT_SECRET=secret
JWT_REFRESH_SECRET=refreshsecret
REDIS_HOST=redis
REDIS_PORT=6379



🐳 Run with Docker
docker-compose up --build
Services
Service	Port
App	3000
MongoDB	27017
Redis	6379


🔌 API Endpoints
🔐 Auth
Method	Endpoint
POST	/auth/register
POST	/auth/login
POST	/auth/refresh
💬 Messages
Method	Endpoint
POST	/messages/send
GET	/messages/
GET	/messages

⚡ WebSocket Usage
🔐 Connect with JWT
const socket = io("http://localhost:3000", {
  auth: { token: "YOUR_JWT_TOKEN" }
});

🧪 Testing
npm test

✔ Auth tests
✔ Message API tests
✔ Pagination
✔ Socket connection
✔ Real-time messaging

🔄 Message Flow
User sends message
Message saved in MongoDB
If receiver online:
Delivered instantly via Socket.IO
Status → delivered
When opened:
Status → read
📁 Project Structure
src/
├── config/
├── models/
├── middleware/
├── controllers/
├── routes/
├── sockets/
├── utils/
└── app.js

tests/
docker-compose.yml
Dockerfile
🔐 Security
Password hashing with bcrypt
JWT authentication for APIs & sockets
Protected routes via middleware
⚠️ Notes
App runs on PORT 3000
Redis used for scaling sockets
MongoDB used for persistence
Docker setup included

DOCKER SUPPORT
Docker configuration is included in this project:

Dockerfile
docker-compose.yml

You can run the application using:

docker-compose up --build
⚠️ Note

Docker setup is provided but was not executed locally due to OS limitations.
However, the configuration is complete and should work correctly in a supported environment.

AUTHOR
APARNA

