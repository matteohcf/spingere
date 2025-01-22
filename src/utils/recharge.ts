import { Transaction, TransactionStatus } from '../types/transaction';

export const canShowRechargesHistoryDetail = (transaction: Transaction): boolean => {
  return (
    transaction.isPayed ||
    (transaction.isFree && transaction.status === TransactionStatus.TRANSACTION_ENDED) ||
    (transaction.status === TransactionStatus.TRANSACTION_ENDED && (transaction?.effectiveCost === 0 || !transaction?.effectiveCost))
  );
};
