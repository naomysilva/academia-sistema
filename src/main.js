import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import App from './App.vue';
import router from './router';

const firebaseConfig = {
    apiKey: "AIzaSyBAqgWxvlsoqmuV3lfiY3cvJzAhYwsZEPI",
    authDomain: "projeto-academia-2c5bf.firebaseapp.com",
    projectId: "projeto-academia-2c5bf",
    storageBucket: "projeto-academia-2c5bf.appspot.com",
    messagingSenderId: "668332075464",
    appId: "1:668332075464:web:4b69a2f1f90f1fa50f38fd"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

createApp(App).use(router).mount('#app');
export { auth };
