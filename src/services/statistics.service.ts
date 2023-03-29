import { http } from "./axios";
import { StatisticsApi } from "@/openapi/generated";

export class StatisticsService {
  public static instance() {
    return new StatisticsApi(undefined, "", http);
  }
}
