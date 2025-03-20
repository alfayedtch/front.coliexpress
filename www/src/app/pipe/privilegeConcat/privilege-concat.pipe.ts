import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'privilegeConcat',
  standalone: true // ✅ Permet d'utiliser le Pipe en standalone
})
export class PrivilegeConcatPipe implements PipeTransform {
  transform(privileges: any[]): string {
    if (!privileges || privileges.length === 0) {
      return 'Aucun privilège'; // Si aucun privilège
    }

    return privileges.map(p => p.libelle).join(', ');
  }
}
