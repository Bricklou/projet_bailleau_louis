import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([], {
      developmentMode: !isDevMode(),
    }),
  ],
})
export class ReduxModule {}
