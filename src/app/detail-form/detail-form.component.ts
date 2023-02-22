import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CountryISO, SearchCountryField,} from "ngx-intl-tel-input";
import {FormDetailService} from "./form-detail.service";
import {Router} from "@angular/router";
import {DetailDataStorageService} from "../shaird/detailDataStorage.service";
import {MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css'],
})
export class DetailFormComponent implements OnInit {
  constructor(private readonly router: Router,
              private readonly detailServer: FormDetailService,
              private detailDataService: DetailDataStorageService,
              private DetailDataStorageService: DetailDataStorageService,
              public dialogRef: MatDialogRef<DetailFormComponent>,
              private readonly toaster: ToastrService,
  ) {

  }

  hobbies = [
    {id: 1, hobbyName: "Reading", isSelected: false},
    {id: 2, hobbyName: "Writing", isSelected: false},
    {id: 3, hobbyName: "Traveling", isSelected: false},
    {id: 4, hobbyName: "Cooking", isSelected: false},
    {id: 5, hobbyName: "Other", isSelected: false},
  ]
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  detailForms: FormGroup = new FormGroup<any>({
    name: new FormControl(null, [Validators.required]),
    date: new FormControl(null, [Validators.required, this.validAge.bind(this)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    mobileNumber: new FormControl(null, [Validators.required]),
    instituteName: new FormControl(null, [Validators.required]),
    education: new FormControl(null, [Validators.required]),
    selectedHobby: new FormControl(),
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


  validForm = false;
  editDetail;
  editForm = this.detailServer.formEditMode;

  ngOnInit() {
    if (!this.detailServer.formEditMode) {
      this.detailServer.editDetailChange.subscribe(res => {
        this.editDetail = res;
        this.EditDetail();
        this.editForm = true
        this.getId()

      })
    } else {
      this.loadeForm()
    }
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
    return this.editDetail.id
  }

  EditDetail() {
    this.detailForms = new FormGroup<any>({
      name: new FormControl(this.editDetail.detail.name, [Validators.required]),
      date: new FormControl(this.editDetail.detail.date, [Validators.required, this.validAge.bind(this)]),
      email: new FormControl(this.editDetail.detail.email, [Validators.required, Validators.email]),
      mobileNumber: new FormControl(this.editDetail.detail.mobileNumber, [Validators.required]),
      instituteName: new FormControl(this.editDetail.detail.instituteName, [Validators.required]),
      education: new FormControl(this.editDetail.detail.education, [Validators.required]),
      selectedHobby: new FormControl(),
      gender: new FormControl(this.editDetail.detail.gender, [Validators.required]),
      address: new FormControl(this.editDetail.detail.address),
    })
  }

  loadeForm() {
    this.detailForms
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
    this.onClose();
  }

  updateData() {
    const id = this.getId()
    const detail = this.detailForms.value;
    if (this.detailForms.valid && this.dateOfBirth >= 20) {
      let hobby = this.selectedHobby
      this.DetailDataStorageService.updateData({detail, hobby}, id)

      this.detailServer.Detail = detail;
      this.detailServer.hobby = this.selectedHobby;
      this.toaster.success("Data Update Successful", "Success")
    } else {
      this.validForm = true;
    }
    this.onClose()
  }

  onClose() {
    this.dialogRef.close();
  }

  onChange() {

   this.selectedHobby = this.hobbies.filter(hobby => hobby.isSelected == true).map(hobby => hobby);
  }

  clearForm(): void {
    this.detailForms.reset()
  }


}
