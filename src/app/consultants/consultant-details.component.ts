import { Component, OnInit } from '@angular/core';
import { DataService } from "./shared/dataService";
import { ImageService } from "./shared/imageHandler";

import { Consultant } from "./shared/consultant";
import { Address } from "./shared/address";

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'consultant-details',
  templateUrl: './consultant-details.component.html',
  styleUrls: ['./consultant-details.component.css'],
})
export class ConsultantDetailsComponent implements OnInit {
  consultant: Consultant;

  pageTitle = 'Consultant Details';
  errorMessage: string;

  constructor(private data: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private imageHandler: ImageService
  ) { }

  get addresses(): Array<Address> {
    return <Array<Address>>this.consultant.addresses;
  }

  ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      const consultantId = +id;
      this.data.getConsultantByID(consultantId, true)
        .subscribe(
          (consultant: Consultant) => this.setConsultant(consultant),
          (error: any) => this.errorMessage = <any>error
        );
    }    
  }

  setConsultant(consultantFromDB: Consultant): void {
    this.consultant=consultantFromDB;
    this.consultant.imageURL= this.imageHandler.returnConsultantImageUrl(this.consultant.imageURL);
  }

  onBack() {
    this.location.back();
  }

}
