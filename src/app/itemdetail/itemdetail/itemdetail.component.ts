import { Component, OnInit } from '@angular/core'
import { DataserviceService } from '../../services/dataservice.service'
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { Product } from '../../Model/product'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [RouterModule, NgIf],
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
    private ActivatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private Router: Router
  ) {
    this.itemdetails = {} as Product
  }

  itemdetails!: Product
  ngOnInit(): void {
    //get param value from url
    this.itemid = this.ActivatedRoute.snapshot.paramMap.get('id')
    this.dataser.getitembyid(this.itemid).subscribe({
      next: (v) => {
        this.itemdetails = v
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {},
    })
  }
  delete() {
    this.dataser.deleteitem(this.itemid).subscribe({
      next: (v) => {
        this.toastr.success('Item deleted successfully')
      },
      error: (e) => {
        console.log(e)
      },
      complete: () => {
        this.Router.navigate(['/home'])
      },
    })
  }
}
