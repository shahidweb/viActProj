import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainContainerRoutingModule } from './main-container-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TableComponent } from './table/table.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
@NgModule({
  declarations: [TableComponent, HeaderComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MainContainerRoutingModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule
    
  ]
})
export class MainContainerModule { }
