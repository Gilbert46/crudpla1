import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  misatges: string[] = []

  add(misatge: string) {
    this.misatges.push(misatge)
  }

  clear() {
    this.misatges = []
  }

}
