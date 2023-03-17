import { http } from "./axios";
import { TransactionsApi } from "@/openapi/generated";

export class TransactionService extends TransactionsApi {
  constructor() {
    super(undefined, "", http);
  }

  static instance = () => new TransactionService();
}
