import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  title = "HOME (llistat d'usuaris)";

  users : User[] = [];

  usuari : User = {
    nom : '',
    cognom: '',
    email : ''
  }

  btUp: boolean = false;

  idx: number = 0;

  user: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cognom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl ('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
  }) ;

  constructor( private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getLocalStorage();
  }

  enviaFormulary(i : number): void {
    this.btUp = true;
    this.idx = i;
    this.usuari = {
      nom : this.users[i].nom,
      cognom : this.users[i].cognom,
      email : this.users[i].email
    };
  }

  delUsuari(i: number): void {
    this.userService.delLocalStorage(i);
  }

  updateUser() {
    this.userService.updateLocalStorge(this.usuari, this.idx);
    this.btUp = false;
  }

  getBt(): boolean {
    return this.btUp;
  }

}
