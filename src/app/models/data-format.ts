export interface GithubApi {
    articles: GithubIssue[];
    totalResults: number;
  }
  
  export interface GithubIssue {
    Image: string;
    Source: string;
    Author: string;
    Title: string;
    Date: string;
    URL:string;
  }
  
  