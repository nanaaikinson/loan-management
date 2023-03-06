import { http } from "./axios";
import { AuthApi } from "@/openapi/generated";

export class AuthService extends AuthApi {
  constructor() {
    super(undefined, "", http);
  }

  static instance = () => new AuthService();
}
