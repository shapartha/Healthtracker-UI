import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppInterceptor } from './app.interceptor';
import { LoginComponent } from './modules/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule, MatNativeDateModule, MatOptionModule, NativeDateModule, MatLineModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgIdleModule } from '@ng-idle/core';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './modules/home/home.component';
import { BloodSugarComponent } from './modules/blood-sugar/blood-sugar.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { UpdateBloodSugarComponent } from './modules/blood-sugar/update-blood-sugar/update-blood-sugar.component';
import { ConfirmDialogComponent } from './modules/confirm-dialog/confirm-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LogoutComponent } from './modules/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent, BloodSugarComponent, UpdateBloodSugarComponent, ConfirmDialogComponent, LogoutComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, ReactiveFormsModule, OwlDateTimeModule, OwlNativeDateTimeModule, MatFormFieldModule, MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatCommonModule, MatDatepickerModule, MatDialogModule,
    MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule, MatProgressSpinnerModule, MatProgressBarModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTooltipModule, MatToolbarModule, NgIdleModule.forRoot(), MatSidenavModule
  ],
  providers: [
    provideAnimationsAsync(), provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
