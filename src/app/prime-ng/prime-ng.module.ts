import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {SplitterModule} from 'primeng/splitter';
import {ToastModule} from 'primeng/toast';

@NgModule({
  exports: [
    ButtonModule,
    CalendarModule,
    ListboxModule,
    MegaMenuModule,
    SplitterModule,
    ToastModule,
  ],
})
export class PrimeNgModule { }
