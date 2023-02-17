import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DetailFormComponent} from "../detail-form/detail-form.component";
import {DetailComponent} from "../detail-form/detail/detail.component";
import {FormDetailService} from "../detail-form/form-detail.service";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DetailDataStorageService {

  constructor(private httpClint: HttpClient,
              private FormDetailService: FormDetailService) {

  }

  postData(detail) {
    return this.httpClint.post("http://localhost:3000/detail", detail).subscribe(responce => {

    })
  }

  fetch() {
    return this.httpClint.get("http://localhost:3000/detail").pipe(map(responce => {
      return responce
    }),tap(res=>{
      this.FormDetailService.getData(res)
    }))
  }

}
