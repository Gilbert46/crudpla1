import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { ActivatedRoute, RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{

  constructor( private route: ActivatedRoute, private userService: UserService) {}

  title = "HOME (llistat d'usuaris)"
  users : User[] = []
  btUp: boolean = false
  idx: number = 0

  ngOnInit(): void {
    this.users = this.userService.getLocalStorage()
  }

  enviaFormulary(i : number): void {
    this.idx = i
    this.btUp = true
  }

  delUsuari(i: number): void {
    localStorage.setItem("crud", "delete")
    this.userService.delLocalStorage(i)
  }

}
