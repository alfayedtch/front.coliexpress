import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PrivilegeService } from '../../../../services/privilege/privilege.service';
import { RoleService } from '../../../../services/role/role.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
  standalone:true,
  imports:[FormsModule,ReactiveFormsModule,CommonModule]
})
export class RoleCreateComponent implements OnInit {
  roleForm!: FormGroup;
  privilegesList: any[] = []; // Liste des privilèges depuis l'API
  loading = false;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private privilegeService: PrivilegeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      libelle: ['', Validators.required],
      code: ['', Validators.required],
      privileges: this.fb.array([]) // Liste des privilèges sélectionnés
    });

    this.loadPrivileges();
  }

  // Charger les privilèges depuis l'API
  loadPrivileges() {
    this.privilegeService.getPrivileges().subscribe((response:any) => {
      this.privilegesList = response.privileges;
    });
  }

  // Gérer la sélection des privilèges
  onPrivilegeChange(privilegeId: number, event: any) {
    const privilegesArray = this.roleForm.get('privileges') as FormArray;

    if (event.target.checked) {
      privilegesArray.push(new FormControl(privilegeId));
    } else {
      const index = privilegesArray.controls.findIndex(x => x.value === privilegeId);
      privilegesArray.removeAt(index);
    }
  }

  // Créer un rôle
  createRole() {
    if (this.roleForm.invalid) {
      return;
    }
    this.loading = true;

    this.roleService.createRole(this.roleForm.value).subscribe(
      () => this.router.navigateByUrl('/admin/role'),
      () => this.loading = false
    );
  }
}
