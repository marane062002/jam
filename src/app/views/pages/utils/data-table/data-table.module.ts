import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    FormsModule
    ],
    exports: [DataTableComponent]
})
export class DataTableModule {}
