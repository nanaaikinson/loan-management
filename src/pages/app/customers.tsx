import { Customer } from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { useEffect, useState } from "react";

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Array<Customer>>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const {
        data: { data: loans },
      } = await CustomerService.instance().getCustomers();
      setCustomers(loans);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return <>{JSON.stringify(customers, null, 2)}</>;
};

export default Customers;
