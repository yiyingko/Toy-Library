export type BorrowRequest = {
  id: number;
  toy_id: number;
  borrower_name: string;
  borrower_email: string;
  message?: string;
  borrow_status: string;
  created_at: string;
  toy_name: string;
};

export type UpdateBorrowStatusData = {
  id: number;
  toy_id: number;
  status: 'approved' | 'rejected' | 'completed';
};
