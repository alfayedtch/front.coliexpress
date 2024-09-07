import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, concat } from 'rxjs';
import { KeyService } from 'src/app/services/key/key.service';
import { SoftwareService } from 'src/app/services/software/software.service';

@Component({
  selector: 'app-softwares',
  templateUrl: './softwares.component.html',
  styleUrls: ['./softwares.component.scss']
})
export class SoftwaresComponent implements OnInit {
  softwares:any = [];
  softwareForm: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
  constructor(
    private _keyService: KeyService,
    private _softwareService:SoftwareService
  ) { }

  ngOnInit(): void {
    this.getSoftware();
  }

  getSoftware(){
    this._softwareService.getSoftwares().subscribe(
      (softwares: any) => {this.softwares = softwares}
    )
  }

  addSoftware(){
   concat(this._softwareService.addSoftware(this.name.value),this._softwareService.getSoftwares()).subscribe((data:any)=> {
    this.softwares = data;
   })
  }

  public get name():any{
    return this.softwareForm.get('name');
  }

  public set name(value: string){
    this.softwareForm.get('name')?.setValue(value);
  }

}
