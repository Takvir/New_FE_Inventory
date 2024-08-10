import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section/section.service';
import { BranchService } from 'src/app/services/branch/branch.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

@Component({
  selector: 'app-asset-all',
  templateUrl: './asset-all.component.html',
  styleUrls: ['./asset-all.component.css']
})
export class AssetAllComponent implements OnInit {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  assetForm!: FormGroup;
  isEdit: boolean = false;
  editAssetId: number | null = null;
  searchQuery: string = '';

  constructor(private assetService: SectionService, private branchService: BranchService, private fb: FormBuilder) {
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
      serial_number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAssets();
  }

  loadAssets(): void {
    this.assetService.getAssets().subscribe(assets => {
      this.assets = assets;
      this.filteredAssets = assets; // Initialize filtered assets
    });
  }

  filterAssets(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredAssets = this.assets.filter(asset =>
      asset.branch_name.toLowerCase().includes(query) ||
      asset.sub_branch.toLowerCase().includes(query) ||
      asset.group_name.toLowerCase().includes(query) ||
      asset.desktop_name.toLowerCase().includes(query) ||
      asset.configuration.toLowerCase().includes(query) ||
      asset.price.toString().toLowerCase().includes(query) ||
      asset.serial_number.toLowerCase().includes(query) ||
      asset.tag_name.toLowerCase().includes(query)
    );
  }

  onSearchQueryChange(): void {
    this.filterAssets();
  }
}
