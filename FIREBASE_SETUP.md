# Firebase Setup Guide for SafePass

## ✅ Current Status
Firebase is already integrated into your project with the following services:

- **Authentication** - User login/signup
- **Firestore Database** - Profile storage
- **Storage** - File uploads (ready for profile pictures)

## 🔧 Firebase Console Setup

### 1. Enable Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `my-life-id`
3. Navigate to **Authentication** → **Sign-in method**
4. Enable **Email/Password** authentication
5. Optionally enable other providers (Google, Facebook, etc.)

### 2. Set Up Firestore Database
1. Go to **Firestore Database** in Firebase Console
2. Click **Create database**
3. Choose **Start in test mode** (for development)
4. Select a location close to your users
5. Create the database

### 3. Configure Security Rules
1. In Firestore Database, go to **Rules** tab
2. Replace the default rules with the contents of `firestore.rules` in this project
3. Click **Publish**

### 4. Enable Storage (Optional)
1. Go to **Storage** in Firebase Console
2. Click **Get started**
3. Choose **Start in test mode**
4. Select a location
5. Create storage bucket

## 🚀 Testing the Integration

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Test Authentication
1. Open the app in your browser
2. Try creating a new account
3. Try logging in with existing credentials
4. Verify the authentication state persists

### 3. Test Profile Creation
1. Create a profile after logging in
2. Verify the profile is saved to Firestore
3. Check the Firebase Console to see the data

### 4. Test Public Profile Access
1. Copy the public URL from your profile
2. Open the URL in an incognito window
3. Verify the profile loads correctly

## 📊 Monitoring

### Firebase Console
- **Authentication** → **Users**: View registered users
- **Firestore Database** → **Data**: View stored profiles
- **Analytics**: Track app usage (if enabled)

### Local Development
- Check browser console for any Firebase errors
- Use Firebase Emulator Suite for local development

## 🔒 Security Considerations

### Current Security Rules
- Users can only read/write their own profiles
- Emergency profiles are publicly readable (for first responders)
- Authentication is required for profile creation/updates

### Recommended Enhancements
1. **Rate Limiting**: Implement API rate limiting
2. **Data Validation**: Add server-side validation
3. **Audit Logging**: Track profile access
4. **Encryption**: Consider encrypting sensitive medical data

## 🛠️ Troubleshooting

### Common Issues

1. **Authentication Errors**
   - Check if Email/Password auth is enabled
   - Verify Firebase config in `src/lib/firebase.ts`

2. **Firestore Permission Errors**
   - Ensure security rules are published
   - Check if user is authenticated

3. **Profile Not Loading**
   - Check browser console for errors
   - Verify Firestore database is created
   - Check network connectivity

### Debug Mode
Add this to your Firebase config for debugging:
```javascript
// In src/lib/firebase.ts
if (process.env.NODE_ENV === 'development') {
  console.log('Firebase config:', firebaseConfig);
}
```

## 📈 Next Steps

1. **Production Deployment**
   - Update security rules for production
   - Enable Firebase Analytics
   - Set up monitoring and alerts

2. **Feature Enhancements**
   - Profile picture uploads using Firebase Storage
   - Real-time profile updates
   - Push notifications for profile changes

3. **Performance Optimization**
   - Implement data caching
   - Add offline support
   - Optimize queries

## 🔗 Useful Links

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Storage](https://firebase.google.com/docs/storage) 