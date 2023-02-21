import {Injectable} from "@angular/core";

import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class FormDetailService {
  public UserEmail: string;
  public hobby: any;
  detailChange = new Subject<any>()

  Detail;

  formEditMode = false;

  setDetail(detail) {
    this.Detail = detail
    this.detailChange.next(this.Detail)
  }

  getDetail() {
    return this.Detail
  }

  editDeteil(eDeteil) {
    this.Detail = eDeteil
    this.detailChange.next(this.Detail)
  }
}
