import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { GithubIssue } from 'src/app/models/data-format';
import { HttpDatabaseService } from 'src/app/services/http-database.service';
import { displayedColumns } from '../../collection/variables';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = displayedColumns;
  exampleDatabase: HttpDatabaseService | null;
  data: GithubIssue[] = [];
  // dataSource = new MatTableDataSource(this.data); 
  
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  filterValue:string = 'apple';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new HttpDatabaseService(this._httpClient);
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.filterValue, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(this.sort.direction, this.filterValue, this.paginator.pageIndex)}),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalResults;

          return data.articles;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data =>{
        if(data){
          data.forEach((x:any)=>{
            if(x['author'] != null &&  x['author'] != undefined && x['author'].indexOf("www")){
              let split = x.author.split("/");
              x['author'] = split[split.length-1]
            }
          })
        }
        this.data = data;
      });
    }
    applyFilter(event: Event) {
      this.filterValue = (event.target as HTMLInputElement).value || 'apple';
      this.ngAfterViewInit()
    }
}
