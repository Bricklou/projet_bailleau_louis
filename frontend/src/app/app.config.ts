import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CardState } from './modules/redux/states/shopping-cart/cart.state';
import { NgxsModule } from '@ngxs/store';
import { apiHttpInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiHttpInterceptor])),
    importProvidersFrom(NgxsModule.forRoot([CardState])),
  ],
};
