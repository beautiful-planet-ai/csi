import Logo from "assets/logo.svg";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CitizenDialog from "./CitizenDialog";
import GovernmentDialog from "./GovernmentDialog";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [dialogs, setDialogs] = useState({
    citizen: false,
    government: false,
  });

  const toggleDialog = (key, value) =>
    setDialogs((prev) => ({ ...prev, [key]: value }));

  const routes = [
    {
      label: "Home",
      icon: "pi pi-home",
      path: "/",
    },
    {
      label: "CSI for Citizens",
      icon: "pi pi-users",
      path: "/citizen",
      dialog: "citizen",
    },
    {
      label: "CSI for Government",
      icon: "pi pi-id-card",
      path: "/government",
      dialog: "government",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const itemRenderer = (item) => {
    const active = isActive(item.path);

    const baseClasses =
      "flex align-items-center justify-content-center gap-2 py-0 no-underline p-menuitem-link cursor-pointer transition-colors duration-300";
    const activeClasses = active ? "text-orange-400" : "text-white";

    return (
      <Link
        to={item.path}
        className={`${baseClasses} ${activeClasses} hover:text-orange-400 ${
          active ? "border-bottom-2 border-orange-400" : ""
        }`}
      >
        <i className={`${item.icon} text-lg`} />
        <span className="font-medium p-0 m-1">{item.label}</span>
      </Link>
    );
  };

  const items = routes.map((r) => ({ ...r, template: itemRenderer }));

  const currentRoute = routes.find((r) => r.path === location.pathname);
  const dialogKey = currentRoute?.dialog;

  const start = (
    <img
      className="mr-auto w-5 ml-1"
      src={Logo}
      alt="Beautiful Planet.AI Logo"
    />
  );

  const end = dialogKey ? (
    <Button
      label="Sign in"
      icon="pi pi-user"
      className="text-primary1 bg-white p-ml-auto"
      onClick={() => toggleDialog(dialogKey, true)}
      raised
    />
  ) : null;

  return (
    <>
      <Menubar
        model={items}
        start={start}
        end={end}
        className="flex bg-primary2 align-items-center shadow-2"
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
        }}
      />

      <CitizenDialog
        visible={dialogs.citizen}
        onHide={() => toggleDialog("citizen", false)}
      />

      <GovernmentDialog
        visible={dialogs.government}
        onHide={() => toggleDialog("government", false)}
      />
    </>
  );
};

export default Header;
