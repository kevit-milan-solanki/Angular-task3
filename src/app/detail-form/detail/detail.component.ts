import {Component, OnInit} from '@angular/core';
import {FormDetailService} from "../form-detail.service";
import {Router} from "@angular/router";
import {DetailDataStorageService} from "../../shaird/detailDataStorage.service";
import {DetailDataModel} from "../detailData.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private readonly formDetailService: FormDetailService,
              private readonly router: Router,
              private DetailDataStorageService: DetailDataStorageService
  ) {
  }

  Detail: DetailDataModel;

  ngOnInit() {

    this.DetailDataStorageService.fetch().subscribe()
    // this.Detail = this.formDetailService.setDetail()
    console.log(this.Detail)
  }


  logOut() {
    this.router.navigate(['login']);

  }

  detail: any = this.formDetailService.Detail;
  // name: string = this.detail.name;
  // DateOfBirth = this.detail.date;
  // email: string = this.formDetailService.UserEmail;
  // mobileNumber: string = this.detail.mobileNumber.internationalNumber;
  // instituteName: string = this.detail.instituteName;
  // education: string = this.detail.education;
  // Hobbies: string = this.formDetailService.hobby;
  // gender: string = this.detail.gender;
  // Address: string = this.detail.address;
}
