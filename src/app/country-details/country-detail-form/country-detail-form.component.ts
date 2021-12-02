import { Component, OnInit } from '@angular/core';
import { CountryDetail } from 'src/app/shared/country-detail.model';
import { CountryDetailService } from 'src/app/shared/country-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-country-detail-form',
  templateUrl: './country-detail-form.component.html',
  styles: [],
})
export class CountryDetailFormComponent implements OnInit {
  countryDetail = new CountryDetail();
  
  constructor(
    public service: CountryDetailService,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  addNew(obj: CountryDetail) {
    if (obj.name == '') {
      this.toastr.warning('Invalid Data', 'Please Enter the Country Name');
    } else {
      this.service.postCountryDetail(obj).subscribe(
        (res) => {
          this.countryDetail = new CountryDetail();
          this.toastr.success(
            'Submitted successfully',
            'Country Detail Register'
          );
          this.service.refreshList();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
