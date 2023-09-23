import { HistoryEntity } from '~/domains/models/History';

// NOTE: [支払い者, [受取者, 金額]]
export type Payment = {
  payer: string;
  payee: string;
  amount: number;
};

export namespace OptimizeService {
  /**
   * @description この関数は、支払い履歴を最適化する関数です。
   */
  export const optimize = (histories: HistoryEntity[]): Payment[] => {
    const paymentMap: Map<string, Map<string, number>> = new Map();

    // 1. 支払い履歴をpayerIdごとに分類する
    for (const history of histories) {
      const { payerId, payeeIds, amount } = history;
      const eachAmount = amount / payeeIds.length;

      for (const payee of payeeIds) {
        if (!paymentMap.has(payerId)) {
          paymentMap.set(payerId, new Map());
        }

        const payerMap = paymentMap.get(payerId);
        const currentAmount = payerMap.get(payee) ?? 0;
        payerMap.set(payee, currentAmount + eachAmount);
      }
    }

    // 2. 相殺を計算する
    for (const [payer, payeeMap] of paymentMap) {
      for (const [payee, amount] of payeeMap) {
        const payeePayerMap = paymentMap.get(payee);
        if (payeePayerMap && payeePayerMap.has(payer)) {
          const payeePayerAmount = payeePayerMap.get(payer) ?? 0;
          // NOTE: 支払い額が少ない方を削除，多い方に差額を残す
          if (amount < payeePayerAmount) {
            payeeMap.delete(payee);
            payeePayerMap.set(payer, payeePayerAmount - amount);
          } else if (amount > payeePayerAmount) {
            payeePayerMap.delete(payer);
            payeeMap.set(payee, amount - payeePayerAmount);
          } else {
            payeeMap.delete(payee);
            payeePayerMap.delete(payer);
          }
        }
      }
    }

    // 3. Map -> Array
    const paymentArray: Payment[] = [];
    for (const [payer, payeeMap] of paymentMap) {
      for (const [payee, amount] of payeeMap) {
        paymentArray.push({
          payer,
          payee,
          amount,
        });
      }
    }

    return paymentArray;
  };
}
