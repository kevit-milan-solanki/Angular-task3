import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  CountryISO,
  SearchCountryField,
} from "ngx-intl-tel-input";
import {FormDetailService} from "./form-detail.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail-form',
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css']
})
export class DetailFormComponent implements OnInit {

  constructor(private readonly router: Router,
              private readonly detailServer: FormDetailService) {
  }

  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  detailForms!: FormGroup;
  name!: string;
  dateOfBirth !: any
  date: any

  selectedHobby: Array<any> = [];

  educationOptions: Array<String> = [
    'High School',
    'College',
    'Graduate School',
    'Other'
  ];
  genders = ['male', 'female', "other"];

  hobbies = [
    {id: 1, hobbyName: "Reading", isSelected: false},
    {id: 2, hobbyName: "Writing", isSelected: false},
    {id: 3, hobbyName: "Traveling", isSelected: false},
    {id: 4, hobbyName: "Cooking", isSelected: false},
    {id: 5, hobbyName: "Other", isSelected: false},
  ]
  validForm = false;
  emailID: string = this.detailServer.UserEmail;

  ngOnInit() {
    this.loadForm()
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

  loadForm(): void {
    this.detailForms = new FormGroup<any>({
      name: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required, this.validAge.bind(this)]),
      email: new FormControl({value: this.emailID, disabled: true}),
      mobileNumber: new FormControl(null, [Validators.required]),
      instituteName: new FormControl(null, [Validators.required]),
      education: new FormControl(null, [Validators.required]),
      selectedHobby: new FormControl(null),
      gender: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
    })
  }

  submitDetails() {
    const detail = this.detailForms.value;
    if (this.detailForms.valid && this.dateOfBirth >= 20) {
      this.detailServer.Detail = detail;
      this.detailServer.hobby = this.selectedHobby
      this.router.navigate(['/detail']);
    } else {
      this.validForm = true;
    }
  }

  onChange() {
    this.selectedHobby = this.hobbies.filter(hobby => hobby.isSelected == true).map(hobby => hobby.hobbyName);
    console.log(this.selectedHobby)
  }

  clearForm(): void {
    this.loadForm()
  }
}
