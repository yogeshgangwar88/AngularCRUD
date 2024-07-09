import {HttpClient} from '@angular/common/http'
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core'
import {LoginserviceService} from '../../services/loginservice.service'
import {JsonPipe} from '@angular/common'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap'
import {DataserviceService} from '../../services/dataservice.service'
import {Posts} from '../../Model/posts'
import {ToastrService} from 'ngx-toastr'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {interval} from 'rxjs'
import {RouterModule} from '@angular/router'
import {CustomedirectiveDirective} from '../../Directive/customedirective.directive'
//import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
//declare var windows: any

@Component({
  selector: 'app-userhome',
  standalone: true,
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    RouterModule,
    CustomedirectiveDirective,
  ],
  templateUrl: './userhome.component.html',
  styleUrl: './userhome.component.scss',
})
export class UserhomeComponent implements OnInit, AfterViewInit {
  // modalshow: string = 'modal fade'
  // @ViewChild('exampleModal') modal?: ElementRef
  btntxt = 'Save Item'
  editmode = false
  modelref: any = null
  imgurl = 'assets/usrimg.png'
  constructor(
    private myservice: LoginserviceService,
    private httpclnt: HttpClient,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private dataservice: DataserviceService,
    private toastr: ToastrService
  ) {
    config.backdrop = 'static'
    config.keyboard = true
    //////////
  }
  destroyref = inject(DestroyRef)
  itmform = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('/^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/; '),
    ]),
    body: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  ngAfterViewInit(): void {
    //
    console.log('ngAfterViewInit')
  }
  ngOnInit(): void {
    this.getalldata()
    //
  }
  getdata: Posts[] = []

  getalldata() {
    this.dataservice
      .Getdata()
      .pipe(takeUntilDestroyed(this.destroyref))
      .subscribe((res) => {
        this.getdata = res
      })
  }
  onsubmit(formvalue: any) {
    let obj = {
      id: formvalue.value.id,
      userId: 1,
      title: formvalue.value.title,
      body: formvalue.value.body,
    }
    if (this.editmode) {
      this.dataservice.Edititembyid(obj.id, obj).subscribe({
        next: (v) => {
          //console.log(v)
          this.modelref.close()
          this.toastr.success('Edited item success')
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete'),
      })
    } else {
      this.dataservice.additem(obj).subscribe({
        next: (v) => {
          //console.log(v)
          this.modelref.close()
          this.toastr.success('Added item')
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
          title: new FormControl(v.title, [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('a-zA-Z'),
          ]),
          body: new FormControl(v.body, [
            Validators.required,
            Validators.minLength(3),
          ]),
        })
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
          console.log(v)
          this.toastr.success('Item deleted successfully')
        },
        error: (e) => console.log(i),
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
  Imagechange(e: any) {
    let filereader = new FileReader()
    filereader.readAsDataURL(e.target.files[0])
    filereader.onload = (event: any) => {
      this.imgurl = event.target.result
    }
  }
}

////////////////
