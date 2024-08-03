import { Injectable } from '@angular/core';
import { HttpClient,HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Group {
  group_id: number;
  group_name: string;
  branch_id: number;
}


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = 'http://localhost:3000/api/groups';

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }
}
