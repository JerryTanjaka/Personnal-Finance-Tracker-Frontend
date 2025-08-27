export type Transaction = {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: "income" | "expense"; 
  category?: string;          
  source?: string;            
};
