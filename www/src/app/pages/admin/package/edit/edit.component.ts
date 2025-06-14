import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PackageService } from '../../../../services/package/package.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit,OnDestroy {
  package:any = null;
  form!: FormGroup ;

  constructor(
    private router: Router,
    private packageService:PackageService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;
    console.log(state);
    this.package = (state)?state['package']:null;
    if(this.package === null){
      this.router.navigateByUrl('/admin/package');
    }
  }
  ngOnDestroy(): void {
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(this.package.id),
      sender_email: new FormControl(this.package.sender.email),
      receiver_email: new FormControl(this.package.receiver.email),
      tracking_number: new FormControl(this.package.tracking_number),
      weight: new FormControl(this.package.weight),
      status: new FormControl(this.package.status),
    });
  }


  updatePackage(){
    console.log(this.form.value);
    this.packageService.updatePackage(this.form.value).subscribe(
      response => { this.router.navigateByUrl('/admin/package')},
      err => { }
    )
  }


}
