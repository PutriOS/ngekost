import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { ResidentService } from 'src/app/service/resident.service';
import { Resident } from 'src/app/demo/api/Resident';

@Component({
    templateUrl: 'penghuni.component.html',
    providers: [MessageService]
})
export class PenghuniComponent implements OnInit {

    residentDialog: boolean = false;

    deleteResidentDialog: boolean = false;

    deleteResidentsDialog: boolean = false;

    residents: Resident[] = [];

    resident: Resident = {};

    selectedResidents: Resident[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private residentService: ResidentService, private messageService: MessageService, private router: Router) { }

    ngOnInit() {
        this.residentService.getResidents().then(data => this.residents = data);

        this.cols = [
            { field: 'noKamar', header: 'No. Kamar' },
            { field: 'nama', header: 'Nama' },
            { field: 'noHP', header: 'No. HP' },
            { field: 'masaHuni', header: 'Masa Huni' },
            { field: 'piutang', header: 'Piutang' }
        ];
    }

    addPenghuni(penghuni: Resident) {
        penghuni.id = this.createId();
        this.residents.push(penghuni);
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Penghuni ditambahkan'});
    }

    openNew() {
        this.resident = {};
        this.submitted = false;
        this.residentDialog = true;
    }

    deleteSelectedResidents() {
        this.deleteResidentsDialog = true;
    }

    editResident(resident: Resident) {
        this.resident = { ...resident };
        this.residentDialog = true;
    }

    deleteResident(resident: Resident) {
        this.deleteResidentDialog = true;
        this.resident = { ...resident };
    }

    confirmDeleteSelected() {
        this.deleteResidentsDialog = false;
        this.residents = this.residents.filter(val => !this.selectedResidents.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Residents Deleted', life: 3000 });
        this.selectedResidents = [];
    }

    confirmDelete() {
        this.deleteResidentDialog = false;
        this.residents = this.residents.filter(val => val.id !== this.resident.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Resident Deleted', life: 3000 });
        this.resident = {};
    }

    hideDialog() {
        this.residentDialog = false;
        this.submitted = false;
    }

    saveResident() {
        this.submitted = true;

        if (this.resident.nama?.trim()) {
            if (this.resident.id) {
                this.residents[this.findIndexById(this.resident.id)] = this.resident;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Resident Updated', life: 3000 });
            } else {
                this.resident.id = this.createId();
                this.residents.push(this.resident);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Resident Created', life: 3000 });
            }

            this.residents = [...this.residents];
            this.residentDialog = false;
            this.resident = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.residents.length; i++) {
            if (this.residents[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
