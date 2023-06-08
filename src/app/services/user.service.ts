import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(public messageService: MessageService) {}

  users: User[] = []

  getLocalStorage(): User[] {
    const listUsers = localStorage.getItem("usuaris")
    if (listUsers != null && this.users.length < 1) this.users = JSON.parse(listUsers)
    return this.users
  }

  addLocalStorage(user: User): void {
    this.users.splice(this.users.length, 0, user)
    localStorage.setItem("usuaris", JSON.stringify(this.users))
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"] usuari "+user.nom+" i el N: "+this.users.length+", afegit.")
  }

  delLocalStorage(idx: number): void {
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"] usuari "+this.users[idx].nom+" i el N: "+(idx+1)+" eliminat.")
    this.users.splice(idx, 1)
    localStorage.setItem("usuaris", JSON.stringify(this.users))
  }

  updateLocalStorge(user: User, i: number): void {
    this.users.splice(i, 1, user)
    localStorage.setItem("usuaris", JSON.stringify(this.users))
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], usuari "+user.nom+" i el N: "+(i+1)+ " modificar.")
  }

  delAllLocalStorage() {
    localStorage.removeItem('usuaris');
    while (this.users.length > 0) {
      this.users.splice(0, 1)
    }
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], tots els usuaris han sigut ELIMINATS !!!")
  }


}
