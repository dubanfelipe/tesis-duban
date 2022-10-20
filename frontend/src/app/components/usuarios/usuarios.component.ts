import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';
import  decode  from 'jwt-decode';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  tokenPayload;
  registerForm: FormGroup;
  disabled: boolean = false;
  constructor(public registerService: RegisterService, private router: Router, private fb: FormBuilder) {
    
  }

  ngOnInit(): void {
    const token = localStorage.getItem('usuario');
    this.tokenPayload = decode(token)
    this.tokenPayload.activo == 0 ? this.disabled = false : this.disabled = true;
  }
  
}
