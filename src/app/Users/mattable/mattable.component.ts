import { Component, inject, OnInit, ViewChild } from '@angular/core'
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { DataserviceService } from '../../services/dataservice.service'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { MatConfirmboxComponent } from '../../customcomponents/mat-confirmbox/mat-confirmbox.component'
import { Product } from '../../Model/product'
import { CurrencyPipe, NgIf } from '@angular/common'
import { pipe } from 'rxjs'

@Component({
  selector: 'app-mattable',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    NgIf,
    CurrencyPipe,
  ],
  templateUrl: './mattable.component.html',
  styleUrl: './mattable.component.scss',
})
export class MattableComponent implements OnInit {
  Postlist!: Product[]
  datasource: any
  displaycolumns: string[] = ['title', 'body', 'price', 'image', 'action']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  readonly dialog = inject(MatDialog)
  constructor(
    private dataservice: DataserviceService,
    private _matmodal: MatConfirmboxComponent
  ) {}
  ngOnInit(): void {
    this.dataservice.Getdata().subscribe({
      next: (v: any) => {
        this.Postlist = v.dataList
        this.datasource = new MatTableDataSource<Product>(this.Postlist)
        this.datasource.paginator = this.paginator
      },
      error(err) {
        console.log(err)
      },
      complete() {},
    })
  }

  openDialogedit(id: number): void {
    this._matmodal.data.itemid = id
    this._matmodal
      .openModal('editform', '', id)
      .afterClosed()
      .subscribe((res) => {
        if (res != undefined && res.success) {
          this.ngOnInit()
        }
      })
  }
  opendialogdelete(id: number) {
    this._matmodal
      .openModal('confirm', '', id)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.dataservice.deleteitem(id).subscribe({
            next: (v) => {
              this._matmodal.openModal('success', 'Item deleted successfully')
              this.ngOnInit()
            },
            error(err) {
              console.log(err)
            },
          })
        }
      })
  }
}
