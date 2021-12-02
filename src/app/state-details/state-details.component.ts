import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountryDetailService } from '../shared/country-detail.service';
import { StateDetail } from '../shared/state-detail.model';
import { StateDetailService } from '../shared/state-detail.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-state-details',
  templateUrl: './state-details.component.html',
  styles: [],
})
export class StateDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  editState: StateDetail;

  constructor(
    public service: StateDetailService,
    public countryservice: CountryDetailService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
    this.countryservice.refreshList();
  }

  openModal(template: TemplateRef<any>, editState: StateDetail) {
    this.editState = editState;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
      ignoreBackdropClick: true,
    });
  }
  updateState(obj: StateDetail, id: number) {
    debugger;
    if (obj.stateName == '') {
      this.toastr.warning('Invalid Data', 'Please Enter the State Name');
    } else {
      this.service.updateStateDetail(obj, id).subscribe(
        (res) => {
          this.service.refreshList();
          this.modalRef.hide();
          this.toastr.info('Updated Successfully', 'State Detail Register');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteStateDetail(id).subscribe(
        (res) => {
          this.service.refreshList();
          this.toastr.error('Deleted Successfully', 'State Detail Register');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
