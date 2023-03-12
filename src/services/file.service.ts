import { http } from "./axios";
import { FilesApi } from "@/openapi/generated";

export class FileService {
  public static instance() {
    return new FilesApi(undefined, "", http);
  }
}
