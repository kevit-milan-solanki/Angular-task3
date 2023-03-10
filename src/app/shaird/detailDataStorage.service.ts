import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
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
    return this.httpClint.post("http://localhost:3000/details", detail).subscribe(responce => {
      this.fetch()
    })
  }

  updateData(detail, id) {
    return this.httpClint.put('http://localhost:3000/details/' + id, detail).subscribe(res=>{
      console.log();
      this.fetch()
    })
  }

  fetch() {
    return this.httpClint.get("http://localhost:3000/details",
    ).pipe(
      map(
        detail => {
          return detail
        }), tap(details => {
        this.FormDetailService.setDetail(details)
      })).subscribe()
  }

  delete(id) {
    return this.httpClint.delete("http://localhost:3000/details/" + id).subscribe(res =>{
      this.fetch()
    })
  }

  getEditData(id) {
    return this.httpClint.get("http://localhost:3000/details/" + id).subscribe(res => {
      this.FormDetailService.editDeteil(res)
    })
  }
}
