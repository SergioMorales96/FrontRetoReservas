import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  exports: [
    TableModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    InputNumberModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule,
    KeyFilterModule,
    ListboxModule,
    MegaMenuModule,
    SplitterModule,
    TableModule,
    ToastModule,
    TooltipModule,
    ConfirmDialogModule,
    MessagesModule,   
  ],
})
export class PrimeNgModule { }
