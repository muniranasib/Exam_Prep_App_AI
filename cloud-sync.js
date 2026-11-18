import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js';
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';

const $ = id => document.getElementById(id);
const status = (title, detail, notice) => {
  $('accountTitle').textContent = title;
  $('accountStatus').textContent = detail;
  $('syncNotice').textContent = notice || '';
};
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith('PASTE_') ||
    !firebaseConfig.projectId || firebaseConfig.projectId.startsWith('PASTE_')) {
  status('Google sync needs setup', 'The app is prepared, but Firebase project settings have not been added yet.',
    'Local saving still works. Follow FIREBASE_SETUP.md to enable cross-device sync.');
  $('googleSignIn').disabled = true;
} else {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  let currentUser = null;
  let syncTimer = null;
  let applyingRemote = false;

  async function upload(data) {
    if (!currentUser || applyingRemote) return;
    await setDoc(doc(db, 'users', currentUser.uid, 'private', 'studyProgress'), {
      attempt: data.attempt || null,
      history: data.history || [],
      updatedAt: data.updatedAt || Date.now(),
      serverUpdatedAt: serverTimestamp()
    });
    status('Synced to your Google account', currentUser.email || 'Signed in',
      'Your quiz history and current progress are backed up and available on your other signed-in devices.');
  }
  window.cloudSyncSave = data => {
    if (!currentUser || applyingRemote) return;
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => upload(data).catch(err => {
      console.error('Cloud sync failed', err);
      status('Sync problem', err.message, 'Your local progress is still saved in this browser. Check your Firebase setup and internet connection.');
    }), 700);
  };
  $('googleSignIn').addEventListener('click', async () => {
    try { await signInWithPopup(auth, provider); }
    catch (err) {
      console.error(err);
      status('Google sign-in failed', err.message, 'Check that Google sign-in is enabled and this website domain is authorised in Firebase Authentication.');
    }
  });
  $('googleSignOut').addEventListener('click', () => signOut(auth));
  onAuthStateChanged(auth, async user => {
    currentUser = user;
    $('googleSignIn').style.display = user ? 'none' : '';
    $('googleSignOut').style.display = user ? '' : 'none';
    if (!user) {
      status('Sync your progress across devices', 'Sign in with Google to use the same quiz history on PC, iPhone and tablet.',
        'Signed out: progress remains on this device until you sign in again.');
      return;
    }
    status('Loading your saved progress…', user.email || 'Google account', 'Connecting to your private cloud record.');
    try {
      const ref = doc(db, 'users', user.uid, 'private', 'studyProgress');
      const snap = await getDoc(ref);
      const local = window.getLocalSyncData() || {};
      if (!snap.exists()) {
        await upload(local);
      } else {
        const remote = snap.data();
        if ((local.updatedAt || 0) > (remote.updatedAt || 0)) await upload(local);
        else {
          applyingRemote = true;
          window.applyCloudSyncData(remote);
          applyingRemote = false;
          status('Progress synced', user.email || 'Google account',
            'Your latest quiz history and unfinished attempt have been loaded from the cloud.');
        }
      }
    } catch (err) {
      applyingRemote = false;
      console.error('Initial sync failed', err);
      status('Could not sync', err.message, 'Local progress remains available. Check Firestore rules, authorised domains and Firebase configuration.');
    }
  });
}
