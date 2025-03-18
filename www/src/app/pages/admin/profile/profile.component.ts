import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { User } from '../../../interfaces/user';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  user!: User;
  loading = false;
  isConnected = false;
  form!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(
      (currentUser) => (this.user = currentUser)
    );
  }

  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(
      (response: any) => {
        this.user = response.user;
        this.initForm(this.user);
      },
      (err) => {}
    );
  }

  initForm(user: User) {
    this.form = new FormGroup({
      email: new FormControl(user.email),
      firstname: new FormControl(user.firstname),
      lastname: new FormControl(user.lastname),
      birthdate: new FormControl(user.birthdate),
    });
  }

  update() {
    this.loading = true;
    this.authService.update(this.form.value).subscribe(
      (response: any) => {
        this.user = response.user;
        this.authService.setCurrentUserValue(this.user);
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.isConnected = true;
      }
    );
  }
}
