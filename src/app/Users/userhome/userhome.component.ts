import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { CurrencyPipe, JsonPipe, NgIf } from '@angular/common'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'
import { DataserviceService } from '../../services/dataservice.service'
import { ToastrService } from 'ngx-toastr'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { RouterModule } from '@angular/router'
import { CustomedirectiveDirective } from '../../Directive/customedirective.directive'
import { Product } from '../../Model/product'

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    RouterModule,
    CustomedirectiveDirective,
    CurrencyPipe,
    NgIf,
  ],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.scss',
})
export class UserhomeComponent implements OnInit {
  btntxt = 'Save Item'
  editmode = false
  modelref: any = null
  imgurl = 'assets/usrimg.png'
  getdata: Product[] = []
  postdata = {} as Product
  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private dataservice: DataserviceService,
    private toastr: ToastrService //private matthin: MatConfirmboxComponent
  ) {
    config.backdrop = 'static'
    config.keyboard = true
  }
  //

  //
  destroyref = inject(DestroyRef)
  itmform = new FormGroup({
    id: new FormControl(0),
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl('0', [Validators.required]),
  })

  openmodal(actiontype: string, content: any): void {
    if (actiontype == 'add') {
      this.editmode = false
      this.itmform.reset()
      this.imgurl = 'assets/usrimg.png'
    }
    this.setSavebtn()
    this.modelref = this.modalService.open(content)
  }
  closePopup() {
    //debugger
    this.modelref.close()
  }
  //modalpop: any

  ngOnInit(): void {
    this.getalldata()
    //
  }

  getalldata() {
    this.dataservice
      .Getdata()
      .pipe(takeUntilDestroyed(this.destroyref))
      .subscribe((res: any) => {
        this.getdata = res.dataList
        this.getdata = this.getdata.slice(0, 5)
      })
  }
  onsubmit(formvalue: any) {
    let _id = formvalue.value.id == null ? 0 : formvalue.value.id
    var formdata = new FormData()
    formdata.append('File', this.userfile)
    formdata.append('id', _id.toString())
    formdata.append('productName', formvalue.value.productName)
    formdata.append('description', formvalue.value.description)
    formdata.append('price', formvalue.value.price.toString())
    if (this.editmode) {
      this.dataservice.Edititembyid(_id, formdata).subscribe({
        next: (v) => {
          this.modelref.close()
          this.toastr.success('Edited item success')
          this.getalldata()
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      })
    } else {
      this.dataservice.additem(formdata).subscribe({
        next: (v) => {
          this.modelref.close()
          this.toastr.success('Added item')
          this.getalldata()
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      })
    }
    this.setSavebtn()
  }
  editpopup(i: number, model: any) {
    this.dataservice.getitembyid(i).subscribe({
      next: (v) => {
        this.itmform = new FormGroup({
          id: new FormControl(v.id),
          productName: new FormControl(v.productName, [
            Validators.required,
            Validators.minLength(3),
          ]),
          description: new FormControl(v.description, [
            Validators.required,
            Validators.minLength(3),
          ]),
          price: new FormControl(v.price.toLocaleString()),
        })
        this.imgurl = v.imageName
          ? 'http://localhost:5123/staticImages/' + v.imageName
          : 'assets/usrimg.png'
      },
      error: (e) => {},
      complete: () => {
        this.getalldata()
      },
    })
    this.editmode = true
    this.openmodal('edit', model)
  }
  deteleitem(i: number) {
    if (confirm('Are you sure ?')) {
      this.dataservice.deleteitem(i).subscribe({
        next: (v) => {
          //console.log(v)
          this.toastr.success('Item deleted successfully')
        },
        error: (e) => console.log(e),
        complete: () => {
          this.getalldata()
        },
      })
    }
  }
  setSavebtn() {
    if (this.editmode) {
      this.btntxt = 'Edit Item'
    } else this.btntxt = 'Save Item'
  }
  userfile: any
  Imagechange(e: any) {
    let filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    this.userfile = e.target.files[0]
    filereader.onload = (event: any) => {
      this.imgurl = event.target.result
    }
  }
}

////////////////
