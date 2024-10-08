import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Asset {
  id: number;
  branch_id: number;
  branch_name: string;
  group_id: number;
  desktop_name: string;
  configuration: string;
  tag_name: string;
  warranty: string;
  price: number;
  purchase_date: string;
  status: string;
  asset_get_by: string;
  serial_number: string;
  group_name: string;
  sub_branch: string;
}

export interface Asset2 {
  asset_id: number;
  branch_id: number;
  branch_name: string;
  group_id: number;
  group_name: string;
  desktop_name: string;
  configuration: string;
  tag_name: string;
  warranty: string;
  price: number;
  purchase_date: Date;
  status: string;
  asset_get_by: string;
  serial_number: string;
  sub_branch: string;
}


interface UpdateAsset {
  branch_id: number;
  branch_name: string;
  group_id: number;
  desktop_name: string;
  configuration: string;
  tag_name: string;
  warranty: string;
  price: number;
  purchase_date: string;
  status: string;
  asset_get_by: string;
  serial_number: string;
  sub_branch: string;
  group_name: string;
}


@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = 'http://localhost:3000/api/assets';

  constructor(private http: HttpClient) { }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.apiUrl);
  }

  getAsset(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${this.apiUrl}/${id}`);
  }

  addAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.apiUrl, asset);
  }

  updateAsset(id: number, asset: Asset): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAssetsByBranchAndGroup(branchId: number, groupId: number): Observable<Asset2[]> {
    return this.http.get<Asset2[]>(`${this.apiUrl}/branch/${branchId}/group/${groupId}`);
  }

  getAssetsByBranch(branchId: number): Observable<Asset2[]> {
    return this.http.get<Asset2[]>(`${this.apiUrl}/branch/${branchId}`);
  }

  getAssetsByGroup(groupId: number): Observable<Asset2[]> {
    return this.http.get<Asset2[]>(`${this.apiUrl}/group/${groupId}`);
  }

  getAssetsByBranchGroupAndSubBranch(branchId: number, groupId: number, subBranch: string): Observable<Asset2[]> {
    return this.http.get<Asset2[]>(`${this.apiUrl}/branch/${branchId}/group/${groupId}/sub_branch/${subBranch}`);
  }

  getAssetsByBranchAndSubBranch(branchId: number, subBranch: string): Observable<Asset2[]> {
    return this.http.get<Asset2[]>(`${this.apiUrl}/branch/${branchId}/sub_branch/${subBranch}`);
  }

}
