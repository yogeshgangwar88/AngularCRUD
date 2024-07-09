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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatConfirmboxComponent {
  clickedbtn: any
  //constructor(private ref: MatDialogRef<MatConfirmboxComponent>) {}
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<MatConfirmboxComponent>
  ) {}
  userclicked(ele: MatButton) {
    this.ref.close({
      btnid: ele._elementRef.nativeElement.id,
      btntext: ele._elementRef.nativeElement.innerText,
    })
  }
}
