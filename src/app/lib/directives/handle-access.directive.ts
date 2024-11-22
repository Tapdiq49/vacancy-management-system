import { Directive, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[handleAccess]',
  standalone: true
})
export class HandleAccessDirective {
  @Input() accessRight: string[] = [];
  @Input() isHide: boolean = false;

  constructor(
    public el: ElementRef
  ) { }

  ngOnInit() {
    this.hasAccess();
  }

  hasAccess() {
    const userRights: { roles: string[] } = JSON.parse(localStorage.getItem('user_rights') || '{}');
    const rightsStr: string[] = userRights.roles || [];

    if (rightsStr.length && this.accessRight.length) {
      if (!rightsStr.some((right: string) => this.accessRight.includes(right))) {
        if (this.isHide) {
          this.el.nativeElement.classList.add('d-none');
        } else {
          this.el.nativeElement.disabled = true;
          this.el.nativeElement.classList.add('access-disabled');
        }
      }
    }
  }

}
