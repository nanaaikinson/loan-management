import Button from "@/components/common/Button";
import Customer from "@/components/features/customers/Customer";
import { Customer as ICustomer } from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Array<ICustomer>>([]);
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
            <h3>Customers</h3>
            <span className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
              dolore!
            </span>
          </div>

          <Button onClick={() => navigate("/customers/new")}>
            Add customer
          </Button>
        </div>

        <div className="row">
          {customers.map((customer) => (
            <>
              <div className="col-12 sm:col-6 lg:col-4 xl:col-3">
                <Customer customer={customer} />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Customers;
