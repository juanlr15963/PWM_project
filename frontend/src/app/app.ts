import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Agregamos el SDK de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjQ9AskXo0Pp85o8cGPeh44HnmP-mhkAE",
  authDomain: "pwm-project-aced1.firebaseapp.com",
  projectId: "pwm-project-aced1",
  storageBucket: "pwm-project-aced1.firebasestorage.app",
  messagingSenderId: "402725037450",
  appId: "1:402725037450:web:eb4f89d34edfefbe1b1473",
  measurementId: "G-YYF31YP9SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
