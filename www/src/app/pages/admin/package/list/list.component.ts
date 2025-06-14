import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router,NavigationExtras } from '@angular/router';
import { PackageService } from '../../../../services/package/package.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { User } from '../../../../interfaces/user';
import { AuthService } from '../../../../services/auth/auth.service';
import { Privilege } from '../../../../interfaces/privilege';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [TableModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit,OnChanges {
    user! : User | null;
  searchInputs = '';
  packages:any = [];
  originalPackages = [];
  constructor(
    private packageService: PackageService,
    private router:Router,
        private authService:AuthService

  ){
    this.authService.currentUser.subscribe(currentUser => this.user = currentUser)

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change',changes);

    if(this.searchInputs!== '' || this.searchInputs!==null || this.searchInputs!==undefined){
      this.packages.filter((packageItem:any) => {
       return packageItem.toString().includes(this.searchInputs);
      })
    }
  }

  ngOnInit(): void {
     this.authService.getUserByToken().subscribe(
      (response: any) => {this.user = response.user;},
    );
      this.getPackages();
  }
  public getPackages(){
    this.packageService.getQrode().subscribe(
      (response:any) => {
        this.packages = response.data;
        this.originalPackages = this.packages
      },
      err => {}
    )
  }

  goToEdit(packages:any){
    const navigationExtras: NavigationExtras = {
      state: {
        package: packages
      }};
    this.router.navigate(['admin/package/edit'], navigationExtras);
  }

  getPackagesByEventChange(event: any) {
    console.log(event.data);

    if (this.searchInputs && this.searchInputs.trim() !== '') {
        this.packages = this.originalPackages.filter((packageItem: any) =>
            JSON.stringify(packageItem).toString().includes(this.searchInputs)
        );
    } else {
        this.packages = [...this.originalPackages]; // Reset to original list if input is empty
    }
}

canEditPackage(privileges:Privilege[] | undefined){
  if(privileges){
  return privileges.find(item => item.code ==="PACKAGE_READ")
  }
  return false
}

}
