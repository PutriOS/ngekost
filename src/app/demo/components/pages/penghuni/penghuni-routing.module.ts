import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PenghuniComponent } from './penghuni/penghuni.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PenghuniComponent },
	])],
	exports: [RouterModule]
})
export class PenghuniRoutingModule { }
