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
  constructor(private dataservice: DataserviceService) {}
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

  openDialog(id: number, action: string): void {
    ////use _confirmboxdata for _confirmboxdata madal ////////
    let _formdata = {}
    if (action == 'edit') _formdata = {type: 'Editform', itemid: id}
    else
      _formdata = {
        type: 'confirm',
        itemid: id,
        content: 'This item will be deleted.',
      }

    var dial = this.dialog.open(MatConfirmboxComponent, {
      width: action == 'edit' ? '550px' : '350px',
      height: action == 'edit' ? '550px' : '280px',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: _formdata,
    })
    dial.afterClosed().subscribe((res) => {
      console.log(res)

      if (res?.btnid == 'confirmboxok') {
        this.dataservice.deleteitem(id).subscribe({
          next: (v) => {
            alert('Item deleted')
          },
        })
      }
    })
  }
}
