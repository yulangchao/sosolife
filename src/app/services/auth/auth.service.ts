import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;
  public userInfo: any;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.user = afAuth.authState;
    let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
    this.userInfo = JSON.parse(localStorage.getItem(id));
  }

  googleLogin() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  facebookLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (res) => {
           let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
           this.userInfo = JSON.parse(localStorage.getItem(id));
           setTimeout(_ => {
            this.router.navigate(['/']);
          },1000);
      },
      (error) => {
      }
    );
  }

  logout() {
    this.userInfo = null;
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  login(values){
       return firebase.auth().signInWithEmailAndPassword(values.email, values.password);
  }

  register(values) {
    this.afAuth.auth.createUserWithEmailAndPassword(values.email, values.password).then(
      (user) => {
      // Handle Errors here.
      user.updateProfile({
          displayName: values.nickname,
          photoURL: '/assets/img/singed.jpg'
      }).then(function() {
          // Update successful.
      }, function(error) {
          // An error happened.
      });
      user.sendEmailVerification().then( () => {
           let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]; 
           this.userInfo = JSON.parse(localStorage.getItem(id));
           this.router.navigate(['/']);
      },
      (error) => {
      });

    });
  }

  resetPassword(email: string) {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
}
