import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabNavgationPageRoutingModule } from './tab-navgation-routing.module';

import { TabNavgationPage } from './tab-navgation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabNavgationPageRoutingModule
  ],
  declarations: [TabNavgationPage]
})
export class TabNavgationPageModule {}
