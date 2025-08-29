export type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "income" | "expense"; 
  category?: string;          
  source?: string;            
};
