import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage({

	name: 'TabsPage'
})
@Component({

	templateUrl: 'tabs.html'
})
export class TabsPage {

	mySelectedIndex: number;

	tab1Root = 'NewPage';
	tab2Root = 'NewPage';
	tab3Root = 'NewPage';

	constructor(private navParams: NavParams) {

		this.mySelectedIndex = navParams.data.tabIndex || 0;
	}
}
