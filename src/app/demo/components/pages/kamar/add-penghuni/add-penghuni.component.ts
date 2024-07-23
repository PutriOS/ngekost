import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResidentService } from 'src/app/service/resident.service';
import { PenghuniComponent } from '../../penghuni/penghuni/penghuni.component';
import { from } from 'rxjs';
import { RoomService } from 'src/app/service/room.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './add-penghuni.component.html',
    styleUrls: ['./add-penghuni.component.scss'],
    providers: [MessageService, PenghuniComponent]
})
export class AddPenghuniComponent implements OnInit {
    penghuni: any = {};
    id?: string;
    roomNumber?: string;
    monthlyPrice?: number;
    months: any[] = [];

    constructor(
        private residentService: ResidentService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router,
        private penghuniComponent: PenghuniComponent,        
        private http: HttpClient
    ) {
        // Initialize the months dropdown options
        this.months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1} bulan`, value: i + 1 }));
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.id = atob(params['id']);
            this.roomNumber = params['roomNumber'];
            this.monthlyPrice = Number(atob(params['monthlyPrice']));
            this.penghuni.roomNumber = this.roomNumber;
            this.penghuni.monthlyPrice = this.monthlyPrice;
        });
    }

    calculateTotal() {
        if (this.penghuni.monthlyPrice && this.penghuni.masaHuni) {
            this.penghuni.jumlahHarusDibayar = this.penghuni.monthlyPrice * this.penghuni.masaHuni;
        } else {
            this.penghuni.jumlahHarusDibayar = 0;
        }
    }

    onSubmit() {
      this.residentService.addResident(this.penghuni).then(() => {
          this.messageService.add({severity:'success', summary:'Success', detail:'Penghuni Added'});
          this.penghuniComponent.addPenghuni(this.penghuni);  // Add the new resident to the table
          this.router.navigate(['pages/penghuni']);
      });
  }


    // onSubmit() {
    //     from(this.residentService.addResident(this.penghuni)).subscribe(() => {
    //         this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Penghuni Added' });
    //         this.updateRoomStatus(this.penghuni.roomNumber); // Call function to update room status
    //         this.penghuniComponent.addPenghuni(this.penghuni);  // Add new resident to the table
    //         this.router.navigate(['pages/penghuni']);
    //     }, error => {
    //         console.error('Error saving resident:', error);
    //         this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add penghuni' });
    //     });
    // }


    // updateRoomStatus(roomNumber: string): Observable<any> {
    //     return this.http.put<any>(`${this.apiUrl}/rooms/${roomNumber}/updateStatus`, {});
    //   }
    
  resetForm(form: any) {
    const savedRoomNumber = this.penghuni.roomNumber;
    const savedMonthlyPrice = this.penghuni.monthlyPrice;

    form.reset();
    this.penghuni.jumlahHarusDibayar = 0; // Reset jumlah harus dibayar

    // Mengembalikan nilai nomor kamar dan harga per bulan
    this.penghuni.roomNumber = savedRoomNumber;
    this.penghuni.monthlyPrice = savedMonthlyPrice;
  }
}
