import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Song } from '../../models/song.interface';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
	selector: 'page-crud1',
	templateUrl: 'crud1.html'
})
export class Crud1Page {

	public songList: Observable<Song[]>;

	constructor(
		public navCtrl: NavController,
		public firestoreProvider: FirestoreProvider
		) {

	}

	ionViewDidLoad() {

		this.songList = this.firestoreProvider.getSongList().valueChanges();
	}

	goToCreatePage() {

		this.navCtrl.push('Create1Page');
	}

	goToDetailPage(song: Song): void {

		this.navCtrl.push('Detail1Page', { song: song });
	}
}
