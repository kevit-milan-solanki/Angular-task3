import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CountryISO, SearchCountryField,} from "ngx-intl-tel-input";
import {FormDetailService} from "./form-detail.service";
import {Router} from "@angular/router";
import {DetailDataStorageService} from "../shaird/detailDataStorage.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {DetailComponent} from "./detail/detail.component";

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailFormComponent implements OnInit {


  constructor(private readonly router: Router,
              private readonly detailServer: FormDetailService,
              private detailDataService: DetailDataStorageService,
              private DetailDataStorageService: DetailDataStorageService,
              public dialogRef: MatDialogRef<DetailFormComponent>,
              private readonly toaster: ToastrService) {

  }

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  detailForms: FormGroup = new FormGroup<any>({
    name: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required, this.validAge.bind(this)]),
    email: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required]),
    instituteName: new FormControl(null, [Validators.required]),
    education: new FormControl(null, [Validators.required]),
    selectedHobby: new FormControl(null),
    gender: new FormControl(null, [Validators.required]),
    address: new FormControl(null),
  });
  name: string;
  dateOfBirth !: any
  date: any

  selectedHobby: Array<any> = [];

  educationOptions: Array<String> = [
    'High School',
    'College',
    'Graduate School',
    'Other'
  ];
  genders = ['Male', 'Female', "Other"];

  hobbies = [
    {id: 1, hobbyName: "Reading", isSelected: false},
    {id: 2, hobbyName: "Writing", isSelected: false},
    {id: 3, hobbyName: "Traveling", isSelected: false},
    {id: 4, hobbyName: "Cooking", isSelected: false},
    {id: 5, hobbyName: "Other", isSelected: false},
  ]
  validForm = false;
  Detail;
  editForm = this.detailServer.formEditMode;

  ngOnInit() {
    this.detailServer.detailChange.subscribe(res => {
      this.Detail = res
      if (this.detailServer.formEditMode) {
        this.loadForm()
      } else {
        this.editForm = true
        this.EditDetail();
        this.getId();
      }
    })

  }

  validAge(date: FormControl) {
    this.dateOfBirth = new Date(date.value)
    let age = Math.abs(Date.now() - this.dateOfBirth);
    this.dateOfBirth = Math.floor((age / (1000 * 3600 * 24)) / 365);
    if (this.dateOfBirth < 20) {
      return {age: true}
    }
    return null;
  }

  getId() {
    return this.Detail.id
  }

  loadForm(): void {
    this.detailForms;
  }

  EditDetail() {
    console.log(this.Detail.id)
    this.detailForms = new FormGroup<any>({
      name: new FormControl(this.Detail.detail.name, [Validators.required]),
      date: new FormControl(this.Detail.detail.date, [Validators.required, this.validAge.bind(this)]),
      email: new FormControl(this.Detail.detail.email, [Validators.required]),
      mobileNumber: new FormControl(this.Detail.detail.mobileNumber, [Validators.required]),
      instituteName: new FormControl(this.Detail.detail.instituteName, [Validators.required]),
      education: new FormControl(this.Detail.detail.education, [Validators.required]),
      selectedHobby: new FormControl(this.Detail.hobby.hobbyName),
      gender: new FormControl(this.Detail.detail.gender, [Validators.required]),
      address: new FormControl(this.Detail.detail.address),
    })
  }

  submitDetails() {
    const detail = this.detailForms.value;
    if (this.detailForms.valid && this.dateOfBirth >= 20) {
      let hobby = this.selectedHobby
      this.DetailDataStorageService.postData({detail, hobby})
      this.detailServer.Detail = detail;
      this.detailServer.hobby = this.selectedHobby;
      this.toaster.success("Data add Successful", "Success")
    } else {
      this.validForm = true;
    }
    this.onClose()
  }

  updateData() {
    const id = this.getId()
    const detail = this.detailForms.value;
    if (this.detailForms.valid && this.dateOfBirth >= 20) {
      let hobby = this.selectedHobby
      this.DetailDataStorageService.updateData({detail, hobby}, id)
      this.detailServer.Detail = detail;
      this.detailServer.hobby = this.selectedHobby
    } else {
      this.validForm = true;
    }
    this.onClose()
  }

  onClose() {
    this.dialogRef.close();
  }

  onChange() {
    this.selectedHobby = this.hobbies.filter(hobby => hobby.isSelected == true).map(hobby => hobby.hobbyName);
    console.log(this.selectedHobby)
  }

  clearForm(): void {
    this.loadForm()
  }
}
