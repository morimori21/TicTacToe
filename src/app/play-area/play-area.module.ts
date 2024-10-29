import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayAreaPageRoutingModule } from './play-area-routing.module';

import { PlayAreaPage } from './play-area.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayAreaPageRoutingModule
  ],
  declarations: [PlayAreaPage]
})
export class PlayAreaPageModule {}
