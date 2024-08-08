import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from 'src/app/services/group/group.service';

export interface Group2 {
  group_id: number;
  group_name: string;
  stock_in_hand: number;
  
}


export interface Group {
  group_id: number;
  group_name: string;
  branch_id: number;
}



@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groups: Group2[] = [];
  groupForm!: FormGroup;
  selectedGroup: Group2 | null = null;

  constructor(  private groupService: GroupService,private fb: FormBuilder ) { 
    this.groupForm = this.fb.group({
      group_name: ['', Validators.required],
      stock_in_hand: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
   this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getGroups2().subscribe(data => {
      this.groups = data;
    });
  }

  selectGroup(group: Group2): void {
    this.selectedGroup = group;
    this.groupForm.setValue({
      group_name: group.group_name,
      stock_in_hand: group.stock_in_hand
    });
  }

  addGroup(): void {
    if (this.groupForm.valid) {
      const group: Group2 = this.groupForm.value;
      this.groupService.createGroup(group).subscribe(() => {
        this.loadGroups();
        this.groupForm.reset();
      });
    }
  }
  updateGroup(): void {
    if (this.groupForm.valid && this.selectedGroup) {
      const updatedGroup: Group2 = {
        ...this.selectedGroup,
        ...this.groupForm.value
      };
      this.groupService.updateGroup(updatedGroup.group_id, updatedGroup).subscribe(() => {
        this.loadGroups();
        this.groupForm.reset();
        this.selectedGroup = null;
      });
    }
  }

  deleteGroup(id: number): void {
    this.groupService.deleteGroup(id).subscribe(() => {
      this.loadGroups();
    });
  }
 

}
