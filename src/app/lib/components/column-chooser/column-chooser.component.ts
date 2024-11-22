import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
@Component({
  selector: 'app-column-chooser',
  standalone: true,
  templateUrl: './column-chooser.component.html',
  imports: [
    MatCheckbox
  ]
})
export class ColumnChooserComponent {
  public allSelect = false;

  constructor(
    private readonly dialogRef: MatDialogRef<ColumnChooserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.loadColumnSettings();
  }

  public cancel(): void {
    this.dialogRef.close(true);
  }

  public itemChecked(event: MatCheckboxChange, column: any): void {
    column.visible = event.checked;
    this.saveColumnSettings();
    this.updateAllSelect();
  }

  public updateAllSelect(): void {
    this.allSelect = this.data.items.columns.every(col => col.visible);
  }

  public allCheck(event: MatCheckboxChange): void {
    this.allSelect = event.checked;
    this.data.items.columns.forEach(col => col.visible = this.allSelect);
    this.saveColumnSettings();
  }

  public saveColumnSettings(): void {
    const visibleColumns = this.data.items.columns.filter(col => col.visible).map(col => col.name);
    localStorage.setItem(this.data.items.filterColumn, JSON.stringify(visibleColumns));
  }

  public loadColumnSettings(): void {
    const savedColumns = JSON.parse(localStorage.getItem(this.data.items.filterColumn) || '[]');
    if (savedColumns.length === 0 && localStorage.getItem(this.data.items.filterColumn) !== null) {
      this.data.items.columns.forEach(col => col.visible = false);
    } else if (savedColumns.length === 0 && localStorage.getItem(this.data.items.filterColumn) === null) {
      this.data.items.columns.forEach(col => col.visible = true);
      this.saveColumnSettings();
    } else {
      this.data.items.columns.forEach(col => {
        col.visible = savedColumns.includes(col.name);
      });
    }
    this.updateAllSelect();
  }
}
