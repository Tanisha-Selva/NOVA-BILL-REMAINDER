# 🔔 NOVA Bill Reminder

**NOVA Bill Reminder** is a smart utility tracking and bill management web application. Designed for efficiency and seamless organization, it allows users to track upcoming bills, secure their accounts with robust identity management, and store bill receipts safely in the cloud.

---

## 🛠️ Integrated Services & Tech Stack

### **1. Frontend & User Authentication**
* **React.js:** Dynamic and responsive user interface for managing bill items, tracking payment statuses, and navigating reminders.
* **Auth0:** Enterprise-grade identity provider handling user authentication, secure sign-ups, and session management.

### **2. Backend & API Services**
* **Express.js (Node.js):** RESTful backend API handling core utility operations, client requests, and integrations.
* **Vercel Serverless Functions:** Deployed endpoint routes ensuring scalable, serverless execution.

### **3. Database & Cloud Storage**
* **MongoDB Atlas (via Mongoose):** Cloud document database storing user profiles, bill schedules, due dates, and metadata securely.
* **Dropbox SDK:** Cloud file storage handling receipt image and document uploads safely via API integration.

### **4. Hosting & Deployment**
* **Vercel:** CI/CD production hosting platform delivering lightning-fast client delivery and serverless API routing.

---

## 🔐 Security & Best Practices

* **Zero Hardcoded Credentials:** Sensitive parameters and connection keys are excluded from version control using `.gitignore`.
* **Environment-Isolated Secrets:** Local development uses secure `.env` properties, while production environments leverage Vercel's encrypted environment variables.
* **Token-Based Auth:** Secure protocol routing through Auth0 ensures restricted access to private user data.

---

## ⚙️ Environment Variables Setup

Configure the following key-value pairs in your `.env` file for local development or within the **Vercel Project Settings > Environment Variables**:

| Variable Key | Type | Description |
| :--- | :--- | :--- |
| `MONGODB_URI` | Secret | Connection string for MongoDB Atlas database |
| `DROPBOX_ACCESS_TOKEN` | Secret | Access token for Dropbox API receipt uploads |
| `REACT_APP_AUTH0_DOMAIN` | Config | Your Auth0 tenant domain (e.g., `dev-xxxx.us.auth0.com`) |
| `REACT_APP_AUTH0_CLIENT_ID` | Config | Your Auth0 Application Client ID |

---

## 🔑 Auth0 Dashboard Configuration

To ensure successful authentication on live deployments and local development, register the following paths under your Auth0 Application Settings (**Applications > Applications > NOVA Bill Reminder > Application URIs**):

* **Allowed Callback URLs:**
  ```text
  http://localhost:3000, http://localhost:5001, https://nova-bill-remainder.vercel.app, https://nova-bill-remainder.vercel.app/
  ```
* **Allowed Logout URLs:**
  ```text
  http://localhost:3000, http://localhost:5001, https://nova-bill-remainder.vercel.app
  ```
* **Allowed Web Origins:**
  ```text
  http://localhost:3000, http://localhost:5001, https://nova-bill-remainder.vercel.app
  ```

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** (v18 or higher)
* **npm** or **yarn**
* **MongoDB Atlas** cluster instance
* **Dropbox App** registered on the Dropbox Developer Console

### 1. Clone the Repository
```bash
git clone https://github.com/Tanisha-Selva/NOVA-BILL-REMAINDER.git
cd NOVA-BILL-REMAINDER
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
DROPBOX_ACCESS_TOKEN=your_dropbox_access_token
REACT_APP_AUTH0_DOMAIN=your_auth0_domain
REACT_APP_AUTH0_CLIENT_ID=your_auth0_client_id
```

### 4. Run the Application
```bash
npm run dev
# or
npm start
```

---

## ☁️ Deployment

The application is deployed live on **Vercel**:
1. Import the project repository into your Vercel Dashboard.
2. Add production environment variables (`MONGODB_URI`, `DROPBOX_ACCESS_TOKEN`, `REACT_APP_AUTH0_DOMAIN`, `REACT_APP_AUTH0_CLIENT_ID`) under **Settings > Environment Variables**.
3. Ensure your production and preview Vercel URLs are registered under your **Auth0 Application Allowed Callback, Logout, and Web Origins URLs**.
4. Trigger deployment via Git push or Vercel Dashboard redeploy.
