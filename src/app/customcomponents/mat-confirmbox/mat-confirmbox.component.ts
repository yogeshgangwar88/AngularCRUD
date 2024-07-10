import {ChangeDetectionStrategy, Component, Inject} from '@angular/core'
import {MatButton, MatButtonModule} from '@angular/material/button'
import {CommonModule} from '@angular/common'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import {MaterialformsComponent} from '../../materialforms/materialforms.component'

@Component({
  selector: 'app-mat-confirmbox',
  standalone: true,
  templateUrl: './mat-confirmbox.component.html',
  styleUrl: './mat-confirmbox.component.scss',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MaterialformsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatConfirmboxComponent {
  itemidx: any
  //constructor(private ref: MatDialogRef<MatConfirmboxComponent>) {}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<MatConfirmboxComponent>
  ) {
    this.itemidx = data.itemid
  }
  userclicked(ele: any) {
    console.log(ele)
    this.ref.close({
      //  ele._elementRef.nativeElement.id,  (when mat button use)
      btnid: ele.id,
      btntext: ele.innerText,
    })
  }
}
