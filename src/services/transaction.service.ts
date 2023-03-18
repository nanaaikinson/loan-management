import { http } from "./axios";
import { TransactionsApi } from "@/openapi/generated";

export class TransactionService extends TransactionsApi {
  public static instance() {
    return new TransactionsApi(undefined, "", http);
  }
}
