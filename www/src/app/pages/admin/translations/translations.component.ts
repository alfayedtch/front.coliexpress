import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concat } from 'rxjs';
import { KeyService } from 'src/app/services/key/key.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent implements OnInit {
  keys: any = [];
  languages: any = [];
  keyForm: FormGroup = new FormGroup({
    key: new FormControl(''),
    software_id: new FormControl(this.route.snapshot.paramMap.get('id')),
  });
  constructor(
    private route: ActivatedRoute,
    private _keyService: KeyService,
    private _languageService:LanguageService
  ) {}
  ngOnInit(): void {
    this.getKeys();
    this.getLanguages()
  }

  getKeys() {
    this._keyService.getKeys(this.software_id.value).subscribe((keys: any) => {
      this.keys = keys;
      console.log(keys);
    });
  }
  addKey() {
    concat(
      this._keyService.addKey(this.key.value, this.software_id.value),
      this._keyService.getKeys(this.software_id.value)
    ).subscribe((data: any) => {
      this.keys = data;
    });
  }
  getLanguages(){
    this._languageService.getLanguages().subscribe(
      (languages: any) => {this.languages = languages}
    )
  }

  selectLanguage(event: any){
    console.log(event.target.value);
  }

  public get key(): any {
    return this.keyForm.get('key');
  }

  public set key(value: string) {
    this.key = value;
  }

  public get software_id(): any {
    return this.keyForm.get('software_id');
  }

  public set software_id(value: string) {
    this.software_id = value;
  }
}
