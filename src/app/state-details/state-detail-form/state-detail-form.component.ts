import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StateDetail } from 'src/app/shared/state-detail.model';
import { StateDetailService } from 'src/app/shared/state-detail.service';
import { CountryDetailService } from 'src/app/shared/country-detail.service';

@Component({
  selector: 'app-state-detail-form',
  templateUrl: './state-detail-form.component.html',
  styles: [],
})
export class StateDetailFormComponent implements OnInit {
  selectedValue = null;
  levelNum: number;

  countryDetail = new StateDetail();

  constructor(
    public service: StateDetailService,
    public countryservices: CountryDetailService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.countryservices.refreshList();
  }
  
  addNew(obj: StateDetail) {
    if (obj.stateName == '') {
      this.toastr.warning('Invalid Data', 'Please Enter the State Name');
    } else {
      this.service.postStateDetail(obj).subscribe(
        (res) => {
        this.countryDetail =new StateDetail(); 
          this.service.refreshList();
          this.toastr.success('Submitted successfully', 'State Detail Register');
        },
        (err) => {
          console.log(err);
        }
      );
    }   
  }
}
