import {Directive, ElementRef, Input} from '@angular/core'

@Directive({
  selector: '[appCustomedirective]',
  standalone: true,
  host: {
    '(click)': 'myfunction()',
  },
})
export class CustomedirectiveDirective {
  @Input() p1 = 0
  @Input() p2 = ''
  constructor(private el: ElementRef) {
    this.el = el
    this.el.nativeElement.style.color = 'red'
  }

  myfunction() {
    if (this.el) {
      console.log('p1-p2', this.p1, this.p2)
    }
  }
}
