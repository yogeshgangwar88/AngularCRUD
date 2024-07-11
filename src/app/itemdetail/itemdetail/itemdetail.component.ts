import {Component, OnInit} from '@angular/core'
import {DataserviceService} from '../../services/dataservice.service'
import {Posts} from '../../Model/posts'
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router'
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.scss',
})
export class ItemdetailComponent implements OnInit {
  openDialog(): void {
    if (confirm('Are you sure')) {
      this.delete()
    }
  }

  itemid: any
  constructor(
    private dataser: DataserviceService,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private routesx: Router
  ) {}

  itemdetails!: Posts
  ngOnInit(): void {
    //get param value from url
    this.itemid = this.routes.snapshot.paramMap.get('id')
    this.dataser.getitembyid(this.itemid).subscribe({
      next: (v) => {
        this.itemdetails = v
        console.log(this.itemdetails)
      },
      error: (e) => {},
      complete: () => {},
    })
  }
  delete() {
    this.dataser.deleteitem(this.itemid).subscribe({
      next: (v) => {
        // console.log(v)
        this.toastr.success('Item deleted successfully')
      },
      error: (e) => console.log(this.itemid),
      complete: () => {
        this.routesx.navigate(['/home'])
      },
    })
  }
}
