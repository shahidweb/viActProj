import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GithubApi } from '../models/data-format';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpDatabaseService {
  apiUrl=environment.apiUrl
  constructor(private _httpClient: HttpClient) {}
  

  getRepoIssues(sort: string, search:string, page: number): Observable<GithubApi> {
    sort = sort == 'desc' ? 'publishedAt' : 'relevancy';
    // const requestUrl="https://jsonplaceholder.typicode.com/comments" //sample
    const requestUrl = `${this.apiUrl}?q=${search}&sortBy=${sort}&from=2021-05-20&to=2021-05-15&page=${page + 1}&pageSize=10&apiKey=ad377dde4ce64275a42789edbfb324ce`;
    return this._httpClient.get<GithubApi>(requestUrl);
  }
}
