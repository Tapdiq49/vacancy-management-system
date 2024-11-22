import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColumnChooserComponent } from './column-chooser.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import createSpyObj = jasmine.createSpyObj;

describe('ColumnChooserComponent', () => {
  let component: ColumnChooserComponent;
  let fixture: ComponentFixture<ColumnChooserComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ColumnChooserComponent>>;
  let mockData: any;

  beforeEach(async () => {
    mockDialogRef = createSpyObj('MatDialogRef', ['close']);
    mockData = {
      items: {
        filterColumn: 'testFilter',
        columns: [
          { name: 'column1', label: 'Column 1', visible: true },
          { name: 'column2', label: 'Column 2', visible: false },
          { name: 'column3', label: 'Column 3', visible: true }
        ]
      }
    };
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCheckbox
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('should load column settings on init', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['column1', 'column3']));
    spyOn(component, 'updateAllSelect');

    // Act
    component.ngOnInit();

    // Assert
    expect(mockData.items.columns[0].visible).toBeTrue();
    expect(mockData.items.columns[1].visible).toBeFalse();
    expect(mockData.items.columns[2].visible).toBeTrue();
    expect(component.updateAllSelect).toHaveBeenCalled();
  });

  it('should close dialog with true on cancel', () => {
    // Act
    component.cancel();

    // Assert
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should update column visibility and save settings when itemChecked is called', () => {
    // Arrange
    spyOn(localStorage, 'setItem');
    const changeEvent = new MatCheckboxChange();
    changeEvent.checked = false;

    // Act
    component.itemChecked(changeEvent, mockData.items.columns[0]);

    // Assert
    expect(mockData.items.columns[0].visible).toBeFalse();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      mockData.items.filterColumn,
      JSON.stringify(['column2', 'column3'])
    );
  });

  it('should update allSelect to true when allCheck is called with checked event', () => {
    // Arrange
    spyOn(localStorage, 'setItem');
    const changeEvent = new MatCheckboxChange();
    changeEvent.checked = true;

    // Act
    component.allCheck(changeEvent);

    // Assert
    expect(component.allSelect).toBeTrue();
    expect(mockData.items.columns.every(col => col.visible)).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      mockData.items.filterColumn,
      JSON.stringify(['column1', 'column2', 'column3'])
    );
  });

  it('should update allSelect based on column visibility', () => {
    // Arrange
    mockData.items.columns[0].visible = true;
    mockData.items.columns[1].visible = false;
    mockData.items.columns[2].visible = true;

    // Act
    component.updateAllSelect();

    // Assert
    expect(component.allSelect).toBeFalse();
  });
});
