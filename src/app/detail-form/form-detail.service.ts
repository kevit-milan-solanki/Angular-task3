import {Injectable} from "@angular/core";
import {DetailDataModel} from "./detailData.model";
import {HttpClient} from "@angular/common/http";
import {DetailDataStorageService} from "../shaird/detailDataStorage.service";

@Injectable({
  providedIn: 'root'
})


export class FormDetailService {

  constructor(private httpClint: HttpClient,
  ) {
  }

  public UserEmail: string;
  public hobby: any;

  Detail: DetailDataModel;

  setDetail() {
    console.log(this.Detail)
  }
  getData(res){
    this.Detail= res
    console.log(this.Detail)
  }




}
