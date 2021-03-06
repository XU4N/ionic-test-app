import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, Loading, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreProvider } from '../../providers/firestore/firestore';

@IonicPage()
@Component({
	selector: 'page-create1',
	templateUrl: 'create1.html'
})
export class Create1Page {

	public createSongForm: FormGroup;

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public firestoreProvider: FirestoreProvider,
		formBuilder: FormBuilder
		) {

		this.createSongForm = formBuilder.group({

			albumName: ['', Validators.required],
			artistName: ['', Validators.required],
			songDescription: ['', Validators.required],
			songName: ['', Validators.required],
		});
	}

	createSong(): void {

		const loading: Loading = this.loadingCtrl.create();
		loading.present();

		const albumName = this.createSongForm.value.albumName;
		const artistName = this.createSongForm.value.artistName;
		const songDescription = this.createSongForm.value.songDescription;
		const songName = this.createSongForm.value.songName;

		this.firestoreProvider
			.createSong(albumName, artistName, songDescription, songName)
			.then(
				() => {

					loading.dismiss().then(() => {

						this.navCtrl.pop();
					})
				},
				error => {

					loading.dismiss().then(() => {

						const alert: Alert = this.alertCtrl.create({
							message: error.message,
							buttons: [{ text: 'OK', role: 'cancel'}],
						});

						alert.present();
					});
				}
			);
	}
}
