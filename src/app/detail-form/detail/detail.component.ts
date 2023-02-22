import {
  Component,
  OnDestroy,
  OnInit, ViewChild,

} from '@angular/core';
import {FormDetailService} from "../form-detail.service";
import {Router} from "@angular/router";
import {DetailDataStorageService} from "../../shaird/detailDataStorage.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DetailFormComponent} from "../detail-form.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ConformComponent} from "../../shaird/conform/conform.component";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  columnsToDisplay = ['name', 'email', "education"];
  expandedElement;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly formDetailService: FormDetailService,
              private readonly router: Router,
              private DetailDataStorageService: DetailDataStorageService,
              private dialog: MatDialog,
  ) {
  }
  nodata;
  dataSource
  ngOnInit() {
    this.DetailDataStorageService.fetch()
    this.loadeData();
  }

  loadeData() {
    return this.formDetailService.detailChange.subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res)
      this.dataSource.paginator = this.paginator;
    })
  }

  logOut() {
    this.router.navigate(['login']);
  }
  OnAddData() {
    const dilogConfig = new MatDialogConfig();
    dilogConfig.width = "500px"
    dilogConfig.height = "85%"
    this.dialog.open(DetailFormComponent, dilogConfig);
  }

  deleteDetail(id , event) {
    event.stopPropagation()
    this.DetailDataStorageService.getEditData(id)
    this.openDialog()
    this.formDetailService.getID(id)
  }

  editDetail(id, event) {
    event.stopPropagation()
    this.DetailDataStorageService.getEditData(id)
    const dilogConfig = new MatDialogConfig();
    dilogConfig.width = "500px"
    dilogConfig.height = "85%"
    this.dialog.open(DetailFormComponent, dilogConfig);
  }

  openDialog(): void {
    this.dialog.open(ConformComponent, {
      width: '250px',
    });
  }

  ngOnDestroy() {
  }
}

