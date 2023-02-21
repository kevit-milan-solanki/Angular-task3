import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormDetailService} from "../form-detail.service";
import {DetailDataStorageService} from "../../shaird/detailDataStorage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class EditDetailComponent implements OnInit, OnDestroy {

  constructor(private readonly formDetailService: FormDetailService,
              private route: ActivatedRoute,
              private DetailDataStorageService: DetailDataStorageService) {
  }

  myGroup: FormGroup =  new FormGroup({
    firstName: new FormControl()
  });
  subscribe = new Subscription()
  deteil;

  ngOnInit() {
    this.subscribe = this.formDetailService.detailChange.subscribe(res => {

       this.deteil = res
      this.setForm()

    })
  }

  setForm() {
    console.log(this.deteil.detail.name)
    this.myGroup =  new FormGroup({
      firstName: new FormControl(this.deteil.detail.name,[Validators.required])
    });

  }

  ngOnDestroy() {
    this.subscribe.unsubscribe()
  }
}
