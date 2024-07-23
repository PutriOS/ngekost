import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resident } from '../demo/api/Resident';

@Injectable()
export class ResidentService {

    constructor(private http: HttpClient) { }

    getResidentsSmall() {
        return this.http.get<any>('assets/demo/data/resident.json')
            .toPromise()
            .then(res => res.data as Resident[])
            .then(data => data);
    }

    getResidents() {
        return this.http.get<any>('assets/demo/data/resident.json')
            .toPromise()
            .then(res => {
                console.log("Data diterima dari server:", res);
                return res.data as Resident[];
            })
            .then(data => {
                console.log("Data produk setelah diolah:", data);
                return data;
            })
    }

    addResident(penghuni: any) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(penghuni);
            }, 1000);
        });
    }
}
