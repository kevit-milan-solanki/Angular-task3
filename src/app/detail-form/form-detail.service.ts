import {Injectable} from "@angular/core";

import {Subject} from "rxjs";
import {DetailDataStorageService} from "../shaird/detailDataStorage.service";

@Injectable({
  providedIn: 'root'
})


export class FormDetailService {
  editDetailChange = new Subject();
  edtDetail;
  public UserEmail: string;
  public hobby: any;
  detailChange = new Subject<any>()
  Detail;
  id;
  loginDetail;
  formEditMode = false;

  setDetail(detail) {
    this.Detail = detail
    this.detailChange.next(this.Detail)
  }

  getID(id) {
    this.id = id
  }

  getDetail() {
    return this.Detail
  }
  editDeteil(eDeteil) {
    this.edtDetail = eDeteil
    this.editDetailChange.next(this.edtDetail)
  }

}
