import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch/branch.service';
import { GroupService } from 'src/app/services/group/group.service';
import { SectionService } from 'src/app/services/section/section.service';

export interface Asset {
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
}

export interface Branch {
  branch_id: number;
  branch_name: string;
}

export interface Group {
  group_id: number;
  group_name: string;
  branch_id: number;
}

@Component({
  selector: 'app-asset-branch',
  templateUrl: './asset-branch.component.html',
  styleUrls: ['./asset-branch.component.css']
})
export class AssetBranchComponent implements OnInit {

  branches: Branch[] = [];
  groups: Group[] = [];
  assets: Asset[] = [];
  assetForm!: FormGroup;
  subBranchOptions: string[] = [];
  noDataFound: boolean = false;

  constructor(
    private assetService: SectionService,
    private branchService: BranchService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assetForm = this.fb.group({
      branchId: ['', Validators.required],
      groupId: ['', Validators.required],
      subBranch: [{ value: '', disabled: true }]
    });

    this.loadBranches();
    this.loadGroups();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe((data: Branch[]) => {
      this.branches = data;
      console.log(this.branches);
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
      console.log(this.groups);
    });
  }

  onBranchChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBranchId = parseInt(selectElement.value, 10);
    const selectedBranch = this.branches.find(branch => branch.branch_id === selectedBranchId);

    if (selectedBranch && selectedBranch.branch_name === 'Head Office') {
      this.subBranchOptions = [

        'Chairman Sir & MD & CEO Office',
        'Agent Banking',
        'AML & CFT',
        'ICT',
        'ADC',
        'Card Division'
      ];
      this.assetForm.get('subBranch')?.enable();
    } else {
      this.subBranchOptions = ['Select Division'];
      this.assetForm.get('subBranch')?.disable();
      this.assetForm.patchValue({ subBranch: 'Select Division' });
    }
  }

  loadAssets(): void {
    const { branchId, groupId, subBranch } = this.assetForm.value;
    this.noDataFound = false;

    if (branchId && groupId && subBranch) {
      this.assetService.getAssetsByBranchGroupAndSubBranch(branchId, groupId, subBranch).subscribe((data: Asset[]) => {
        this.assets = data;
        this.noDataFound = data.length === 0;
      });
    } else if (branchId && groupId) {
      this.assetService.getAssetsByBranchAndGroup(branchId, groupId).subscribe((data: Asset[]) => {
        this.assets = data;
        this.noDataFound = data.length === 0;
      });
    } else if (branchId) {
      this.assetService.getAssetsByBranch(branchId).subscribe((data: Asset[]) => {
        this.assets = data;
        this.noDataFound = data.length === 0;
      });
    } else if (groupId) {
      this.assetService.getAssetsByGroup(groupId).subscribe((data: Asset[]) => {
        this.assets = data;
        this.noDataFound = data.length === 0;
      });
    }
  }
}
