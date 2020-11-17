import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AppHeaderComponent } from './components/layout/app-header/app-header.component';
import { PageHeaderComponent } from './components/layout/page-header/page-header.component';
import { SideBarComponent } from './components/layout/side-bar/side-bar.component';
import { SideNavComponent } from './components/layout/side-nav/side-nav.component';
import { NavigationService, WatchService, StatusService, TFSService, ApiService, NotifyService } from './services';
import { HomeComponent } from './pages/home/home.component';
/* import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatNativeDateModule } from '@angular/material/core'; */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatTabsModule, MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressBarModule, MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatToolbarModule, MatRadioModule, MatAutocompleteModule, MatExpansionModule } from '@angular/material';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieModule } from 'ngx-cookie';
import { WorkItemsComponent } from './pages/work-items/work-items.component';

library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    AppHeaderComponent,
    PageHeaderComponent,
    SideBarComponent,
    SideNavComponent,
    WorkItemsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatAutocompleteModule,
    //MatBadgeModule,
    MatButtonModule,
    //MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    //MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    //MatGridListModule,
    //MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    //MatProgressSpinnerModule,
    MatRadioModule,
    //MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
   // MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    //MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    //MatTooltipModule,
    //MatTreeModule,
    //MatNativeDateModule,
    BrowserAnimationsModule,
    MatDividerModule,
    FontAwesomeModule,
    CookieModule.forRoot()
  ],
  providers: [
    NavigationService,
    WatchService,
    StatusService,
    TFSService,
    ApiService,
    NotifyService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
