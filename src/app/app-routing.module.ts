import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { BranchComponent } from './components/branch/branch.component';
import { EquipmentComponent } from './components/equipment/equipment.component';
import { AssetAllComponent } from './components/asset-all/asset-all.component';
import { AssetBranchComponent } from './components/asset-branch/asset-branch.component';
import { AllReportComponent } from './components/all-report/all-report.component';
import { GroupComponent } from './components/group/group.component';
import { StockReportComponent } from './components/stock-report/stock-report.component';



const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'branch-list', component: BranchComponent  },
  { path: 'equipment', component: EquipmentComponent  },
  { path: 'all-asset', component: AssetAllComponent  },
  { path: 'branch-asset', component: AssetBranchComponent  },
  { path: 'summary', component: AllReportComponent  },
  { path: 'group-add' , component:GroupComponent},
  { path: 'stock-report' , component: StockReportComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
