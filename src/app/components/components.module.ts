import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryBuilderComponent } from './query-builder/query-builder.component';

import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [QueryBuilderComponent],
  imports: [
    CommonModule,FormsModule,
  ], exports: [QueryBuilderComponent]
})
export class ComponentsModule { }
