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
import { environment } from '../../../../environment/environment';
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
  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  endpointForImage = environment.endpointForImage;

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

  // initForm(user: User) {
  //   this.form = new FormGroup({
  //     email: new FormControl(user.email),
  //     firstname: new FormControl(user.firstname),
  //     lastname: new FormControl(user.lastname),
  //     birthdate: new FormControl(user.birthdate),
  //     profile_picture: new FormControl((user.profile_picture)),
  //   });
  //   if(user.profile_picture){
  //     this.imagePreview = this.endpointForImage+user.profile_picture
  //   }
  // }

  initForm(user: User) {
    this.form = new FormGroup({
      email: new FormControl(user.email),
      firstname: new FormControl(user.firstname),
      lastname: new FormControl(user.lastname),
      birthdate: new FormControl(user.birthdate),
      profile_picture: new FormControl(user.profile_picture),
    });

    if (user.profile_picture) {
      this.imagePreview = this.endpointForImage + user.profile_picture;
    } else {
      this.imagePreview = null; // Évite d'afficher une image cassée
    }
  }


  // update() {
  //   this.loading = true;

  //   const formData = new FormData();
  //   formData.append('email', this.form.value.email);
  //   formData.append('firstname', this.form.value.firstname);
  //   formData.append('lastname', this.form.value.lastname);
  //   formData.append('birthdate', this.form.value.birthdate);

  //   if (this.selectedFile) {
  //     formData.append('profile_picture', this.selectedFile);
  //   }

  //   this.authService.update(formData).subscribe(
  //     (response: any) => {
  //       this.user = response.user;
  //       this.authService.setCurrentUserValue(this.user);
  //       this.loading = false;
  //     },
  //     (err) => {
  //       this.loading = false;
  //       this.isConnected = true;
  //     }
  //   );
  // }

  update() {
    this.loading = true;

    const formData = new FormData();
    formData.append('email', this.form.value.email);
    formData.append('firstname', this.form.value.firstname);
    formData.append('lastname', this.form.value.lastname);
    formData.append('birthdate', this.form.value.birthdate);

    if (this.selectedFile) {
      formData.append('profile_picture', this.selectedFile);
    }

    this.authService.update(formData).subscribe(
      (response: any) => {
        this.user = response.user;
        this.authService.setCurrentUserValue(this.user);
        this.loading = false;

        // ✅ Mettre à jour l’aperçu avec la nouvelle image si elle a été changée
        if (response.user.profile_picture) {
          this.imagePreview = this.endpointForImage + response.user.profile_picture;
        }
      },
      (err) => {
        this.loading = false;
        this.isConnected = true;
      }
    );
  }



  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;

      // Lire l'image et générer un aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
