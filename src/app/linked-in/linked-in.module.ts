import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkedInRoutingModule } from './linked-in-routing.module';
import { LinkedInComponent } from './linked-in.component';
import { SharedModule } from '@app/shared/shared.module';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [LinkedInComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    LinkedInRoutingModule
  ]
})
export class LinkedInModule { }
