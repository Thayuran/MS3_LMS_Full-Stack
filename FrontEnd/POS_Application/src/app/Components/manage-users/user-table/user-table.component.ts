import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../Models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  @Input() data: User[] = [];

  displayedColumns: string[] = ['id', 'name', 'email', 'shift', 'role'];

}
