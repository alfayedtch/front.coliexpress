import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './side.component.html',
  styleUrl: './side.component.css'
})
export class SideComponent {
  page =  {
    title: "Mes qrcode",
    route: "/admin/qrcode"
  };
  menus = [
    {
      title: "Mes qrcode",
      route: "/admin/qrcode"
    },
    {
      title: "Creer un qrcode",
      route: "/admin/qrcode/create"
    },
  ]

  constructor(
    private router:Router
  ){

  }

  goTo(page:any){
    this.page = page;
    this.router.navigateByUrl(page.route);
  }
}
