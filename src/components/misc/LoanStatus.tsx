import Badge from "../common/Badge";
import { LoanStatusEnum } from "@/openapi/generated";

const LoanStatus = ({ status }: { status: LoanStatusEnum }) => {
  switch (status) {
    case "pending":
      return <Badge variant="warning" text={"pending"} />;
    case "approved":
      return <Badge variant="success" text={"approved"} />;
    case "rejected":
      return <Badge variant="danger" text={"rejected"} />;
    default:
      return <Badge variant="default" text={status} />;
  }
};

export default LoanStatus;
