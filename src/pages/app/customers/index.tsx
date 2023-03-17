import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
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
      <div className="container">
        <Card className="rounded-[7px] p-4">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3>Customers</h3>
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
        </Card>
      </div>
    </>
  );
};

export default Customers;
