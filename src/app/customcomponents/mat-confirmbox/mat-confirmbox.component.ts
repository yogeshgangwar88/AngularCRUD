import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Injectable,
} from '@angular/core'
import { MatButton, MatButtonModule } from '@angular/material/button'
import { CommonModule } from '@angular/common'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import { MaterialformsComponent } from '../../materialforms/materialforms.component'

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
    MatDialogActions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@Injectable({
  providedIn: 'root',
})
export class MatConfirmboxComponent {
  itemidx!: number

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<MatConfirmboxComponent>,
    private dialog: MatDialog
  ) {
    // console.log(this.itemidx)
  }

  openModal(
    _modType: string = 'confirm',
    _modContent: string = 'Please Confirm ',
    _itemid: number = 0
  ) {
    this.itemidx = _itemid
    let _modaldata = { type: _modType, content: _modContent, itemid: _itemid }

    //console.log(_itemid)
    var _d = this.dialog.open(MatConfirmboxComponent, {
      width: '350px',
      enterAnimationDuration: 200,
      exitAnimationDuration: 200,
      data: _modaldata,
    })

    //console.log(_d)
    return _d
  }
}
