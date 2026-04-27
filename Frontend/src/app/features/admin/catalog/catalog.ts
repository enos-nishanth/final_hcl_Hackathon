import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CatalogService } from '../../../core/services/catalog.service';
import { CatalogItem } from '../../../core/models/catalog.model';

@Component({
  selector: 'app-catalog-management',
  standalone: true,
  imports: [ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css']
})
export class Catalog implements OnInit {
  private route = inject(ActivatedRoute);
  private catalogService = inject(CatalogService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  type = signal('');
  title = signal('');
  items = signal<CatalogItem[]>([]);
  editingId = signal<number | null>(null);
  cols = ['name', 'description', 'actions'];

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.type.set(data['type']);
      this.title.set(data['title']);
      this.load();
    });
  }

  load(): void { this.catalogService.getAll(this.type()).subscribe(i => this.items.set(i)); }

  submit(): void {
    const dto = this.form.value as any;
    const obs = this.editingId()
      ? this.catalogService.update(this.type(), this.editingId()!, dto)
      : this.catalogService.create(this.type(), dto);
    obs.subscribe(() => {
      this.load();
      this.form.reset();
      this.editingId.set(null);
      this.snackBar.open('Saved!', 'Close', { duration: 2000 });
    });
  }

  edit(item: CatalogItem): void {
    this.editingId.set(item.id);
    this.form.patchValue({ name: item.name, description: item.description });
  }

  cancelEdit(): void { this.editingId.set(null); this.form.reset(); }

  delete(id: number): void {
    if (!confirm('Delete this item?')) return;
    this.catalogService.delete(this.type(), id).subscribe(() => {
      this.snackBar.open('Deleted.', 'Close', { duration: 2000 });
      this.load();
    });
  }
}