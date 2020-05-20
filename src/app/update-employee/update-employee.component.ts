import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id:number;
  employee:any=[];
  data = {
    name:'',
    email:'',
    phoneNo:''
  };
  exist = false;
  employeeObj: Object={};
  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  updateEmployee(employee) {
    this.employeeObj = {
      "name": employee.name,
      "email": employee.email,
      "phoneNo": employee.phone
    };
    const url = `${"http://localhost:5555/employess"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.employeeObj), {headers: this.httpHeaders})
      .toPromise()
      .then(() => {
        this.router.navigate(['/employeeList']);
      })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log(this.id);
    });
    this.http.get("http://localhost:5555/employess").subscribe(
      res=>{
        this.employee= res;
        console.log(this.employee);
        for(var i = 0; i < this.employee.length ; i++) {
          console.log(this.employee[i].id);
          if(parseInt(this.employee[i].id) === this.id) {
            this.exist = true;
            this.data = this.employee[i];
            console.log(this.data);
            break;
          } else {
            this.exist = false;
          }
        }
      }
    )
  }
    
}
