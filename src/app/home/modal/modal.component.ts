import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { HomeComponent } from '../home.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit {

  constructor(private userService: UserService, private messageService: MessageService, private homeComponent: HomeComponent) {}

  users : User[] = []
  idx: number = 0
  flag: boolean = false

  user: FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    cognom: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl ('', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{3,3}$')])
  })

  ngOnInit(): void {
    this.users = this.userService.getLocalStorage()
  }

  readUser(): void {
    localStorage.setItem("crud", "read")
    this.idx = Number(this.homeComponent.idx)
    this.user.controls['nom'].setValue(this.users[this.idx].nom)
    this.user.controls['cognom'].setValue(this.users[this.idx].cognom)
    this.user.controls['email'].setValue(this.users[this.idx].email)
    this.messageService.add("Operació CRUD ["+localStorage.getItem("crud")+"], usuari "+this.user.controls['nom'].value+" i el N: "+(this.idx+1)+" seleccionat.")
  }

  updateUser() {
    const user: User = {
      nom : this.user.controls['nom'].value,
      cognom : this.user.controls['cognom'].value,
      email : this.user.controls['email'].value
    }
    user.email = user.email.toLocaleLowerCase()
    localStorage.setItem("crud", "update")
    this.userService.updateLocalStorge(user, this.idx)
    this.setBt(false)
  }

  delAllUser() {
    localStorage.setItem("crud", "delete all")
    this.userService.delAllLocalStorage()
  }

  setBt(bt: boolean): void {
    if (!bt) this.flag = false
    this.homeComponent.btUp = bt
  }

  getBt(): boolean {
    if (this.homeComponent.btUp && !this.flag)
    {
      this.flag = !this.flag
      this.readUser()
    }
    return this.homeComponent.btUp
  }
}

