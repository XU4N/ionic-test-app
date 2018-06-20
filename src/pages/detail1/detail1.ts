import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Song  } from '../../models/song.interface';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@IonicPage()
@Component({
	selector: 'page-detail1',
	templateUrl: 'detail1.html'
})
export class Detail1Page {

	public song: Song;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public alertCtrl: AlertController,
		public firestoreProvider: FirestoreProvider,
		) {

		this.song = this.navParams.get('song');
	}

	deleteSong(songId: string, songName: string): void {

		const alert: Alert = this.alertCtrl.create({
			message: `Are you sure you want to delete ${songName} from your list?`,
			buttons: [
				{
					text: 'Cancel',
					handler: () => {
						console.log('Clicked Cancel');
					}
				},
				{
					text: 'OK',
					handler: () => {
						this.firestoreProvider.deleteSong(songId).then(() => {
							this.navCtrl.pop();
						});
					}
				}
			]
		});

		alert.present();
	}
}
