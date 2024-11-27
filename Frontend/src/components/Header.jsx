// eslint-disable react/prop-types
import { useEffect, useState, useCallback, memo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { Dialog, PopoverGroup } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "@headlessui/react";
import { getCartItemsCount } from "@/redux/cart/actions";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon,
  HomeIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import ScrollIndicator from "./ScrollIndicator";
import PropTypes from "prop-types";
// import avatar from "./avatar.jpg";
import avatar from "@/assets/genericAvatar.png";
import { logout } from "@/redux/user/actions";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/redux/cart/actions";

const navLinks = [
  {
    path: "/",
    title: "Home",
    icon: <HomeIcon className="w-6 h-6" aria-hidden="true" />,
  },
  {
    path: "/shop",
    title: "Shop",
    icon: <ShoppingBagIcon className="w-6 h-6" aria-hidden="true" />,
  },
  {
    path: "/about",
    title: "About",
    icon: <InformationCircleIcon className="w-6 h-6" aria-hidden="true" />,
  },
  {
    path: "/vision",
    title: "Vision",
    icon: <InformationCircleIcon className="w-6 h-6" aria-hidden="true" />,
  },
  {
    path: "/recipes",
    title: "Recipes",
    icon: <ShoppingBagIcon className="w-6 h-6" aria-hidden="true" />,
  },
  {
    path: "/contact",
    title: "Contact",
    icon: <InboxIcon className="w-6 h-6" aria-hidden="true" />,
  },
];

const MobileMenu = memo(function MobileMenu({
  user,
  isActive,
  logout,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const itemCount = useSelector(getCartItemsCount);

  return (
    <>
      <div className="flex gap-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-1.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon
            aria-hidden="true"
            className="h-6 w-6 text-white stroke-2"
          />
        </button>
        {user.accessToken && (
          <Menu as="div" className="relative z-20 inline-block text-left">
            <Menu.Button className="flex items-center gap-2">
              <img
                src={user.avatarUrl || avatar}
                alt={user?.username}
                className="w-8 h-8 rounded-full object-cover"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/my-account"
                      className={`${
                        active ? "bg-blue-100" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      My Account
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? "bg-blue-100" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-500`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )}
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="text-[#316251] text-2xl tracking-wider font-bold">
                ReFoodify
              </span>
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navLinks.map(({ path, title, icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={`-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      isActive(path)
                        ? "bg-gray-100"
                        : "text-gray-900 hover:bg-gray-50"
                    } items-center gap-2`}
                  >
                    {icon}
                    <span>{title}</span>
                  </NavLink>
                ))}
              </div>
              <div className="py-6">
                <NavLink
                  to="/cart"
                  className="flex items-center justify-between -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingCartIcon className="h-6 w-6 text-white" />
                    <span>Cart</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary text-white rounded-full px-2 py-1 text-xs">
                      {itemCount}
                    </span>
                  </div>
                </NavLink>
              </div>
              {!user.accessToken && (
                <div className="py-6">
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 -mx-3 rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <span>Log in</span>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
});

MobileMenu.displayName = "MobileMenu";

MobileMenu.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    photo: PropTypes.string,
  }),
  isActive: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  mobileMenuOpen: PropTypes.bool.isRequired,
  setMobileMenuOpen: PropTypes.func.isRequired,
};

const DesktopMenu = memo(({ user, isActive, logout }) => {
  const itemCount = useSelector(getCartItemsCount);

  return (
    <>
      <div className="hidden lg:flex lg:flex-1 lg:justify-center">
        <PopoverGroup className="flex lg:gap-x-12">
          {navLinks.map(({ path, title }) => (
            <NavLink
              key={path}
              to={path}
              className={`font-regular leading-6 ${
                isActive(path) ? "text-primary" : "text-white"
              } drop-shadow-md text-lg no-underline shadow-text transition-colors duration-300 ease-in-out px-1 py-1.5 relative hover:text-gray-200 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bottom-0 after:left-1/2 after:bg-white after:transition-all after:duration-300 after:ease-in-out hover:after:w-4/5 hover:after:left-[10%]`}
            >
              {title}
            </NavLink>
          ))}
        </PopoverGroup>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-12">
        <NavLink
          to="/cart"
          className="flex items-center gap-2 font-regular leading-6 text-white drop-shadow-md text-lg hover:text-gray-200 no-underline transition-colors duration-300 ease-in-out px-1 py-1.5 relative"
        >
          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
          <span></span>
          <span className="bg-primary text-white rounded-full px-2 py-1 text-xs">
            {itemCount}
          </span>
        </NavLink>
        {user.accessToken ? (
          <Menu as="div" className="relative z-20 inline-block text-left">
            <Menu.Button className="flex items-center gap-2">
              <img
                // src={avatar || user?.photo}
                src={user.avatarUrl || avatar}
                alt={user?.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="text-white font-bold">{user.username}</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <NavLink
                      to="/my-account"
                      className={`${
                        active ? "bg-blue-100" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      My Account
                    </NavLink>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? "bg-blue-100" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-500`}
                    >
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        ) : (
          <NavLink
            to="/login"
            className="font-medium leading-6 text-white flex justify-center items-center"
            style={{ fontSize: "17px" }}
          >
            Log in{" "}
            <span aria-hidden="true" className="ml-1">
              →
            </span>
          </NavLink>
        )}
      </div>
    </>
  );
});
DesktopMenu.displayName = "DesktopMenu";

DesktopMenu.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    photo: PropTypes.string,
  }),
  isActive: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const itemCount = useSelector(getCartItemsCount);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const handleLogout = () => {
    console.log("User logged out");
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <header className={`bg-[#316251] drop-shadow-md`}>
      {isSticky && <ScrollIndicator />}

      <nav
        aria-label="Global"
        className="mx-auto flex max-w-[105rem] items-center justify-between p-6 lg:px-8"
      >
        <div className="flex items-center gap-4 lg:flex-1 lg:justify-start">
          <NavLink to="/" className="-m-1.5 p-1.5">
            <span className="text-white text-2xl tracking-wider font-bold drop-shadow-md hover:text-[1.6rem] transition-all duration-300 ease-in-out">
              ReFoodify
            </span>
          </NavLink>
        </div>
        <MobileMenu
          user={user}
          isActive={isActive}
          logout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <DesktopMenu user={user} isActive={isActive} logout={handleLogout} />
      </nav>
    </header>
  );
}
