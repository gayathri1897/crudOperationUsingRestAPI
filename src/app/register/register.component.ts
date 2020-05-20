import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) { }
  confirmationString:string = "you have successfully completed your registration....!!!";
  isAdded: boolean = false;
  employeeObj:object = {};

  registrationForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  })

  OnPressEnter(employee) {
    this.employeeObj={
      "name": employee.name,
      "email": employee.email,
      "phoneNo": employee.phone
    }
    console.log(employee.name);
    this.http.post("http://localhost:5555/employess", this.employeeObj).subscribe((res:Response) => {
      this.isAdded = true;
  })
  }

  ngOnInit(): void {
  }

}
