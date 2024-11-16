import { Component } from '@angular/core';
import { Category } from '../../Models/Category';
import { Observable, take } from 'rxjs';
import { CategoryService } from '../../Services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryFormComponent } from './category-form/category-form.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  categories$: Observable<Category[]>;
  constructor(private categories: CategoryService, public dialog: MatDialog) {
    this.categories$= this.categories.all();
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        type: 'add',
        shift: null,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.categories
        .create(result)
        .pipe(take(1))
        .subscribe(_ => this.refresh());
    });
  }

  editCategory(category: Category): void {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {
        type: 'edit',
        category,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === '') {
        return;
      }
      this.categories
        .update(category.id, result)
        .pipe(take(1))
        .subscribe(_ => this.refresh());
    });
  }

  refresh(): void {
    this.categories$ = this.categories.all();
  }
}
