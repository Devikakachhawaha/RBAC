import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Roles = () => {
  const { roles, setRoles, permissions } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleAddRole = () => {
    setCurrentRole(null);
    setSelectedPermissions([]);
    setIsModalOpen(true);
  };

  const handleEditRole = (role) => {
    setCurrentRole(role);
    setSelectedPermissions(role.permissions || []);
    setIsModalOpen(true);
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== id));
      toast.success("Role deleted successfully!", {
        autoClose: 1000,
      });
    }
  };

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((perm) => perm !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roleData = {
      id: currentRole?.id || Date.now(),
      name: formData.get("name"),
      permissions: selectedPermissions,
    };

    if (currentRole) {
      setRoles(roles.map((r) => (r.id === currentRole.id ? roleData : r)));
      toast.success("Role updated successfully!", {
        autoClose: 1000,
      });
    } else {
      setRoles([...roles, roleData]);
      toast.success("Role created successfully!", {
        autoClose: 1000,
      });
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      setSelectedPermissions(currentRole?.permissions || []);
    }
  }, [isModalOpen, currentRole, permissions]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Roles</h2>
      <button
        onClick={handleAddRole}
        className="bg-[#00040E] text-white px-4 py-2 rounded mb-4"
      >
        Create Role
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#00040E] text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 ">Role</th>
            <th className="border border-gray-300 px-4 py-2">Permissions</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{role.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {role.permissions.join(", ") || "No permissions assigned"}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="text-blue-500 hover:underline"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/zfzufhzk.json"
                    trigger="hover"
                    state="hover-line"
                    colors="primary:#121131,secondary:#66a1ee,tertiary:#ebe6ef,quaternary:#f9c9c0,quinary:#3a3347"
                    style={{ width: "25px", height: "25px", padding: "2px" }}
                  ></lord-icon>
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-500 hover:underline ml-2"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/xekbkxul.json"
                    trigger="hover"
                    colors="primary:#121331,secondary:#4bb3fd,tertiary:#646e78,quaternary:#f2e2d9"
                    style={{ width: "25px", height: "25px", padding: "2px" }}
                  ></lord-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Role Modal */}
      <Modal
        title={currentRole ? "Edit Role" : "Add Role"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Role Name</label>
            <input
              type="text"
              name="name"
              defaultValue={currentRole?.name || ""}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter role name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Permissions</label>
            <div className="space-y-2">
              {permissions.map((permission) => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                  />
                  <span>{permission}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </form>
      </Modal>

      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Roles;
