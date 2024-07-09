import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import {DataserviceService} from '../../services/dataservice.service'
import {Posts} from '../../Model/posts'
import {ActivatedRoute, Router, RouterModule, Routes} from '@angular/router'
import {UserhomeComponent} from '../../Users/userhome/userhome.component'
import {ToastrService} from 'ngx-toastr'
import {MatDialog} from '@angular/material/dialog'
import {MatConfirmboxComponent} from '../../customcomponents/mat-confirmbox/mat-confirmbox.component'

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.scss',
})
export class ItemdetailComponent implements OnInit, AfterViewInit {
  readonly dialog = inject(MatDialog)

  openDialog(): void {
    ////use _Infodata for info madal ////////
    let _Infodata = {
      type: 'info',
      title: 'Information',
      content: 'some content here',
    }
    ////use _confirmboxdata for _confirmboxdata madal ////////
    let _confirmboxdata = {
      type: 'confirm',
      title: 'Are you Sure ?',
      content: 'This file will be removed permanantly',
    }

    var dial = this.dialog.open(MatConfirmboxComponent, {
      width: '550px',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: _confirmboxdata,
    })
    dial.afterClosed().subscribe((res) => {
      if (res.btnid == 'confirmboxok') {
        this.delete()
      }
    })
  }

  itemid: any
  constructor(
    private dataser: DataserviceService,
    private routes: ActivatedRoute,
    private toastr: ToastrService,
    private routesx: Router
  ) {}
  ngAfterViewInit(): void {
    //console.log(this.Userhome)
    //throw new Error('Method not implemented.')
  }
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
