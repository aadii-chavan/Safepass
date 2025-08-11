# SafePass

A modern emergency profile and medical information manager for first responders and individuals. Built with React, TypeScript, Firebase, and Tailwind CSS.

## 🚀 Features
- Secure authentication (email/password)
- Create, update, and manage emergency medical profiles
- Add emergency contacts and medical info
- Public profile sharing via QR code
- Password reset functionality
- Responsive, mobile-friendly UI

## 🛠️ Tech Stack
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) (Auth, Firestore, Storage)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 🔒 Security Notes
- **No secrets or API keys are committed to the repo.**
- All Firebase config is loaded from environment variables via `.env` (see below).
- Firestore rules are included, but you must review and secure them for production.
- Do not expose sensitive data in public profiles.

## 📦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/aadii-chavan/Safepass.git
cd Safepass
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
- Copy `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- Fill in your Firebase project credentials in `.env`:
  ```env
  VITE_FIREBASE_API_KEY=your_firebase_api_key
  VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
  VITE_FIREBASE_PROJECT_ID=your_project_id
  VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
  VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
  VITE_FIREBASE_APP_ID=your_app_id
  ```
- **Never commit your `.env` file!**

### 4. Firebase Setup
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable **Authentication** (Email/Password)
- Create a **Firestore Database**
- (Optional) Enable **Storage** for profile pictures
- Set your Firestore security rules (see `firestore.rules` in this repo)

### 5. Run the App
```bash
npm run dev
```
- The app will be available at `http://localhost:5173` (or as shown in your terminal)

## ⚙️ Project Structure
```
SAFEPASS/
├── src/
│   ├── components/         # React components (Auth, Dashboard, Profile, etc.)
│   ├── contexts/           # React context providers (AuthContext)
│   ├── lib/                # Firebase config and services
│   ├── types/              # TypeScript types
│   └── index.css           # Tailwind CSS
├── firestore.rules         # Firestore security rules
├── .env.example           # Example environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project metadata and scripts
└── README.md              # This file
```

## 🧑‍💻 Contributing
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📝 License
MIT

## 📢 Notes
- For production, review and harden your Firestore security rules.
- Never expose sensitive medical or personal data in public profiles.
- For questions or support, open an issue or contact the maintainer.
