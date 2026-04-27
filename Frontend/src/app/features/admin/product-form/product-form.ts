import { Component, inject, OnInit, Inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../../core/services/product.service';
import { CatalogService } from '../../../core/services/catalog.service';
import { CatalogItem } from '../../../core/models/catalog.model';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductForm implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private catalogService = inject(CatalogService);
  private dialogRef = inject(MatDialogRef<ProductForm>);

  brands = signal<CatalogItem[]>([]);
  categories = signal<CatalogItem[]>([]);
  packagingTypes = signal<CatalogItem[]>([]);
  loading = false;

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stockQuantity: [0, Validators.required],
    imageUrl: [''],
    brandId: [0, Validators.required],
    categoryId: [0, Validators.required],
    packagingTypeId: [0, Validators.required]
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product | null) {}

  ngOnInit(): void {
    this.catalogService.getAll('brands').subscribe(b => this.brands.set(b));
    this.catalogService.getAll('categories').subscribe(c => this.categories.set(c));
    this.catalogService.getAll('packagingtypes').subscribe(p => this.packagingTypes.set(p));
    if (this.data) {
      this.form.patchValue({
        name: this.data.name,
        description: this.data.description,
        price: this.data.price,
        stockQuantity: this.data.stockQuantity,
        imageUrl: this.data.imageUrl,
        brandId: this.data.brandId,
        categoryId: this.data.categoryId,
        packagingTypeId: this.data.packagingTypeId
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const dto = this.form.value as any;
    const obs = this.data
      ? this.productService.update(this.data.id, dto)
      : this.productService.create(dto);
    obs.subscribe({
      next: () => { this.loading = false; this.dialogRef.close(true); },
      error: () => { this.loading = false; }
    });
  }
}