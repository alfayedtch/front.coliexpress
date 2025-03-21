import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleConcat',
  standalone: true // ✅ Permet d'utiliser le Pipe en standalone
})
export class RoleConcatPipe implements PipeTransform {
  transform(roles: any[]): string {
    if (!roles || roles.length === 0) {
      return 'Aucun role'; // Si aucun role
    }

    return roles.map(p => p.libelle).join(', ');
  }
}
