import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Calendar } from '@ionic-native/calendar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { FileDataProvider } from '../providers/file-data/file-data';

@NgModule({
    declarations: [
    
        MyApp,
    ],
    imports: [

        BrowserModule,
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFirestoreModule.enablePersistence(),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFireStorageModule,
    ],
    bootstrap: [

        IonicApp
    ],
    entryComponents: [

        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        FirestoreProvider,
        Camera,
        FileDataProvider,
        InAppBrowser,
        Calendar,
    ]
})
export class AppModule {}
