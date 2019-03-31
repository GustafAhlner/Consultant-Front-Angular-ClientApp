import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataService } from "./shared/dataService";
import { Consultant } from "./shared/consultant";
import { Address } from "./shared/address";


import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {
  FormGroup, FormBuilder,
  Validators, AbstractControl, FormArray
} from "@angular/forms";
import { Subscription } from 'rxjs';
import { ImageService } from './shared/imageHandler';

@Component({
  selector: 'consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css']
})
export class ConsultantEditComponent implements OnInit, OnDestroy {
  consultantForm: FormGroup;

  pageTitle = 'Edit Consultant';
  errorMessage: string;


  consultant: Consultant;
  private sub: Subscription;

  get addresses(): FormArray {
    return <FormArray>this.consultantForm.get('addresses');
  }

  constructor(private fb: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private imageHandler: ImageService
  ) { }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit() {
    this.consultantForm = this.fb.group({
      nameFirst: ['', [Validators.required, Validators.minLength(3)]],
      nameSecond: ['', [Validators.required, Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      addresses: this.fb.array([this.newAddress()]),
      imageURL: '',
      birthDate: Date
    });

    this.sub = this.route.queryParams.subscribe(
      params => {
        const consultantId = +params['id'];
        this.dataService.getConsultantByID(consultantId, true)
          .subscribe(
            (consultant: Consultant) => this.displayConsultant(consultant),
            (error: any) => this.errorMessage = <any>error
          );
      });
  }

  newAddress(): FormGroup {
    return this.fb.group({
      addressLine: '',
      postalCode: 0,
      city: '',
      countryRegion: '',
      comment: ''
    });
  }

  displayConsultant(consultant: Consultant): void {
    if (this.consultantForm) {
      this.consultantForm.reset();
    }
    this.consultant = consultant;
    this.consultant.imageURL =
            this.imageHandler.returnConsultantImageUrl(this.consultant.imageURL);
    if (this.consultant.consultantId === 0) {
      this.pageTitle = 'Add New Consultant';
      return;
    } else {
      this.pageTitle = `Edit Consultant: ${this.consultant.nameFirst} ${this.consultant.nameSecond}`;
    }

    // patchValue is used because setValue cannot be used with the address-array
    this.consultantForm.patchValue({
      nameFirst: this.consultant.nameFirst,
      nameSecond: this.consultant.nameSecond,
      email: this.consultant.email,
      telephone: this.consultant.telephone,
      imageURL: this.consultant.imageURL,
      birthDate: this.consultant.birthDate
    });
    this.setConsultantFormAddresses(this.consultant.addresses);
  }
  setConsultantFormAddresses(addresses: Address[]): void {
    this.addresses.removeAt(0);
    addresses.forEach(address => {
      this.addresses.push(this.fb.group({
        addressLine: address.addressLine,
        postalCode: address.postalCode,
        city: address.city,
        countryRegion: address.countryRegion,
        comment: address.comment
      }))
    });
  }

   //------------ DEV FUNCTIONS  ----------------

   notYetImplemented(): void {
    if(confirm("Feature not yet implemented. Sorry!")) {
    }
  }

  //------------ BUTTON ACTIONS ----------------

  onChangePicture(): void {
    this.notYetImplemented();
    console.log('change picture');
  }

  onDeletePicture(): void {
    this.notYetImplemented();
    console.log('delete picture');
  }

  addAddress(): void {
    this.addresses.push(this.newAddress());
  }

  onBack() {
    this.location.back();
  }

  onSave() {
    this.saveConsultant();
  }

  onDelete() {
    this.deleteConsultant();
  }

  //------------ CRUD METHODS ----------------

  saveConsultant() {
    if (this.consultantForm.valid) {
      if (this.consultantForm.dirty) {
        this.removeEmptyAddressesFromFormGroup();
        let c = { ...this.consultant, ...this.consultantForm.value };
        c = this.removeNullsConsultant(c);
        if (typeof c.consultantId =='undefined' 
            || c.consultantId === 0) {
          this.dataService.createConsultant(c)
            .subscribe(
              () => this.saveConsultantComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        } else {
          this.dataService.updateConsultant(c)
            .subscribe(
              () => this.saveConsultantComplete(),
              (error: any) => this.errorMessage = <any>error
            );
        }
      } else {
        console.log('No changes made');
        this.saveConsultantComplete();
      }
    } else {
      this.errorMessage = 'Validation errors need to be corrected before saving.';
    }

    console.log(this.consultantForm);
    console.log('Saved ' + JSON.stringify(this.consultantForm.value));
  }

  removeNullsConsultant(c: Consultant): any {
   let newC = {
    consultantId:  (c.consultantId== null) ? 0 : c.consultantId,
    nameFirst:  (c.nameFirst== null) ? '' : c.nameFirst,
      nameSecond:  (c.nameSecond== null) ? '' : c.nameSecond,
      email:  (c.email== null) ? '' : c.email,
      telephone:  (c.telephone== null) ? '' : c.telephone,
      imageURL:  (c.imageURL== null) ? '' : c.imageURL,
      birthDate:  (c.birthDate== null) ? new Date('0001-01-01T00:00:00Z') : c.birthDate,
      addresses: []
    };
    newC.addresses = this.removeNullsAddresses(c.addresses);
    return newC;
  }

  removeNullsAddresses(addresses: Address[]): Address[] {
    let newAddresses: Address[] = [];
    console.log('addresses')
    console.log(addresses);
    addresses.forEach(a => {
      console.log(a);
      newAddresses.push( ({
        addressLine: (a.addressLine== null) ? '' : a.addressLine,
        postalCode: (a.postalCode== null) ? 0 : a.postalCode,
        city:  (a.city== null) ? '' : a.city,
        countryRegion: (a.countryRegion== null) ? '' : a.countryRegion,
        comment:  (a.comment== null) ? '' : a.comment,
      }));
      console.log('newAddresses after')
      console.log(newAddresses);
    })
    return newAddresses;
  }

  removeEmptyAddressesFromFormGroup(): void {
    let toRemoveIndex: number[]= [];
    this.addresses.controls.forEach((addressControl, index) => {
      if (addressControl.dirty) {
        if (this.IsAddressControlEmpty(addressControl)) {
          toRemoveIndex.unshift(index);
        }
      } else {
        toRemoveIndex.unshift(index);
      }
    });
    toRemoveIndex.forEach(addressGroupToRemove => {
      this.addresses.removeAt(addressGroupToRemove);
    })
  }

  IsAddressControlEmpty(addressControl: AbstractControl): boolean {
    if(
      (typeof addressControl.value.addressLine!='undefined' 
      && addressControl.value.addressLine) ||
      (typeof addressControl.value.city!='undefined' 
      && addressControl.value.city) ||
      (typeof addressControl.value.countryRegion!='undefined' 
      && addressControl.value.countryRegion) ||
      (typeof addressControl.value.postalCode!='undefined' 
      && addressControl.value.postalCode) ||
      (typeof addressControl.value.comment!='undefined' 
      && addressControl.value.comment)
    ) {
      return false;
    }
    return true;
  }

  saveConsultantComplete(): any {
    this.consultantForm.reset();
    this.router.navigate(['/consultants']);
  }

  deleteConsultant() {
    if (this.consultant.consultantId === 0) {
      // Don't delete, it was never saved.
      this.saveConsultantComplete();
    } else {
      if (confirm(`Are you sure you wish to delete consulant?: ${this.consultant.nameFirst}?`)) {
        this.dataService.deleteConsultant(this.consultant.consultantId)
          .subscribe(
            () => this.saveConsultantComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

}
