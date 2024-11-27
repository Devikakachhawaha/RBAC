import { createContext, useState, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", permissions: ["Create", "Edit", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Edit", "Delete"] },
    { id: 3, name: "Viewer", permissions: ["View"] },
  ]);
  const [permissions, setPermissions] = useState([
    "Create",
    "Edit",
    "Delete",
    "View",
  ]);

  const addPermission = (newPermission) => {
    if (!permissions.includes(newPermission)) {
      setPermissions([...permissions, newPermission]);

      setRoles((prevRoles) =>
        prevRoles.map((role) => ({
          ...role,
          permissions: role.permissions.includes(newPermission)
            ? role.permissions
            : [...role.permissions, newPermission],
        }))
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        roles,
        setRoles,
        permissions,
        addPermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
