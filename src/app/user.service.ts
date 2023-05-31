import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users : User[] = [];

  getLocalStorage(): User[] {
    console.log(this.users.length)
    if (this.users.length == 0) {
      let i: number = 0
      while(localStorage.getItem("RegitreUsuari"+i+"Nom") != null) {
        const usuari : User = {
          nom : String(localStorage.getItem("RegitreUsuari"+i+"Nom")),
          cognom : String(localStorage.getItem("RegitreUsuari"+i+"Cognom")),
          email : String(localStorage.getItem("RegitreUsuari"+i+"Email"))
        };
        this.users.splice(i, 0, usuari);
        i += 1;
      }
    }
    return this.users;
  }

  setLocalStorage(user : User): void {
    localStorage.setItem("RegitreUsuari"+this.users.length+"Nom", user.nom);
    localStorage.setItem("RegitreUsuari"+this.users.length+"Cognom", user.cognom);
    localStorage.setItem("RegitreUsuari"+this.users.length+"Email", user.email);
    this.users.splice(this.users.length, 0, user);
  }

  delLocalStorage(idx : number): void {
    let j: number = 0;
    for (let i=idx; i < this.users.length - 1; i++) {
      j = i + 1;
      localStorage.setItem("RegitreUsuari"+i+"Nom", String(localStorage.getItem("RegitreUsuari"+j+"Nom")));
      localStorage.setItem("RegitreUsuari"+i+"Cognom", String(localStorage.getItem("RegitreUsuari"+j+"Cognom")));
      localStorage.setItem("RegitreUsuari"+i+"Email", String(localStorage.getItem("RegitreUsuari"+j+"Email")));
    }
    j = this.users.length - 1;
    localStorage.removeItem("RegitreUsuari"+j+"Nom");
    localStorage.removeItem("RegitreUsuari"+j+"Cognom");
    localStorage.removeItem("RegitreUsuari"+j+"Email");
    this.users.splice(idx, 1);
  }

  updateLocalStorge(user: User, i: number): void {
    localStorage.setItem("RegitreUsuari"+i+"Nom", user.nom);
    localStorage.setItem("RegitreUsuari"+i+"Cognom", user.cognom);
    localStorage.setItem("RegitreUsuari"+i+"Email", user.email);
    this.users.splice(i, 1, user);
  }

}
