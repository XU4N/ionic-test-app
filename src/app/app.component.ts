import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({

    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    rootPage:any = 'TabsPage';

    // array to store each component page with title
    designs: Array<{title: string, component: any}>; 
    authentications: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {

        this.initializeApp();

        this.designs = [

            {title: 'Tabs', component: 'TabsPage'},
            {title: 'Color', component: 'ColorPage'},

            {title: "CRUD - 1", component: 'Crud1Page'},
            {title: "Upload", component: 'UploadPage'},
            {title: "My Files", component: 'MyFilePage'},
            {title: "Calendar", component: 'EventIntegrationPage'},
        ]

        this.authentications = [

            {title: 'Sign-in Methods', component: 'SignInPage'}
        ]
    }

    /*
    @desc   : Initialize the app native plugins
    @input  : none
    @return : none
    */
    initializeApp() {

        this.platform.ready().then(() => {

            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    /*
    @desc   : Navigate to the specific page and reset the content nav to have just this page to avoid back button
    @input  : page
    @return : none
    */
    openPage(page) {

        this.nav.setRoot(page.component);
    }
}
