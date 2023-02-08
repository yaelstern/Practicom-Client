import { Component } from '@angular/core';
import User from 'src/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'practicomProject';
  constructor() {
    localStorage.setItem("userDetails", JSON.stringify(this.currentUser));
  }
  currentUser: User = new User(null, null, null, null, null, null, null);
  userName: string = "אורח";
  ifNotGuest() {
    if (localStorage.getItem('userDetails') != null) {
      this.userName = JSON.parse(localStorage.getItem('userDetails')).FirstName;
      return true;
    }
    return false;
  }
}
