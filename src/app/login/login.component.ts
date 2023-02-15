import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormDetailService} from "../detail-form/form-detail.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  userEmail!: string;
  password!: string;

  constructor(private  router : Router,
              private readonly userDetailService: FormDetailService,
  ) {
  }


  ngOnInit() {
    this.loginForm = new FormGroup<any>({
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit(){
    const loginDetail = this.loginForm.value;
    if (loginDetail.userEmail == '19it023.milan.solanki@vvpedulink.ac.in' && loginDetail.password == "1234") {
      this.userDetailService.UserEmail = loginDetail.userEmail;
      this.router.navigate(['./', 'detail-form']);
    }
  }
}
