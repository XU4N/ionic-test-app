import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
	selector: 'page-event-add',
	templateUrl: 'event-add.html'
})
export class EventAddPage {

	event = { 
		title: "",
		location: "",
		message: "",
		startDate: "",
		endDate: "",
	};

	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public navParams: NavParams,
		public calendar: Calendar
		) {

	}

	save() {

		this.calendar.createEvent(this.event.title, this.event.location, this.event.message, new Date(this.event.startDate), new Date(this.event.endDate))
		.then(
			(msg) => {

				let alert = this.alertCtrl.create({

					title: 'Success!',
					subTitle: 'Event saved successfully',
					buttons: ['OK'],
				});

				alert.present();
				this.navCtrl.pop();
			},
			(err) => {

				let alert = this.alertCtrl.create({

					title: 'Failed!',
					subTitle: err,
					buttons: ['OK']
				});

				alert.present();
			}
		);
	}
}
