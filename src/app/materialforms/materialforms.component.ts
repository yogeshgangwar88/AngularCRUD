import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { DataserviceService } from '../services/dataservice.service'
import { CommonModule } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog'
import { MatConfirmboxComponent } from '../customcomponents/mat-confirmbox/mat-confirmbox.component'

@Component({
  selector: 'app-materialforms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogClose],
  templateUrl: './materialforms.component.html',
  styleUrl: './materialforms.component.scss',
})
export class MaterialformsComponent implements OnInit {
  @Input('itemid') itemid!: number
  @ViewChild('imgfile') imgfile!: ElementRef
  postdata: any
  imgurl = '/assets/usrimg.png'
  constructor(
    private dataser: DataserviceService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<MatConfirmboxComponent>,
    private matd: MatConfirmboxComponent
  ) {}

  ngOnInit(): void {
    this.dataser.getitembyid(this.itemid).subscribe({
      next: (v) => {
        this.signupform.controls.body.setValue(v.description)
        this.signupform.controls.title.setValue(v.productName)
        this.signupform.controls.Price.setValue(v.price.toString())
        this.signupform.controls.imageName.setValue(v.imageName)
        if (v.imageName == null) {
          this.imgfile.nativeElement.src = '/assets/usrimg.png'
        } else
          this.imgfile.nativeElement.src =
            'http://localhost:5123/staticImages/' + v.imageName
      },
      error(err) {},
      complete() {},
    })
  }
  signupform = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    body: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userid: new FormControl(2),
    Price: new FormControl('', [Validators.required]),
    imageName: new FormControl(''),
    imagefile: new FormControl(''),
  })
  userfile: any
  Imagechange(e: any) {
    let filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    this.userfile = e.target.files[0]
    filereader.onload = (event: any) => {
      this.imgurl = event.target.result
    }
  }
  onSubmit(fvalue: any) {
    var formdata = new FormData()
    formdata.append('Id', this.itemid.toString())
    formdata.append('ProductName', fvalue.title)
    formdata.append('Description', fvalue.body)
    formdata.append('Price', fvalue.Price)
    formdata.append('ImageName', fvalue.imageName)
    formdata.append('File', this.userfile)
    this.dataser.Edititembyid(this.itemid, formdata).subscribe({
      next: (v) => {
        this.dialogRef.close({ success: true })

        this.matd.openModal('success', 'Item Updated Successfully')
      },
      error: (e) => {
        console.log(e)
      },
      complete() {},
    })
  }
}
