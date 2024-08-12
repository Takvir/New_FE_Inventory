import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
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
      asset_get_by: ['', Validators.required],  // This will now be a text input
      serial_number: ['', Validators.required],
      sub_branch: ['', Validators.required],
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
      console.log(this.branches);
    });
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
      console.log(this.groups);
    });
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe(assets => {
      this.assets = assets;
    });
  }

  onSubmit(): void {
    if (this.assetForm.invalid) {
      return;
    }

    const asset: Asset = this.assetForm.value;
    console.log('Form Value:', asset);

    if (this.isEdit && this.editAssetId !== null) {
      this.assetService.updateAsset(this.editAssetId, asset).subscribe(() => {
        this.loadAssets();
        this.resetForm();
      });
    } else {
      this.assetService.addAsset(asset).subscribe(() => {
        this.loadAssets();
        this.resetForm();
      });
    }
  }

  onEdit(asset: Asset): void {
    this.isEdit = true;
    this.editAssetId = asset.id;
    this.assetForm.patchValue(asset);
  }

  onDelete(id: number): void {
    this.assetService.deleteAsset(id).subscribe(() => this.loadAssets());
  }

  resetForm(): void {
    this.isEdit = false;
    this.editAssetId = null;
    this.assetForm.reset();
  }

  onBranchChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedBranchId = parseInt(selectElement.value, 10);
    const selectedBranch = this.branches.find(branch => branch.branch_id === selectedBranchId);
    if (selectedBranch) {
      this.assetForm.patchValue({
        branch_name: selectedBranch.branch_name
      });

      if (selectedBranch.branch_name === 'Head Office') {
        this.subBranchOptions = [
          'Chairman Sir & MD & CEO Office',
          'Agent Banking',
          'AML & CFT',
          'ICT',
          'ADC',
          'Card Division'
        ];
      } else {
        this.subBranchOptions = ['N/A'];
      }

      this.assetForm.patchValue({
        sub_branch: this.subBranchOptions[0]
      });
    }
  }
}
