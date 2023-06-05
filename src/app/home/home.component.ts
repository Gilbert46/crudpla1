import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MessageService } from '../services/message.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  title = "HOME (llistat d'usuaris)";

  users : User[] = []
  btUp: boolean = false
  idx: number = 0

  user: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cognom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl ('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{3,3}$')])
  }) ;

  constructor( private route: ActivatedRoute, private userService: UserService, public messageService: MessageService) {}

  ngOnInit(): void {
    localStorage.setItem("crud", "read");
    this.users = this.userService.getLocalStorage();
  }

  enviaFormulary(i : number): void {
    this.btUp = true;
    this.idx = i;
    this.user.controls['nom'].setValue(this.users[i].nom);
    this.user.controls['cognom'].setValue(this.users[i].cognom);
    this.user.controls['email'].setValue(this.users[i].email);
    this.messageService.add("Operació CRUD [read], usuari: "+this.user.controls['nom'].value+", amb el N: "+(i+1));
  }

  delUsuari(i: number): void {
    localStorage.setItem("crud", "delete");
    this.userService.delLocalStorage(i);
  }

  updateUser() {
    const user: User = {
      nom : this.user.controls['nom'].value,
      cognom : this.user.controls['cognom'].value,
      email : this.user.controls['email'].value
    }
    user.email = user.email.toLocaleLowerCase();
    localStorage.setItem("crud", "update");
    this.userService.updateLocalStorge(user, this.idx);
    this.btUp = false;
  }

  delAllUser() {
    localStorage.setItem("crud", "delete all");
    this.userService.delAllLocalStorage();
  }

  getBt(): boolean {
    return this.btUp;
  }

}
