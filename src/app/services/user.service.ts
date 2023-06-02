import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(public messageService: MessageService) {}

  users: User[] = [];
  // obtenir llista de regístres, operació CRUD (read)
  getLocalStorage(): User[] {
    const listUsers = localStorage.getItem("usuaris");
    if (listUsers != null && this.users.length < 1)
    {
      this.users = JSON.parse(listUsers);
      this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], de tots els usuaris.");
    }
    return this.users;
  }
  // afegir un regístre, operació CRUD (create)
  addLocalStorage(user: User): void {
    this.users.splice(this.users.length, 0, user);
    localStorage.setItem("usuaris", JSON.stringify(this.users));
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], usuari: "+user.nom+", amb el N: "+this.users.length);
  }
  // eliminar un regístre, operació CRUD (delete)
  delLocalStorage(idx: number): void {
    this.users.splice(idx, 1);
    localStorage.setItem("usuaris", JSON.stringify(this.users));
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], usuari tenia el N: "+(idx+1));
  }
  // modificar un regístre, operació CRUD (update)
  updateLocalStorge(user: User, i: number): void {
    this.users.splice(i, 1, user);
    localStorage.setItem("usuaris", JSON.stringify(this.users));
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], usuari: "+user.nom+", amb el N: "+(i+1));
  }
  // eliminar tots els regístres, operació CRUD (delete all)
  delAllLocalStorage() {
    localStorage.removeItem('usuaris');
    while (this.users.length > 0) {
      this.users.splice(0, 1);
    }
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], tots els usuaris eliminats...");
  }

}
