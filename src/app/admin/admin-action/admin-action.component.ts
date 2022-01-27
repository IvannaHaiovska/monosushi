import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-action',
  templateUrl: './admin-action.component.html',
  styleUrls: ['./admin-action.component.scss']
})
export class AdminActionComponent implements OnInit {

  public adminDiscounts: Array<IDiscountResponse> = [];
  public discountForm!: FormGroup;
  public editStatus = false;
  public isUploaded = false;
  public openDiscount = false;
  private currentDiscountId = 0;
  public datePost = new Date();

  constructor(
    private fb: FormBuilder,
    private discountService: DiscountService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.initDiscountForm();
    this.loadDiscounts();
  }

  initDiscountForm(): void {
    this.discountForm = this.fb.group({
      name: [null, Validators.required],
      title: [null, Validators.required],
      date: [new Date(),Validators.required],
      description: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
    this.discountForm.value.date = new Date();
  }


  loadDiscounts(): void {

    this.discountService.getAll().subscribe(data => {
      console.log(data);
      this.adminDiscounts = data;
    })

  }

  addDiscount(): void {
    if (this.editStatus) {
      this.discountService.update(this.discountForm.value, this.currentDiscountId).subscribe(() => {
        this.discountForm.value.date = new Date();
        this.loadDiscounts();
      })
    } else {
      this.discountService.create(this.discountForm.value).subscribe(() => {
        this.loadDiscounts();
      })

    } console.log(this.discountForm.value.date);
    this.editStatus = false;
    this.resetForm();
    this.isUploaded = false;
    this.openDiscount = false;
  }

  resetForm(): void {
    this.discountForm.controls['name'].reset();
    this.discountForm.controls['title'].reset();
    this.discountForm.controls['description'].reset();
  }
  editDiscount(discount: IDiscountResponse): void {
    this.discountForm.patchValue({
      name: discount.name,
      title: discount.title,
      description: discount.description,
      imagePath: discount.imagePath
    });
    this.editStatus = true;
    this.currentDiscountId = discount.id;
    this.isUploaded = true;
    this.openDiscount = true;
  }

  deleteDiscount(discount: IDiscountResponse): void {
    this.discountService.delete(discount.id).subscribe(() => {
      this.loadDiscounts();
    })
  }


  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        this.isUploaded = false;
        this.discountForm.patchValue({ imagePath: null });
      })
      .catch(err => {
        console.log(err);
      })
  }


  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }

  openDiscounForm(): void {
    this.openDiscount = !this.openDiscount;
    this.resetForm();
    this.discountForm.value.date = new Date();
    this.isUploaded = false;
  }
}
