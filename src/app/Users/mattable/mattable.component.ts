import {Component, ViewChild} from '@angular/core'
import {MatTableDataSource, MatTableModule} from '@angular/material/table'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort'
import {Posts} from '../../Model/posts'
import {DataserviceService} from '../../services/dataservice.service'
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
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
export class MattableComponent {
  Postlist!: Posts[]
  datasource: any
  displaycolumns: string[] = ['title', 'body', 'image', 'action']
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private dataservice: DataserviceService) {
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
}
