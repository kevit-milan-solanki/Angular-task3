import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormDetailService} from "../detail-form/form-detail.service";
import {DetailDataStorageService} from "../shaird/detailDataStorage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLogin: boolean = false;
  userEmail: string;

  constructor(private router: Router,
              private readonly userDetailService: FormDetailService,
              private readonly toaster: ToastrService
  ) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup<any>({
      userEmail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    const loginDetail = this.loginForm.value;
    this.userDetailService.UserEmail = loginDetail.userEmail;
    this.router.navigate(['./', 'detail']);
    this.toaster.success('LogIn Successful', 'Success');
    this.isLogin = true;
  }


}
