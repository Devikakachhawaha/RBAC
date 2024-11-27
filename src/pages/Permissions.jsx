import { useState } from "react";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Permissions = () => {
  const [permissions, setPermissions] = useState([
    "Create",
    "Edit",
    "Delete",
    "View",
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPermission, setNewPermission] = useState("");

  const handleAddPermission = () => {
    if (permissions.includes(newPermission.trim())) {
      toast.error("Permission already exists!", {
        autoClose: 2000,
      });
      return;
    }
    setPermissions([...permissions, newPermission.trim()]);
    toast.success("Permission added successfully!", {
      autoClose: 2000,
    });
    setNewPermission("");
    setIsModalOpen(false);
  };

  const handleDeletePermission = (permission) => {
    if (window.confirm(`Are you sure you want to delete "${permission}"?`)) {
      setPermissions(permissions.filter((perm) => perm !== permission));

      toast.success(`Permission "${permission}" deleted successfully!`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Permissions</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#00040E] text-white px-4 py-2 rounded mb-4"
      >
        Add Permission
      </button>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#00040E] text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Permission</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{permission}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleDeletePermission(permission)}
                  className="text-red-500 hover:underline"
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

      <Modal
        title="Add Permission"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddPermission();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 font-semibold">Permission Name</label>
            <input
              type="text"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter permission name"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </Modal>

      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default Permissions;
