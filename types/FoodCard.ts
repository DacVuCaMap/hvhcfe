export interface FoodCardChild {
  id: string;
  name: string;
  protein: number;
  lipid: number;
  glucide: number;
  volumeSuggest:number
}
export interface FoodInstance extends FoodCardChild {
  instanceId: string;
}