// src/components/MyAccounts/MyAccount.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import "./index.style.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import accountBg from "@/assets/account_bg.png";

const MyAccount = () => {
  const user = useSelector((state) => state.user);
    const location = useLocation();
  return (
    <div>
      <section className="account-section">
        <div className="account-container">
          <TabGroup className="tab-group">
            <div className="tab-group">
              {/* Updated TabList with improved styling */}
              <TabList className="tab-list">
                <Tab
                  as={Link}
                  to="account-information"
                  className={({ selected }) =>
                    `tab-button ${
                      selected ||
                      location.pathname.includes("account-information")
                        ? "tab-button-selected"
                        : ""
                    }`
                  }
                >
                  Account Information
                </Tab>
                <Tab
                  as={Link}
                  to="purchase-history"
                  className={({ selected }) =>
                    `tab-button ${
                      selected || location.pathname.includes("purchase-history")
                        ? "tab-button-selected"
                        : ""
                    }`
                  }
                >
                  Purchase History
                </Tab>
                <Tab
                  as={Link}
                  to="my-recipes"
                  className={({ selected }) =>
                    `tab-button ${
                      selected || location.pathname.includes("my-recipes")
                        ? "tab-button-selected"
                        : ""
                    }`
                  }
                >
                  My Recipes
                </Tab>
              </TabList>
            </div>

            {/* Updated TabPanels with content */}
            <TabPanels
              className="tab-panels"
              style={{ backgroundImage: `url(${accountBg})` }}
            >
              <Outlet />
            </TabPanels>
          </TabGroup>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;
