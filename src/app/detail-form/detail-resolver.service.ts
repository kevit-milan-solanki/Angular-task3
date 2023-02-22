import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {DetailDataStorageService} from "../shaird/detailDataStorage.service";
import {FormDetailService} from "./form-detail.service";

@Injectable({
  providedIn: "root"
})

export class DetailResolverService implements Resolve<any> {
  constructor(private detailDataStorage: DetailDataStorageService,
              private formDetailService: FormDetailService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const detail = this.formDetailService.getDetail();
    if (!detail) {
      return this.detailDataStorage.fetch()
    }else {
      return detail
    }

  }
}
