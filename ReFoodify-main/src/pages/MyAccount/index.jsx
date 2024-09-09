import AccountInformation from "@/components/MyAccounts/AccountInformation";
import MyRecipes from "@/components/MyAccounts/MyRecipes";
import PurchaseHistory from "@/components/MyAccounts/PurchaseHistory";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import "./index.style.css";

import accountBg from "@/assets/account_bg.png";

const MyAccount = () => {
  return (
    <div>
      <section className="account-section">
        <div className="account-container">
          <TabGroup className="tab-group">
            <div className="tab-group">
              {/* Updated TabList with improved styling */}
              <TabList className="tab-list">
                <Tab
                  className={({ selected }) =>
                    `tab-button ${selected ? "tab-button-selected" : ""}`
                  }
                >
                  Account Information
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `tab-button ${selected ? "tab-button-selected" : ""}`
                  }
                >
                  Purchase History
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `tab-button ${selected ? "tab-button-selected" : ""}`
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
              <TabPanel className="tab-panel">
                <AccountInformation />
              </TabPanel>
              <TabPanel className="tab-panel">
                <PurchaseHistory />
              </TabPanel>
              <TabPanel className="tab-panel">
                <MyRecipes />
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </section>
    </div>
  );
};

export default MyAccount;
