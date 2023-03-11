import Button from "@/components/common/Button";
import { Customer } from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Array<Customer>>([]);
  const navigate = useNavigate();

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

  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h4>Customers</h4>
            <span className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
              dolore!
            </span>
          </div>

          <Button onClick={() => navigate("/customers/new")}>
            Add customer
          </Button>
        </div>
      </div>
    </>
  );
};

export default Customers;
