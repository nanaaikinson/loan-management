import { http } from "./axios";
import { LoansApi } from "@/openapi/generated";

export class LoanService extends LoansApi {
  public static instance() {
    return new LoansApi(undefined, "", http);
  }
}
