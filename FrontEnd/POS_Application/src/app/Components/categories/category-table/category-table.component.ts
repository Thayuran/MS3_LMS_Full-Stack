import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../Models/Category';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css'
})
export class CategoryTableComponent {
  @Input() data: Category[] = [];

  @Output() opened = new EventEmitter<Category>();

  displayedColumns: string[] = ['id', 'name', 'icon'];

}
