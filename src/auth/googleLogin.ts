//import * as Google from 'expo-auth-session/providers/google';
//import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
//import { auth } from '../services/firebaseConfig';

//export const googleSignIn = async () => {
 // const [request, response, promptAsync] = Google.useAuthRequest({
 //   expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
 // });

 // if (response?.type === 'success') {
  //  const { id_token } = response.params;
  //  const credential = GoogleAuthProvider.credential(id_token);
 //   await signInWithCredential(auth, credential);
 // }

//  return promptAsync();
//};