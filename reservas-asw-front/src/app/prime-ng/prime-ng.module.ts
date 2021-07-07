import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {SplitterModule} from 'primeng/splitter';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    ListboxModule,
    MegaMenuModule,
    SplitterModule,
    TableModule,
    ToastModule,
    TooltipModule
  ],
})
export class PrimeNgModule { }
