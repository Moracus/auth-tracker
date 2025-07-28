# 🛡️ Auth Tracker - Chrome Extension
<img width="1875" height="981" alt="image" src="https://github.com/user-attachments/assets/5d69b081-132f-468f-8fd9-7f7f9653b3e5" />


A Chrome Extension that tracks login activity across websites — including both **regular email/password logins** and **OAuth logins** (Google, Facebook, GitHub, Microsoft, etc.).

Built with **MERN (MongoDB, Express, React, Node.js)** + **Vite + Tailwind CSS**.

---

## 🚀 Features

- 🔍 Detects login forms on websites
- 🧠 Smart detection of OAuth providers (Google, Facebook, etc.)
- 💾 Tracks:
  - Login method (`email` or `oauth`)
  - Credential used (email or OAuth provider)
  - Usage count
  - Last used date
- 🔔 Popup UI displays previously used login methods on each domain
- 📋 One-click `Copy` email or `Use This` for OAuth

---

## 🏗️ Tech Stack

- **Frontend:** Vite + React + Tailwind CSS (extension popup)
- **Backend:** Express.js + MongoDB (API to store login activity)
- **Extension APIs:** Chrome Manifest V3, Content Scripts

---

## Local setup and run
# 1. Clone and install
```
git clone https://github.com/your-username/oauth-tracker-extension.git
cd auth-tracker
cd frontend
npm install
```
# 2. Build and install
```
npm run build
```
# 3. Load Extension into Chrome
- Go to chrome://extensions

- Enable Developer mode

- Click "Load unpacked" and select the /dist folder
# 4. Run Backend
```
cd backend
npm install
npm run dev
```
### Enviroment variables
crate a .env file in frontend/ and backend/
1. In frontend VITE_BACKENDURL=http://localhost:5000
2. In backend:
   ```
   MONGO_URL =
  ```
