import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from 'src/app/services/branch/branch.service';
import { GroupService } from 'src/app/services/group/group.service';
import { TagAssetService,  } from 'src/app/services/tag-asset/tag-asset.service';

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
  sub_branch: string;
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
  selector: 'app-tag-entry',
  templateUrl: './tag-entry.component.html',
  styleUrls: ['./tag-entry.component.css']
})
export class TagEntryComponent implements OnInit {
  assets: Asset[] = [];
  assetForm!: FormGroup;
  isEdit: boolean = false;
  editAssetId: number | null = null;
  branches: Branch[] = [];
  groups: Group[] = [];
  subBranchOptions: string[] = [];
  noDataFound: boolean = false;

  constructor(
    private tagService: TagAssetService,
    private branchService: BranchService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {
    this.assetForm = this.fb.group({
      branch_id: ['', Validators.required],
      group_id: ['', Validators.required],
      desktop_name: ['', Validators.required],
      configuration: ['', Validators.required],
      tag_name: ['', Validators.required],
      warranty: ['', Validators.required],
      price: ['', Validators.required],
      purchase_date: ['', Validators.required],
      status: ['', Validators.required],
      asset_get_by: ['', Validators.required],
      serial_number: ['', Validators.required],
      sub_branch: ['', Validators.required],
      group_name: ['', Validators.required],
      branch_name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadBranches();
    this.loadGroups();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe((data: Branch[]) => {
      this.branches = data;
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
    });
  }

  onBranchChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBranchId = parseInt(selectElement.value, 10);
    const selectedBranch = this.branches.find(branch => branch.branch_id === selectedBranchId);

    if (selectedBranch && selectedBranch.branch_name === 'Head Office') {
      this.subBranchOptions = [
        'Select Division',
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
    const { branch_id, group_id, sub_branch } = this.assetForm.value;
    this.noDataFound = false;

    if (branch_id && group_id && sub_branch && sub_branch !== 'Select Division') {
      this.tagService.getAssetsByBranchGroupAndSubBranch(branch_id, group_id, sub_branch).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branch_id && sub_branch && sub_branch !== 'Select Division') {
      this.tagService.getAssetsByBranchAndSubBranch(branch_id, sub_branch).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branch_id && group_id) {
      this.tagService.getAssetsByBranchAndGroup(branch_id, group_id).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (branch_id) {
      this.tagService.getAssetsByBranch(branch_id).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    } else if (group_id) {
      this.tagService.getAssetsByGroup(group_id).subscribe({
        next: (data: Asset[]) => {
          this.assets = data;
          this.noDataFound = data.length === 0;
        },
        error: (error) => {
          console.error('Error loading assets:', error);
          this.noDataFound = true;
        }
      });
    }
  }

  editAsset(assetId: number): void {
    this.isEdit = true;
    this.editAssetId = assetId;
    this.tagService.getAssetById(assetId).subscribe(asset => {
      this.assetForm.patchValue({
        ...asset,
        branch_id: asset.branch_id,
        group_id: asset.group_id
      });
    });
  }

  onSubmit(): void {
    if (this.assetForm.valid) {
      if (this.isEdit && this.editAssetId) {
        this.tagService.updateAsset(this.editAssetId, this.assetForm.value).subscribe(() => {
          this.loadAssets();
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.assetForm.reset();
    this.isEdit = false;
    this.editAssetId = null;
  }
}
