import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  user! : User;
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
  ];

  inlineMenus = [
    {
      title: "Profile",
      route: "/admin/profile"
    }
  ]

  constructor(
    private router:Router,
    private authService:AuthService

  ){
    this.authService.currentUser.subscribe(currentUser => this.user = currentUser)
  }
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(
      (response: any) => {this.user = response.user},
      err => {}
    );
  }

  goTo(page:any){
    this.page = page;
    this.router.navigateByUrl(page.route);
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }
}
