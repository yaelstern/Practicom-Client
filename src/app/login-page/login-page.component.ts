import { Component, OnInit, OnDestroy } from '@angular/core';
import Child from 'src/models/Child';
import User from 'src/models/User';
import UserService from 'src/services/user.service';
import * as Excel from 'exceljs/dist/exceljs.min.js'
import * as fs from 'file-saver';
import { HMO } from 'src/models/Enum';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(public userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem("userDetails"));
    userService.GetAllUsers().subscribe(succ => {
      console.log(succ)
    });
  }
  ngOnDestroy(): void {
    localStorage.setItem("userDetails", JSON.stringify(this.currentUser));
  }
  ngOnInit(): void {
  }
  flagFatherValid: boolean;
  flagChildValid: boolean = true;
  isChildren: boolean;
  currentUser: User = new User(null, null, null, null, null, null);
  currentChild: Child = new Child(null, null, null);
  gender: string;
  mins: string[] = ["זכר", "נקבה"];
  children: Child[] = [];
  openChildren() {
    this.isChildren = true;
  }
  addChild() {
    this.children.push(this.currentChild);
    this.currentChild = new Child(null, null, null);
  }
  checkIdFatherValidation() {
    var id2 = String(this.currentUser.IdentityNumber).trim();
    let a = Array
      .from(id2, Number)
      .reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
    if (!a) {
      this.flagFatherValid = false;
      return false;
    }
    this.flagFatherValid = true;
    return true;
  }
  checkIdChildValidation() {
    var id2 = String(this.currentChild.IdentityNumber).trim();
    let a = Array
      .from(id2, Number)
      .reduce((counter, digit, i) => {
        const step = digit * ((i % 2) + 1);
        return counter + (step > 9 ? step - 9 : step);
      }) % 10 === 0;
    if (a) {
      this.flagChildValid = false;
      return false;
    }
    this.flagChildValid = true;
    return true;
  }
  addUser() {
    if (this.flagChildValid && this.flagFatherValid) {
      this.currentUser.Children = this.children;
      if (this.gender == "male")
        this.currentUser.GenderId = 0;
      else
        this.currentUser.GenderId = 1;
      this.currentUser.HMO = Number(this.currentUser.HMO);
      localStorage.setItem("userDetails", JSON.stringify(this.currentUser));
      this.userService.AddUser(this.currentUser).subscribe(succ => {
      });
    }
    this.downloadExcel();
  }
  downloadExcel() {
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("User Data");
    let header = ["FirstName", "LastName", "IdentityNumber", "BornDate", "GenderId", "HMO"]
    let headerRow = worksheet.addRow(header);
    let x2 = Object.keys(this.currentUser);
    let item = [];
    console.log(x2)
    for (let i of x2) {
      if (i != "Children")
        if (i == "HMO")
          item.push(HMO[this.currentUser[i]]);
        else
          item.push(this.currentUser[i]);
    }
    worksheet.addRow(item);
    let temp3 = ["children name", "children born date", "children identity number"]
    worksheet.addRow(temp3);
    for (let x = 0; x < this.currentUser.Children.length; x++) {
      let temp2 = [this.currentUser.Children[x].FullName, this.currentUser.Children[x].BornDate, this.currentUser.Children[x].IdentityNumber]
      worksheet.addRow(temp2);
    }
    let fname = "Data 2023";
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname + '-' + new Date().valueOf() + '.xlsx');
    });
  }
}
