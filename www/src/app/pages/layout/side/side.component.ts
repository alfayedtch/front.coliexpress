import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-side',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './side.component.html',
  styleUrl: './side.component.css'
})
export class SideComponent implements OnInit {
  user! : User | null;
  page =  {
    title: "Mes qrcode",
    route: "/admin/qrcode"
  };
  menus:any = [

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
      (response: any) => {this.user = response.user; this.initMenu()},
      err => {
        this.logout();
      }
    );
  }

  initMenu(){
    this.menus =[
      {
        title: "Compagnie",
        route: "/admin/company",
        icon: "",
        isExpanded: false,
        children: [
          {
            title: "Liste",
            route: "/admin/company/list",
            icon: "",
            isExpanded: false,
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/company/create",
            icon: "",
            isExpanded: false,
            children: []
          }
        ]
      },
      {
        title: "Utilisateurs",
        route: "/admin/user",
        icon: "",
        isExpanded: false,
        children: [
          {
            title: "Liste",
            route: "/admin/user/list",
            icon: "",
            isExpanded: false,
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/user/create",
            icon: "",
            isExpanded: false,
            children: []
          }
        ]
      },
      {
        title: "Roles",
        route: "/admin/role",
        icon: "",
        isExpanded: false,
        children: [
          {
            title: "Liste",
            route: "/admin/role/list",
            icon: "",
            isExpanded: false,
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/role/create",
            icon: "",
            isExpanded: false,
            children: []
          }
        ]
      },
      {
        title: "Privileges",
        route: "/admin/privilege",
        icon: "",
        isExpanded: false,
        children: [
          {
            title: "Liste",
            route: "/admin/privilege/list",
            icon: "",
            isExpanded: false,
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/privilege/create",
            icon: "",
            isExpanded: false,
            children: []
          }
        ]
      }

    ]
  }

  goTo(page:any){
    this.page = page;
    this.router.navigateByUrl(page.route);
  }

  toggleMenu(menu: any) {
    menu.isExpanded = !menu.isExpanded;
  }


  logout(){
    this.authService.logout();
    this.user = null;
    this.router.navigateByUrl('login');
  }


}
