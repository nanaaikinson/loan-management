import { http } from "./axios";
import { AuthApi } from "@/openapi/generated";

export class AuthService extends AuthApi {
  public static instance() {
    return new AuthApi(undefined, "", http);
  }
}
