import {Component} from '@angular/core';
import {FormDetailService} from "../../detail-form/form-detail.service";
import {DetailDataStorageService} from "../detailDataStorage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-conform',
  templateUrl: './conform.component.html',
  styleUrls: ['./conform.component.css']
})
export class ConformComponent {
  constructor(private FormDetailService: FormDetailService,
              private DetailDataStorageService:DetailDataStorageService,
              private readonly toaster: ToastrService,

  ) {
  }

  delete() {
    this.DetailDataStorageService.delete(this.FormDetailService.id)
    this.toaster.error("Data deleted", "Delete")
  }
}
