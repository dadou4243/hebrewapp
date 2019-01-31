import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DeleteDialogComponent } from './shared/dialogs/delete-word-dialog/delete-dialog.component';
import { DeleteSessionDialogComponent } from './shared/dialogs/delete-session-dialog/delete-session-dialog.component';
import { EditWordDialogComponent } from './shared/dialogs/edit-word-dialog/edit-word-dialog.component';
import { AddNewWordComponent } from './shared/dialogs/add-new-word/add-new-word.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appReducers } from './app-state';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserModule } from './authentication/user.module';
import { UserEffects } from './authentication/state/user.effects';
import { WordsModule } from './words/words.module';
import { ProfileComponent } from './authentication/components/profile/profile.component';
import { CustomPreloading } from './custom-preloading';
import { ViewWordDialogComponent } from './shared/dialogs/view-word/view-word.component';
import { HeaderComponent } from './core/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DeleteDialogComponent,
    ViewWordDialogComponent,
    DeleteSessionDialogComponent,
    EditWordDialogComponent,
    AddNewWordComponent,
    ProfileComponent
  ],
  entryComponents: [
    DeleteDialogComponent,
    DeleteSessionDialogComponent,
    EditWordDialogComponent,
    ViewWordDialogComponent,
    AddNewWordComponent
  ],
  imports: [
    AppRoutingModule,
    UserModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    WordsModule,
    SharedModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    CustomPreloading
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
