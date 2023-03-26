import Badge from "../common/Badge";
import { TransactionStatusEnum } from "@/openapi/generated";

const TransactionStatus = ({ status }: { status: TransactionStatusEnum }) => {
  switch (status) {
    case "pending":
      return <Badge variant="warning" text={"pending"} />;
    case "success":
      return <Badge variant="success" text={"success"} />;
    case "failed":
      return <Badge variant="danger" text={"failed"} />;
    default:
      return <Badge variant="default" text={status} />;
  }
};

export default TransactionStatus;
