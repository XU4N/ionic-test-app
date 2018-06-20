import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Crud1Page } from './crud1';

@NgModule({

	declarations: [

		Crud1Page
	],
	imports: [

		IonicPageModule.forChild(Crud1Page)
	]
})
export class Crud1PageModule {}