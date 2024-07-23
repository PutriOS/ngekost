import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KamarComponent } from './kamar/kamar.component';
import { AddPenghuniComponent } from './add-penghuni/add-penghuni.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: KamarComponent },
		{ path: 'add-penghuni', component: AddPenghuniComponent },
	])],
	exports: [RouterModule]
})
export class KamarRoutingModule { }
