// Simple backend using Firebase (free tier)
// Add this script tag to your HTML: <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
// Add this script tag to your HTML: <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>

// Firebase configuration (replace with your config)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Replace localStorage functions with Firebase functions
class MemeStorage {
  static async saveMemes(memes) {
    // Save to Firestore instead of localStorage
    try {
      const docRef = await addDoc(collection(db, "memes"), {
        memes: memes,
        timestamp: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving memes:", error);
    }
  }

  static async loadMemes() {
    // Load from Firestore instead of localStorage
    try {
      const querySnapshot = await getDocs(collection(db, "memes"));
      let allMemes = [];
      querySnapshot.forEach((doc) => {
        allMemes = allMemes.concat(doc.data().memes || []);
      });
      return allMemes;
    } catch (error) {
      console.error("Error loading memes:", error);
      return [];
    }
  }

  static async addMeme(meme) {
    try {
      await addDoc(collection(db, "memes"), meme);
    } catch (error) {
      console.error("Error adding meme:", error);
    }
  }

  static async deleteMeme(memeId) {
    try {
      await deleteDoc(doc(db, "memes", memeId));
    } catch (error) {
      console.error("Error deleting meme:", error);
    }
  }
}