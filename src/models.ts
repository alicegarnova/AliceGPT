export interface Pizza {
  id: number;
  name: string;
  description: string;
  image: string;
  price?: string;
  ingredients?: string[];
  compound?: string;
  calorie?: string;
}

export interface CartItem extends Pizza {
  quantity: number;
}