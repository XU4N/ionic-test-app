import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FileDataProvider } from './../../providers/file-data/file-data';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-my-file',
  templateUrl: 'my-file.html',
})
export class MyFilePage {

	files: Observable<any[]>;

  constructor(
  	public navCtrl: NavController, 
  	private dataProvider: FileDataProvider,
  	public navParams: NavParams,
  	public alertCtrl: AlertController,
  	public toastCtrl: ToastController,
  	private iab: InAppBrowser,
  	) {

  	this.files = this.dataProvider.getFiles();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyFilePage');
  }

  addFile() {

  	let inputAlert = this.alertCtrl.create({
  		title: 'Store new information',
  		inputs: [
	  		{
	  			name: 'info',
	  			placeholder: 'Lorem ipsum dolor...',
	  		}
	  	],
	  	buttons: [
	  		{
	  			text: 'Cancel',
	  			role: 'cancel'
	  		},
	  		{
	  			text: 'Store',
	  			handler: data => {
	  				this.uploadInformation(data.info);
	  			}
	  		}
	  	]
  	});

  	inputAlert.present();
  }

  uploadInformation(text) {

  	let upload = this.dataProvider.uploadToStorage(text);

  	upload.then().then(res => {

  		this.dataProvider.storeInforToDatabase(res.metadata).then(() => {

  			let toast = this.toastCtrl.create({

					message: 'New File added!',
					duration: 3000,
  			});

  			toast.present();
  		});
  	})
  }

  viewFile(url) {

  	this.iab.create(url);
  }

  deleteFile(file) {

  	this.dataProvider.deleteFile(file).subscribe(() => {

  		let toast = this.toastCtrl.create({
  			message: 'File removed!',
  			duration: 3000,
  		});

  		toast.present();
  	});
  }
}
