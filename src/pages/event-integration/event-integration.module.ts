import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventIntegrationPage } from './event-integration';

@NgModule({

	declarations: [

		EventIntegrationPage
	],
	imports: [

		IonicPageModule.forChild(EventIntegrationPage)
	]
})
export class EventIntegrationPageModule {}