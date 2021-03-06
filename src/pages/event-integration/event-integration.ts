import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';

@IonicPage()
@Component({
	selector: 'page-event-integration',
	templateUrl: 'event-integration.html'
})
export class EventIntegrationPage {

	date: any;
	daysInThisMonth: any;
	daysInLastMonth: any;
	daysInNextMonth: any;
	monthNames: string[];
	currentMonth: any;
	currentYear: any;
	currentDate: any;

	eventList: any;
	selectedEvent: any;
	isSelected: any;

	constructor(
		public navCtrl: NavController,
		private alertCtrl: AlertController,
		private calendar: Calendar,
		) {

	}

	ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    this.getDaysOfMonth();
    this.loadEventThisMonth();
  }

	getDaysOfMonth() {

		this.daysInThisMonth = new Array();
		this.daysInLastMonth = new Array();
		this.daysInNextMonth = new Array();
		this.currentMonth = this.monthNames[this.date.getMonth()];
		this.currentYear = this.date.getFullYear();

		if (this.date.getMonth() === new Date().getMonth()) {

			this.currentDate = new Date().getDate();
		}
		else {

			this.currentDate = 999;
		}

		//
		var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
		var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();

		for (var i = prevNumOfDays - (firstDayThisMonth-1); i <= prevNumOfDays; i++) {

			this.daysInLastMonth.push(i);
		}

		// 
		var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();

		for (var i = 0; i < thisNumOfDays; i++) {

			this.daysInThisMonth.push(i + 1);
		}

		//
		var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
		var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0).getDate();

		for (var i = 0; i < (6-lastDayThisMonth); i++) {

			this.daysInNextMonth.push(i + 1);
		}

		//
		var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;

		if (totalDays < 36) {

			for (var i = (7-lastDayThisMonth); i < ((7-lastDayThisMonth) + 7); i++) {

				this.daysInNextMonth.push(i);
			}
		}
	}

	goToLastMonth() {

		this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
		this.getDaysOfMonth();
	}

	goToNextMonth() {

		this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
		this.getDaysOfMonth();
	}

	addEvent() {

		this.navCtrl.push('EventAddPage');
	}

	loadEventThisMonth() {
		this.eventList = new Array();
		var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
		var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

		this.calendar.listEventsInRange(startDate, endDate)
		.then(
			(msg) => {

				msg.forEach(item => {

					this.eventList.push(item);
				});
			},
			(err) => {

				console.log(err);
			}
		);
	}

	checkEvent(day) {

		var hasEvent = false;
		var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + day + "00:00:00";
		var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth()+1) + "-" + day + "23:59:59";

		this.eventList.forEach(event => {

			if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {

				hasEvent = true;
			}
		});

		return hasEvent;
	}

	selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();

    var thisDate1 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 00:00:00";
    var thisDate2 = this.date.getFullYear()+"-"+(this.date.getMonth()+1)+"-"+day+" 23:59:59";

    this.eventList.forEach(event => {

      if(((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
      	
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }

	deleteEvent(evt) {

		let alert = this.alertCtrl.create({

			title: 'Confirm Delete',
			message: 'Are you sure want to delete this event?',
			buttons: [
					{
						text: 'Cancel',
						role: 'cancel',
						handler: () => {

							console.log('Cancel clicked');
						}
					},
					{
						text: 'OK',
						handler: () => {

							this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T')))
							.then(

								(msg) => {
									console.log(msg);
									this.loadEventThisMonth();
									this.selectedEvent(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
								},
								(err) => {
									console.log(err);
								}
							)
						}
					}
			]
		});

		alert.present();
	}
}
