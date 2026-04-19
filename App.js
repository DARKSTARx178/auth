import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    //ADD YOUR OWN!!!
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, authentication } = response;

      const credential = GoogleAuthProvider.credential(
        id_token || null,
        authentication?.accessToken || null
      );

      signInWithCredential(auth, credential).catch(error => {
        console.error("Firebase Sign-In Error:", error);
      });
    }
  }, [response]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {user ? (
        <View style={styles.content}>
          <Text style={styles.title}>Logged in as: {user.displayName}</Text>
          {user.photoURL && <Image source={{ uri: user.photoURL }} style={styles.avatar} />}
          <Button title="Sign Out" onPress={() => signOut(auth)} color="#ff4444" />
        </View>
      ) : (
        <Button
          disabled={!request}
          title="Sign in with Google"
          onPress={() => promptAsync()}
        />
      )}
    </View>
  );
}

const styles = {
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  content: { alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 15 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 20 }
};
