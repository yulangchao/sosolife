import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastComponent } from './shared/toast/toast.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isLogPage = true;
  loginForm;
  registerForm;
  message;
  ifOut = true;
  showDrop = true;
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private authService: AuthService, private fb: FormBuilder, public toast: ToastComponent) {
    if (authService.userInfo == null) {
      this.showDrop = true;
    } else {
      this.showDrop = false
    }
    this.loginForm = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
    this.registerForm = fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      reapeatpassword: ['', Validators.required]
    });

  }

  logOut() {
    this.authService.logout();
    this.toast.setMessage("Log out successfully.", 'success');
    this.showDrop = true;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();

  }

  googleLogin() {
    this.authService.googleLogin().then(
      (res) => {
        this.toast.setMessage("Now loging in!", 'success', true, 1000);
        this.authService.router.navigate(['/']);
        let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
        this.authService.userInfo = JSON.parse(localStorage.getItem(id));
      },
      (error) => {
      }
    )
  }



  login(value: any) {
    this.ifOut = true;
    if ((this.loginForm.hasError('email', 'email') && this.loginForm.get('email').touched) || value.email == "") {
      this.toast.setMessage("Please enter the correct email, this email not valid.", 'success');
      return;
    }
    if (value.password.length < 8) {
      this.toast.setMessage("Password is >=8 digitals.", 'success');
      return;
    }
    this.authService.login(value).then(
      (res) => {
        let id = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
        this.authService.userInfo = JSON.parse(localStorage.getItem(id));
        this.toast.setMessage("Now loging in!", 'success', true);
        this.authService.router.navigate(['/']);
        this.showDrop = false;
      },
      (error) => {
        this.toast.setMessage(error.message, 'success');
      }

    )

  }

  register(value: any) {
    this.ifOut = false;
    if ((this.registerForm.hasError('email', 'email') && this.registerForm.get('email').touched) || value.email == "") {
      this.toast.setMessage("Please enter the correct email, this email not valid.", 'success');
      return;
    }
    if (value.password.length < 8) {
      this.toast.setMessage("Password is >=8 digitals.", 'success');
      return;
    }
    if (value.password != value.reapeatpassword) {
      this.toast.setMessage("Password is not matched.", 'success');
      return;
    }
    this.authService.register(value);
    this.closeModal();
    this.ifOut = true;
    this.toast.setMessage("Register successfully and now loging in!", 'success', true);

  }

  forgetPassword() {
    if (this.loginForm.value.email == "") {
      this.toast.setMessage("Please enter the correct email in the login area for resetting a new password.", 'info');
      return;
    }

    if ((this.loginForm.hasError('email', 'email') && this.loginForm.get('email').touched)) {
      this.toast.setMessage("Please enter the correct email in the login area for resetting a new password, this email not valid.", 'warning');
      return;
    }

    this.authService.resetPassword(this.loginForm.value.email);
  }
}
