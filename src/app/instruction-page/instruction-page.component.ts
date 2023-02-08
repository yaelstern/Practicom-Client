import { Component, OnInit } from '@angular/core';
import User from 'src/models/User';

@Component({
  selector: 'app-instruction-page',
  templateUrl: './instruction-page.component.html',
  styleUrls: ['./instruction-page.component.scss']
})
export class InstructionPageComponent implements OnInit {
  user: User = new User("yael", "sternfeld", null, null, null, null, null);
  constructor() { 
    this.user = JSON.parse(localStorage.getItem("userDetails"));
  }

  ngOnInit(): void {
  }

}
