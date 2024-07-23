import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { IconService } from './service/icon.service';
import { RoomService } from './service/room.service';
import { ResidentService } from './service/resident.service';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/auth.interceptor';
import { AppLayoutModule } from './layout/app.layout.module';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [
        CommonModule,
        FormsModule,
        AppRoutingModule,
        AppLayoutModule,
        DialogModule,
        ButtonModule,
        MessagesModule,
        PanelModule,
        CardModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        IconService,
        RoomService,
        ResidentService,
        MessageService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
