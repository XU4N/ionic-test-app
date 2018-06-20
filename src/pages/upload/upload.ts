import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
	selector: 'page-upload',
	templateUrl: 'upload.html'
})
export class UploadPage {

	task: AngularFireUploadTask;
	progress: any;
	image: string;

	constructor(
		public navCtrl: NavController,
		public storage: AngularFireStorage,
		private camera: Camera
		) {

	}

	async captureImage() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    return await this.camera.getPicture(options)
	}

	createUploadTask(file: string): void {

    const filePath = `my-pet-crocodile_${ new Date().getTime() }.jpg`;

    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(filePath).putString(this.image, 'data_url');

    this.progress = this.task.percentageChanges();
	}

	async uploadHandler() {
   const base64 = await this.captureImage();
   this.createUploadTask(base64);
	}
}
