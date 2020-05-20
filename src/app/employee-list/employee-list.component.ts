import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private http: HttpClient) { }
  id: number;
  httpHeaders = new HttpHeaders({
		'Content-Type': 'application/json'
	});
  employees=[];
  fetchData = function() {
    this.http.get("http://localhost:5555/employess").subscribe(
      res =>{
        this.employees= res;
        console.log(this.employees);
      }
    )
  }
  onDelete(id){
    if(confirm("Are you sure?")) {
      const url = `${"http://localhost:5555/employess"}/${id}`;
      return this.http.delete(url, {headers: this.httpHeaders}).toPromise()
        .then(() => {
        this.fetchData();
        })
    }

  }
  ngOnInit(): void {
    this.fetchData();
  }

}
