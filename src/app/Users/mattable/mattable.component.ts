import {Component, inject, OnInit, ViewChild} from '@angular/core'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {Posts} from '../../Model/posts'
import {DataserviceService} from '../../services/dataservice.service'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatDialog} from '@angular/material/dialog'
import {MatConfirmboxComponent} from '../../customcomponents/mat-confirmbox/mat-confirmbox.component'
@Component({
  selector: 'app-mattable',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './mattable.component.html',
  styleUrl: './mattable.component.scss',
})
export class MattableComponent implements OnInit {
  Postlist!: Posts[]
  datasource: any
  displaycolumns: string[] = ['title', 'body', 'image', 'action']
  @ViewChild(MatPaginator) paginator!: MatPaginator
  readonly dialog = inject(MatDialog)
  constructor(
    private dataservice: DataserviceService,
    private _matmodal: MatConfirmboxComponent
  ) {}
  ngOnInit(): void {
    this.dataservice.Getdata().subscribe({
      next: (v) => {
        this.Postlist = v
        this.datasource = new MatTableDataSource<Posts>(this.Postlist)
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
    this._matmodal.openModal('editform', '', id)
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
            },
            error(err) {
              console.log(err)
            },
          })
        }
      })
  }
}
