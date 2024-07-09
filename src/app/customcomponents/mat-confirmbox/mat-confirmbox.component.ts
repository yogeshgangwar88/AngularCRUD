import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
} from '@angular/core'
import {MatButton, MatButtonModule} from '@angular/material/button'
import {
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatConfirmboxComponent {
  clickedbtn: any
  constructor(private ref: MatDialogRef<MatConfirmboxComponent>) {}
  userclicked(ele: MatButton) {
    this.ref.close({
      btn: ele._elementRef.nativeElement.id,
      btntext: ele._elementRef.nativeElement.innerText,
    })
  }
}
