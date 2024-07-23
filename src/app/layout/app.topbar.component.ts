import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {
    loading = false;

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    @ViewChild('overlay') overlay!: OverlayPanel;
    @ViewChild('profileOverlay') profileOverlay!: OverlayPanel;

    constructor(
        public layoutService: LayoutService,
        private tokenStorage: TokenStorageService,
        private router: Router,
    ) { }

    showProfile(event: Event) {
        this.profileOverlay.toggle(event);
    }

    logout(event: Event) {
        this.loading = true;

        this.tokenStorage.signOut();
        console.log('Token after logout:', this.tokenStorage.getToken());

        setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/auth/login']);
        }, 3000);
    }
}
