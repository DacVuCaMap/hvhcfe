import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const listGroup = [
  { value: 'cereal', name: 'ngũ cốc và sản phẩm chế biến' },
  { value: 'cooking_oil', name: 'dầu, mỡ ăn và sản phẩm chế biến' },
  { value: 'egg', name: 'trứng và sản phẩm chế biến' },
  { value: 'beverages', name: 'nước giải khát, bia, rượu' },
  { value: 'canned_food', name: 'đồ hộp' },
  { value: 'meat', name: 'thịt và sản phẩm chế biến' },
  { value: 'milk', name: 'sữa và sản phẩm chế biến' },
  { value: 'nuts_seeds_protein_fat_rich', name: 'hạt và quả giàu béo đạm' },
  { value: 'seafood', name: 'thủy sản và sản phẩm chế biến' },
  { value: 'seasonings', name: 'gia vị, nước chấm' },
  { value: 'sweets', name: 'đồ ngọt' },
  { value: 'tubers', name: 'khoai củ và sản phẩm chế biến' },
  { value: 'vegestables', name: 'rau quả và sản phẩm chế biến' },
  { value: 'fruits', name: 'quả chín và sản phẩm chế biến' },
];