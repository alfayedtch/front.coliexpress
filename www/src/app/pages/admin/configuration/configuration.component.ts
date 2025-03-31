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
import { Configuration } from '../../../interfaces/configuration';
@Component({
  selector: 'app-configuration',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './configuration.component.html',
  styleUrl: './configuration.component.css',
})
export class ConfigurationComponent {
  user!: User;
  config!: Configuration;
  loading = false;
  isConnected = false;
  form!: FormGroup;
  logoPreview: string | ArrayBuffer | null = null;
  selectedLogoFile: File | null = null;
  endpointForImage = environment.endpointForImage;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(
      (currentUser) => (this.user = currentUser)
    );
  }

  ngOnInit(): void {
    this.authService.initConfig().subscribe(
      (response: any) => {
        this.config = response.configuration;
        this.initForm(this.config);
      },
      (err) => {}
    );
  }


  initForm(config: Configuration) {
    this.form = new FormGroup({
      slogan: new FormControl(config.slogan),
      logo: new FormControl(config.logo),

    });

    if (config.logo) {
      this.logoPreview = this.endpointForImage + config.logo;
    } else {
      this.logoPreview = null; // Évite d'afficher une image cassée
    }
  }


  update() {
    this.loading = true;

    const formData = new FormData();
    formData.append('slogan', this.form.value.slogan);

    if (this.selectedLogoFile) {
      formData.append('logo', this.selectedLogoFile);
    }

    this.authService.updateConfig(formData).subscribe(
      (response: any) => {
        this.config = response.configuration;
        this.loading = false;

        // ✅ Mettre à jour l’aperçu avec la nouvelle image si elle a été changée
        if (response.configuration.logo) {
          this.logoPreview = this.endpointForImage + response.configuration.logo;
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
      this.selectedLogoFile = file;

      // Lire l'image et générer un aperçu
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

}
