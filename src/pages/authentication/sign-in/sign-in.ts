import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

export interface User {

	email: string;
	password: string;
}

@IonicPage()
@Component({
	selector: 'page-sign-in',
	templateUrl: 'sign-in.html'
})
export class SignInPage {

	user = {} as User;

	constructor(
		private afAuth: AngularFireAuth,
		public navCtrl: NavController,
		public navParams: NavParams
		) {

	}

	// email & password login
	async login(user: User) {

		try {

			const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);

			if (result) {

				this.navCtrl.setRoot('NewPage');
			}
		}
		catch (e) {

			console.error(e);
		}
	}

	// email & password register
	async register(user: User) {

		try {

			const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

			if (result) {

				this.navCtrl.setRoot('NewPage');
			}
		}
		catch (e) {

			console.error(e);
		}
	}
}
