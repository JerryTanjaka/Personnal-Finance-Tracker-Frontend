export type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  start_date?: string,
  end_date?: string,
  is_recurrent?: boolean
  category?: string;
  source?: string;
};
