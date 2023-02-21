import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {FormDetailService} from "../form-detail.service";
import {Router} from "@angular/router";
import {DetailDataStorageService} from "../../shaird/detailDataStorage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DetailFormComponent} from "../detail-form.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit , OnChanges{

  constructor(private readonly formDetailService: FormDetailService,
              private readonly router: Router,
              private DetailDataStorageService: DetailDataStorageService,
              private dialog: MatDialog,
              private readonly toaster: ToastrService
  ) {
  }
@Input() Details = this.formDetailService.detailChange
  Detail;
  nodata;
  ngOnInit() {
    this.loadeData();
  }



  loadeData(){
    this.DetailDataStorageService.fetch().subscribe(res => {
      this.Detail = res;
      if (this.Detail == "") {
        this.nodata = true;
      } else {
        this.nodata = false
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }


  logOut() {
    this.router.navigate(['login']);
  }

  AddData() {
    const dilogConfig = new MatDialogConfig();
    dilogConfig.width = "40%"
    dilogConfig.height = "200%"
    this.dialog.open(DetailFormComponent, dilogConfig);
  }

  deleteDetail(id) {
    this.DetailDataStorageService.delete(id)
    this.loadeData();
    this.toaster.error("Data deleted", "Delete")
  }

  editDetail(id) {
    this.DetailDataStorageService.getEditData(id)
    const dilogConfig = new MatDialogConfig();
    dilogConfig.width = "40%"
    dilogConfig.height = "200%"
    this.dialog.open(DetailFormComponent, dilogConfig);
  }
}
