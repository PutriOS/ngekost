import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'kamar', loadChildren: () => import('./kamar/kamar/kamar.module').then(m => m.KamarModule) },
        { path: 'add-penghuni', loadChildren: () => import('./kamar/add-penghuni/add-penghuni.module').then(m => m.AddPenghuniModule) },
        { path: 'penghuni', loadChildren: () => import('./penghuni/penghuni/penghuni.module').then(m => m.PenghuniModule) },
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
