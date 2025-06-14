import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../interfaces/user';
import { environment } from '../../../../environment/environment';
    import { version } from '../../../../../package.json';
@Component({
  selector: 'app-side',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  templateUrl: './side.component.html',
  styleUrl: './side.component.css'
})
export class SideComponent implements OnInit {
  version:string = version;
  user! : User | null;
  page =  {
    title: "Mes qrcode",
    route: "/admin/qrcode"
  };
  menus:any = [

  ];

  clientMenus:any = [];

  inlineMenus = [
    {
      title: "Profile",
      route: "/admin/profile"
    },
    {
      title: "Configuration",
      route: "/admin/configuration"
    }
  ]

    endpointForImage = environment.endpointForImage;

  constructor(
    private router:Router,
    private authService:AuthService

  ){
    this.authService.currentUser.subscribe(currentUser => this.user = currentUser)
  }
  ngOnInit(): void {
    this.authService.getUserByToken().subscribe(
      (response: any) => {this.user = response.user; this.initMenu(); this.initClientMenu()},
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
        authorisations: ['COMPANY_CREATE','COMPANY_READ','COMPANY_UPDATE','COMPANY_DELETE'],
        children: [
          {
            title: "Liste",
            route: "/admin/company/list",
            icon: "",
            isExpanded: false,
            authorisations: ['COMPANY_READ'],
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/company/create",
            icon: "",
            isExpanded: false,
            authorisations: ['COMPANY_CREATE'],
            children: []
          }
        ]
      },
      {
        title: "Utilisateurs",
        route: "/admin/user",
        icon: "",
        isExpanded: false,
        authorisations: ['USER_CREATE','USER_READ','USER_UPDATE','USER_DELETE'],
        children: [
          {
            title: "Liste",
            route: "/admin/user/list",
            icon: "",
            isExpanded: false,
            authorisations: ['USER_READ'],
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/user/create",
            icon: "",
            isExpanded: false,
            authorisations: ['USER_CREATE'],
            children: []
          }
        ]
      },
      {
        title: "Roles",
        route: "/admin/role",
        icon: "",
        isExpanded: false,
        authorisations: ['ROLE_CREATE','ROLE_READ','ROLE_UPDATE','ROLE_DELETE'],
        children: [
          {
            title: "Liste",
            route: "/admin/role/list",
            icon: "",
            isExpanded: false,
            authorisations: ['ROLE_READ'],
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/role/create",
            icon: "",
            isExpanded: false,
            authorisations: ['ROLE_CREATE'],
            children: []
          }
        ]
      },
      {
        title: "Privilegess",
        route: "/admin/privilege",
        icon: "",
        isExpanded: false,
        authorisations: ['PRIVILEGE_CREATE','PRIVILEGE_CREATE_READ','PRIVILEGE_CREATE_UPDATE','PRIVILEGE_CREATE_DELETE'],
        children: [
          {
            title: "Liste",
            route: "/admin/privilege/list",
            icon: "",
            isExpanded: false,
            authorisations: ['PRIVILEGE_CREATE_READ'],
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/privilege/create",
            icon: "",
            isExpanded: false,
            authorisations: ['PRIVILEGE_CREATE'],
            children: []
          }
        ]
      },
      {
        title: "Packages",
        route: "/admin/package",
        icon: "",
        isExpanded: false,
        authorisations: ['PACKAGE_CREATE','PACKAGE_READ','PACKAGE_UPDATE','PACKAGE_DELETE'],
        children: [
          {
            title: "Liste",
            route: "/admin/package/list",
            icon: "",
            isExpanded: false,
            authorisations: ['PACKAGE_READ'],
            children: []
          },
          {
            title: "Ajout",
            route: "/admin/package/create",
            icon: "",
            isExpanded: false,
            authorisations: ['PACKAGE_CREATE'],
            children: []
          }
        ]
      }

    ]
  }

  initClientMenu(){
    this.clientMenus =[
      {
        title: "Mon Dashboard Client",
        route: "/custum/dashboard",
        icon: "",
        isExpanded: false,
        children: [
          {
            title: "Mon espace",
            route: "/admin/company/list",
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


  hasPrivilege(requiredAuthorisations: string[]): boolean {
    if (!this.user || !this.user.privileges || !this.user.roles) {
      return false;
    }
    const userRoles = this.user.roles.map((p: any) => p.code);
    if(userRoles.includes('SUPER_ADMIN')){
      return true;
    }
    const userPrivileges = this.user.privileges.map((p: any) => p.code);
     // Assurez-vous que 'code' contient bien le privilège
    return requiredAuthorisations.some(privilege => userPrivileges.includes(privilege));
  }


}
