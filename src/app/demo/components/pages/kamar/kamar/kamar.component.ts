import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RoomService } from 'src/app/service/room.service';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Room } from 'src/app/demo/api/Room';

@Component({
    templateUrl: './kamar.component.html',
    providers: [MessageService],
    styleUrls: ['./kamar.component.scss']
})
export class KamarComponent implements OnInit {

    roomDialog: boolean = false;
    createRoomDialog: boolean = false;
    updateRoomDialog: boolean = false;
    deleteRoomDialog: boolean = false;
    rooms: Room[] = [];
    room: Room = {} as Room;
    roomForm: FormGroup;
    selectedRooms: Room[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    status: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    isLoading: boolean = false;

    constructor(
        private roomService: RoomService,
        private messageService: MessageService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.roomForm = this.fb.group({
            id: [''],
            floor: ['', Validators.required],
            roomNumber: ['', Validators.required],
            price: ['', Validators.required],
            facilities: [''],
            status: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.loadRooms();
        this.initializeColumns();
        this.initializeStatusOptions();
    }

    private loadRooms() {
        this.roomService.getRooms().then(data => this.rooms = data);
    }

    private initializeColumns() {
        this.cols = [
            { field: 'id', header: 'ID' },
            { field: 'floor', header: 'Lantai' },
            { field: 'roomNumber', header: 'No. Kamar' },
            { field: 'price', header: 'Harga' },
            { field: 'facilities', header: 'Fasilitas' },
            { field: 'status', header: 'Status Kamar' }
        ];
    }

    private initializeStatusOptions() {
        this.status = [
            { label: 'Available', value: 'available' },
            { label: 'Unavailable', value: 'unavailable' }
        ];
    }

    addNew() {
        this.roomForm.reset();
        this.submitted = false;
        this.createRoomDialog = true;
    }

    openNew(room: Room) {
        this.router.navigate(['pages/kamar/add-penghuni'], {
            queryParams: { id: btoa(String(room.id)), roomNumber: room.roomNumber, monthlyPrice: btoa(String(room.price)) },
        });
    }

    editRoom(room: Room) {
        this.roomForm.patchValue(room);
        this.updateRoomDialog = true;
    }

    deleteRoom(room: Room) {
        this.deleteRoomDialog = true;
        this.room = { ...room };
    }
    
    confirmDelete() {
        if (this.room.id) {
            this.deleteRoomDialog = false;
            this.isLoading = true;
    
            this.roomService.deleteRoom(this.room.id).subscribe(
                () => {
                    this.rooms = this.rooms.filter(val => val.id !== this.room.id);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Room Deleted', life: 3000 });
                    this.room = {} as Room;
                    this.isLoading = false;
                    this.loadRooms(); // Optionally reload rooms to confirm deletion
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete room', life: 3000 });
                    this.isLoading = false;
                }
            );
        } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Room ID is missing', life: 3000 });
        }
    }
    

    hideDialog() {
        this.createRoomDialog = false;
        this.updateRoomDialog = false;
        this.submitted = false;
    }

    createRoom() {
        this.submitted = true;

        if (this.roomForm.valid) {
            const room: Room = { ...this.roomForm.value };
            delete room.id; // Ensure id is not sent in payload for creation
            this.isLoading = true;

            this.roomService.saveRoom(room).subscribe(
                newRoom => {
                    this.rooms.push(newRoom);
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Room Created', life: 3000 });
                    this.rooms = [...this.rooms];
                    this.createRoomDialog = false;
                    this.isLoading = false;
                    this.loadRooms();
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to create room', life: 3000 });
                    this.isLoading = false;
                }
            );
        }
    }

    updateRoom() {
        this.submitted = true;
    
        if (this.roomForm.valid) {
            const room: Partial<Room> = { ...this.roomForm.value }; // Gunakan Partial<Room> jika hanya mengirimkan sebagian data
    
            const roomId = this.roomForm.value.id;  // Ambil ID dari form
            if (!roomId) {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Room ID is missing', life: 3000 });
                return;
            }
    
            // Hapus id dan status dari payload
            delete room.id;
            delete room.status;
    
            this.isLoading = true;
    
            this.roomService.updateRoom(roomId, room).subscribe(
                updatedRoom => {
                    this.updateRoomDialog = false;
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Room Updated', life: 3000 });
                    const index = this.findIndexById(roomId);
                    if (index !== -1) {
                        this.rooms[index] = updatedRoom;
                        this.rooms = [...this.rooms];
                    }
                    this.isLoading = false;
                    this.loadRooms();
                },
                error => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update room', life: 3000 });
                    this.isLoading = false;
                }
            );
        }
    }

    findIndexById(id: string): number {
        return this.rooms.findIndex(room => room.id === id);
    }

    createId(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 5 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
