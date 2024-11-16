import { Category } from "../../Models/Category";

export interface CategoryFormData {
  type: 'add' | 'edit';
  category: Category | null;
}
