import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: any = [];
  constructor(private registerService : RegisterService) { }

  ngOnInit(): void {
    this.registerService.getRegister().subscribe(
      res => {this.register = res},
      err => console.log(err)      
    );
  }

}
