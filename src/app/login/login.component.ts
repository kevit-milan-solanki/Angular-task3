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
  userEmail: string;

  constructor(private router: Router,
              private readonly userDetailService: FormDetailService,
              private readonly toaster: ToastrService,
              private readonly  DetailDataStorageService:DetailDataStorageService
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
    if (loginDetail.userEmail == '19it023.milan.solanki@vvpedulink.ac.in' && loginDetail.password == "1234") {
      this.router.navigate(['./', 'detail']);
      this.toaster.success('LogIn Successful', 'Success');
    }
    else {
      this.toaster.error('Something is wrong!')
      this.loginForm.reset()
    }

  }

}
