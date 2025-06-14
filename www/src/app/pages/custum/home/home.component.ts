import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../../services/package/package.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  trackingNumber:string='';
  resultatVisible = false;
  package:any=null;
  constructor(
    private router : Router,
    private packageService: PackageService,
    private activeRoute:ActivatedRoute
  ){
    const packageTrackingNumber = this.activeRoute.snapshot.params['tracking_number'];
    this.trackingNumber = packageTrackingNumber;
    this.rechercherColis2(packageTrackingNumber)
  }

  login(){
    this.router.navigateByUrl('login');
  }

  goToAdmin(){
    this.router.navigateByUrl('admin/qrcode');
  }

  rechercherColis(){
    this.packageService.track(this.trackingNumber).subscribe(
      (response:any) => {
        this.package = response.data.package
        this.resultatVisible = true
      },
      (err:any) => {},
    )
  }
  rechercherColis2(trackingNumber:string){
    this.packageService.track(trackingNumber).subscribe(
      (response:any) => {
        this.package = response.data.package
        this.resultatVisible = true
      },
      (err:any) => {},
    )
  }

  getStatusClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'DELIVERED':
        return 'badge-success';
      case 'TRANSIT':
        return 'badge-warning';
      case 'WAITING':
        return 'badge-pending';
      case 'AVAILABLE':
        return 'badge-info';
      case 'CANCELED':
        return 'badge-danger';
      default:
        return 'badge-default';
    }
  }


}
