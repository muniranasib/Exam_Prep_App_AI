# Enable Google sign-in and cross-device sync

The app code is prepared for Firebase Authentication + Cloud Firestore. A Firebase project must be created and configured by the app owner; this ZIP cannot create or access a cloud project on your behalf.

## 1. Create a Firebase project
1. Open https://console.firebase.google.com/ and choose **Add project**.
2. Give it a name such as `dave3625-exam-trainer`.
3. In Project Overview, add a **Web app**.
4. Copy the Firebase web config values into `firebase-config.js` (apiKey, authDomain, projectId, appId).

## 2. Enable Google login
1. Firebase Console -> Build -> Authentication -> Get started.
2. Sign-in method -> Google -> Enable -> Save.
3. Authentication -> Settings -> Authorized domains: add your GitHub Pages host, e.g. `YOUR-GITHUB-USERNAME.github.io`.

## 3. Create the database
1. Build -> Firestore Database -> Create database.
2. Start in production mode.
3. Open the Rules tab and replace the rules with the contents of `firestore.rules`, then Publish.

## 4. Publish
Upload all files in this folder to the root of the existing GitHub repository, replacing the old files. Keep `index.html`, `cloud-sync.js`, `firebase-config.js`, `manifest.json`, `sw.js`, and the icons at the repository root.

## 5. Test
1. Open the published GitHub Pages URL on your PC.
2. Click **Continue with Google** and sign in.
3. Start a quiz, answer a question, and wait a few seconds.
4. Open the same URL on your iPhone (Safari or Chrome) and sign in with the same Google account.
5. Your latest saved attempt and quiz history should load.

## Important
- Until Firebase is configured and published, the app continues to use browser-local storage only.
- Google sign-in inside the app is separate from being signed into Chrome.
- The database rules ensure each signed-in user can only read/write their own progress.
- Firebase web config is not a password; access is protected by Authentication and Firestore Security Rules. Never publish service-account private keys.
- This first sync uses a single latest-progress record per Google account. If you use two devices simultaneously, the most recently saved snapshot wins; avoid editing the same unfinished quiz on both devices at once.
