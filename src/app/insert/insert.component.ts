import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.scss']
})
export class InsertComponent  implements OnInit {

  title="INTRODUIR NOU USUARI";

  crud : string = '';

  usuari : User = {
    nom : '',
    cognom : '',
    email : ''
  };

  user: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cognom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl ('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
  }) ;

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit(): void {
    this.initCrud();
  }

  addUser(): void {
    if (this.crud == 'create') {
      this.userService.setLocalStorage(this.usuari);
      this.crud = 'disabled';
      this.location.back();
    }
    else {
      this.location.back();
    }
  }

  initCrud(): void {
    localStorage.setItem("crud", "create");
    this.crud = String(localStorage.getItem('crud'));
  }

}
