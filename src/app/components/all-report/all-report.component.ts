import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { GroupService } from 'src/app/services/group/group.service';

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
}

export interface Branch {
  branch_id: number;
  branch_name: string;
  number_of_employees: number;
}

export interface Group {
  group_id: number;
  group_name: string;
  branch_id: number;
}

interface AssetCount {
  [branchName: string]: {
    [groupName: string]: number;
  };
}

@Component({
  selector: 'app-all-report',
  templateUrl: './all-report.component.html',
  styleUrls: ['./all-report.component.css']
})
export class AllReportComponent implements OnInit {
  assets: Asset[] = [];
  branches: Branch[] = [];
  groups: Group[] = [];
  assetCounts: AssetCount = {};

  constructor(
    private assetService: SectionService,
    private branchService: BranchService,
    private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.loadBranches();
    this.loadGroups();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe((data: Branch[]) => {
      this.branches = data;
      this.loadAssets();
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe((assets: Asset[]) => {
      this.assets = assets;
      this.calculateAssetCounts();
    });
  }

  calculateAssetCounts(): void {
    this.branches.forEach(branch => {
      this.assetCounts[branch.branch_name] = {};
      this.groups.filter(group => group.branch_id === branch.branch_id).forEach(group => {
        this.assetCounts[branch.branch_name][group.group_name] = 0;
      });
    });

    this.assets.forEach(asset => {
      const branchName = asset.branch_name;
      const groupName = this.groups.find(group => group.group_id === asset.group_id)?.group_name;
      if (groupName) {
        this.assetCounts[branchName][groupName] = (this.assetCounts[branchName][groupName] || 0) + 1;
      }
    });
  }
}
