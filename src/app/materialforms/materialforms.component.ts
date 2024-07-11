import {
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {DataserviceService} from '../services/dataservice.service'
import {CommonModule} from '@angular/common'
import {ToastrService} from 'ngx-toastr'
import {MatDialogClose, MatDialogRef} from '@angular/material/dialog'
import {MatConfirmboxComponent} from '../customcomponents/mat-confirmbox/mat-confirmbox.component'

@Component({
  selector: 'app-materialforms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDialogClose],
  templateUrl: './materialforms.component.html',
  styleUrl: './materialforms.component.scss',
})
export class MaterialformsComponent implements OnInit {
  @Input('itemid') itemid!: number
  constructor(
    private dataser: DataserviceService,
    private toast: ToastrService,
    public dialogRef: MatDialogRef<MatConfirmboxComponent>,
    private matd: MatConfirmboxComponent
  ) {
    console.log(this.itemid)
  }

  ngOnInit(): void {
    this.dataser.getitembyid(this.itemid).subscribe({
      next: (v) => {
        this.signupform.controls.body.setValue(v.body)
        this.signupform.controls.title.setValue(v.title)
      },
      error(err) {},
      complete() {},
    })
  }
  signupform = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    body: new FormControl('', [Validators.required, Validators.minLength(5)]),
    userid: new FormControl(2),
  })
  onSubmit(fvalue: any) {
    let obj = {
      userId: fvalue.userid,
      id: this.itemid,
      title: fvalue.title,
      body: fvalue.body,
    }
    this.dataser.additem(obj).subscribe({
      next: (v) => {
        this.dialogRef.close()
        this.matd.openModal('success', 'Item Updated Successfully')
      },
      error: (e) => {
        console.log(e)
      },
      complete() {},
    })
  }
}
