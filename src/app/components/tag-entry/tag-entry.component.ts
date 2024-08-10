import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  group_name: string;
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

  constructor(
    private assetService: SectionService,
    private branchService: BranchService,
    private groupService: GroupService,
    private fb: FormBuilder
  ) {
    this.assetForm = this.fb.group({
      branch_id: ['', Validators.required],
      branch_name: ['', Validators.required],
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
      group_name: ['', Validators.required] // Add this line
    });
  }

  ngOnInit(): void {
    this.loadAssets();
    this.loadGroups();
    this.loadBranches();
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

  loadAssets(): void {
    this.assetService.getAssets().subscribe(assets => {
      this.assets = assets;
    });
  }

  onEdit(asset: Asset): void {
    this.isEdit = true;
    this.editAssetId = asset.id;
    // Patch the form without the `id`
    this.assetForm.patchValue({
      branch_id: asset.branch_id,
      branch_name: asset.branch_name,
      group_id: asset.group_id,
      desktop_name: asset.desktop_name,
      configuration: asset.configuration,
      tag_name: asset.tag_name,
      warranty: asset.warranty,
      price: asset.price,
      purchase_date: asset.purchase_date,
      status: asset.status,
      asset_get_by: asset.asset_get_by,
      serial_number: asset.serial_number,
      sub_branch: asset.sub_branch,
      group_name: asset.group_name // Add this line
    });
  }



  onCancel(): void {
    this.isEdit = false;
    this.editAssetId = null;
    this.assetForm.reset();
  }
}
