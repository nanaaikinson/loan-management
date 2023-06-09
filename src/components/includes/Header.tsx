import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/stores/auth";
import { generateInitials } from "@/utils/helpers";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  toggleSidebar: () => void;
}

const Header = ({ className, toggleSidebar }: HeaderProps) => {
  const [initials, setInitials] = useState<string>("");
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();

    navigate("/");
  };

  useEffect(() => {
    if (user) {
      setInitials(generateInitials(user.name));
    }
  }, [user]);

  return (
    <>
      <nav
        className={classNames(
          "fixed top-0 w-full left-0 h-16 border-b border-gray-100 bg-white",
          className
        )}
      >
        <div className="flex h-full items-center justify-between">
          <button>
            <Icon icon="bx:menu" className="text-xl" onClick={toggleSidebar} />
          </button>

          <ul className="flex items-center space-x-3 ml-auto">
            <li>
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button
                    type="button"
                    className="flex items-center space-x-2"
                    title=""
                  >
                    <Avatar src={initials} initials />
                    <span className="text-sm">{user?.name}</span>
                    <Icon icon="bx:chevron-down" className="text-xl" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 rounded-[10px] shadow-md bg-white">
                      <div className="px-1 py-3">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <div className="font-light !capitalize">
                            {user?.name}
                          </div>
                          <Menu.Item as={Fragment}>
                            <Button
                              size="sm"
                              type="button"
                              className="px-14"
                              onClick={onLogout}
                            >
                              Logout
                            </Button>
                          </Menu.Item>
                        </div>
                      </div>
                    </Menu.Items>
                  </Transition>
                </div>
              </Menu>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
