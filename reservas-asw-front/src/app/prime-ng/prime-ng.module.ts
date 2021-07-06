import { NgModule } from '@angular/core';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {SplitterModule} from 'primeng/splitter';
import {ToastModule} from 'primeng/toast';

@NgModule({
  exports: [
    TableModule,
    ButtonModule,
    CalendarModule,
    ListboxModule,
    MegaMenuModule,
    SplitterModule,
    ToastModule,
  ],
})
export class PrimeNgModule { }
