import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../demo/api/Room';
import { Observable } from 'rxjs';

@Injectable()
export class RoomService {

    private apiUrl = 'http://localhost:8888/api/v1/room';

    constructor(private http: HttpClient) { }

    getRooms(): Promise<Room[]> {
        return this.http.get<{ status: string; data: Room[] }>(this.apiUrl)
            .toPromise()
            .then(res => {
                console.log("Data diterima dari server:", res.data);
                return res.data; // Kembalikan hanya data
            })
            .catch(error => {
                console.error("Error fetching rooms:", error);
                throw error; // Lempar error jika ada
            });
    }
    
    saveRoom(room: Room): Observable<Room> {
        return this.http.post<Room>(this.apiUrl, room);
    }
    
    
    updateRoom(id: number, room: Partial<Room>): Observable<Room> {
        return this.http.put<Room>(`${this.apiUrl}/${id}`, room);
    }



    deleteRoom(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
