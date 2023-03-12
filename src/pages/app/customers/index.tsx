import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
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
                <Card className="p-4 !rounded-[10px] border border-gray-100">
                  <div className="flex flex-col space-y-5">
                    <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
                      <Avatar src="NA" initials className="h-12 w-12" />
                      <div>
                        <h6 className="font-semibold mb-0">{`${customer.firstName} ${customer.lastName}`}</h6>
                        <span className="text-xs text-gray-500">
                          {customer.occupation}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Customers;
