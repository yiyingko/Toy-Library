export type BorrowRequest = {
  id?: string;
  toy_id: string;
  borrower_name: string;
  borrower_email: string;
  message?: string;
  borrow_status: string;
};
