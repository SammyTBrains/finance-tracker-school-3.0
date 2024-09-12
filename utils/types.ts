export type CategoryData = {
  CategoryItems: CategoryItem[];
  assigned_budget: number;
  color: string;
  created_at: string;
  created_by: string;
  icon: string;
  id: number;
  name: string;
};

export type CategoryItem = {
  category_id: number;
  color: string;
  cost: number;
  created_at: string;
  icon: number;
  id: number;
  image: string;
  name: string;
  note: string;
  url: string;
};
