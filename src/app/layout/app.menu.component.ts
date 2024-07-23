import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard',
                      icon: 'pi pi-fw pi-home', 
                      routerLink: ['/'] 
                    },
                ]
            },
            {
                label: 'KAMAR',
                items: [
                    {
                        label: 'Daftar Kamar',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['/pages/kamar']
                    },
                ]
            },            
            {
                label: 'PENGHUNI',
                items: [
                    {
                        label: 'Daftar Penghuni',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/penghuni']
                    },
                ]
            },
            // {
            //     label: 'PENJAGA KOS',
            //     items: [
            //         {
            //             label: 'Daftar Penjaga',
            //             icon: 'pi pi-fw pi-user',
            //             routerLink: ['/pages/penjaga']
            //         },
            //     ]
            // },
        ];
    }
}
