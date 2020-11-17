import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WorkItemsComponent } from './pages/work-items/work-items.component';

export const routes: Routes = [{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', 
}, {
    path: 'home',
    component: HomeComponent
}, {
    path: 'work-items',
    component: WorkItemsComponent
}]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
