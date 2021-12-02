import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CountryDetail } from '../shared/country-detail.model';
import { CountryDetailService } from '../shared/country-detail.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styles: [],
})
export class CountryDetailsComponent implements OnInit {
  modalRef: BsModalRef;
  editCoutry: CountryDetail;

  constructor(
    private modalService: BsModalService,
    public service: CountryDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
  }  
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteCountryDetail(id).subscribe(
        (res) => {
          this.service.refreshList();
          this.toastr.error('Deleted successfully', 'Country Detail Register');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  openModal(template: TemplateRef<any>, editCoutry: CountryDetail) {
    this.editCoutry = editCoutry;
    this.modalRef = this.modalService.show(template, {
      class: 'modal-xl',
      backdrop: 'static',
      keyboard: false,
      ignoreBackdropClick: true,
    });
  }
  updateCountry(editCoutry: CountryDetail, id: number) {    
    if (editCoutry.name == '') {
      this.toastr.warning('Invalid Data', 'Please Enter the Country Name');
    } else {
    this.service.updateCountryDetail(editCoutry, id).subscribe(
      (res) => {
        this.editCoutry= new CountryDetail();
        this.service.refreshList();
        this.modalRef.hide();
        this.toastr.info('Updated successfully', 'Country Detail Register');
      },
      (err) => {
        console.log(err);
      }
    );
  }}
}
