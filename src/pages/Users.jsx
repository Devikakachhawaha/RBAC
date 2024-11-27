import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import Modal from "../components/Modal";
import { fetchUsers, addUser, updateUser, deleteUser } from "../mockData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form } from "react-bootstrap";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);

const Users = () => {
  const { roles } = useAppContext();
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    // Fetch users when component loads
    fetchUsers().then(setUsers);
  }, []);

  const getPermissionsByRole = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    return role ? role.permissions : [];
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!", {
        autoClose: 1000,
      });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    const updatedUser = users.find((user) => user.id === id);
    updatedUser.status = newStatus;
    await updateUser(updatedUser);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    toast.info("User status updated.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      id: currentUser?.id || Date.now(),
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      permissions: getPermissionsByRole(formData.get("role")),
      status: formData.get("status"),
    };

    if (isEditing) {
      const updatedUser = await updateUser(userData);
      setUsers(users.map((u) => (u.id === currentUser.id ? updatedUser : u)));
      toast.success("User updated successfully!");
    } else {
      const newUser = await addUser(userData);
      setUsers([...users, newUser]);
      toast.success("New user added successfully!");
    }

    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (search === "" ||
        user.name.toLowerCase().includes(search.toLowerCase())) &&
      (filterRole === "" || user.role === filterRole) &&
      (filterStatus === "" || user.status === filterStatus)
    );
  });

  return (
    <div className="p-4  ">
      <h2 className="text-2xl font-bold mb-4 ">Manage Users</h2>
      <button
        onClick={handleAddUser}
        className="bg-[#00040E] text-white px-4 py-2 rounded mb-4"
      >
        Create User
      </button>
      <form>
        <div className="flex gap-4 mb-4">
          <Form.Control
            onChange={(e) => setSearch(e.target.value)}
            className=" border rounded p-2 w-1/4"
            placeholder="Search by name"
          />
          <select
            onChange={(e) => setFilterRole(e.target.value)}
            className="border  p-2 rounded w-1/5 "
          >
            <option>Short by Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border p-2 rounded w-1/5"
          >
            <option value="">Sort by Status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="flex flex-wrap justify-center gap-4 p-1 w-full sm:w-full lg:justify-start h-full  ">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="border p-4 w-56 h-70 rounded shadow-lg bg-white flex flex-col gap-2 relative transform transition-transform duration-300 ease-in-out hover:scale-105  "
          >
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-sm">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="text-sm">
              <strong>Permissions:</strong> {user.permissions.join(", ")}
            </p>
            <p className="text-sm">
              <strong>Status:</strong>
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                className="border px-2 py-1 rounded ml-2"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </p>
            <div className="flex justify-end gap-2  mt-auto">
              <button onClick={() => handleEditUser(user)}>
                <lord-icon
                  src="https://cdn.lordicon.com/zfzufhzk.json"
                  trigger="hover"
                  state="hover-line"
                  colors="primary:#121131,secondary:#66a1ee,tertiary:#ebe6ef,quaternary:#f9c9c0,quinary:#3a3347"
                  style={{ width: "25px", height: "25px", padding: "2px" }}
                ></lord-icon>
              </button>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className=" text-white px-3 py-1 rounded"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/xekbkxul.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#4bb3fd,tertiary:#646e78,quaternary:#f2e2d9"
                  style={{ width: "25px", height: "25px", padding: "2px" }}
                ></lord-icon>
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={isEditing ? "Edit User" : "Add User"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={currentUser?.name || ""}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              defaultValue={currentUser?.email || ""}
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter email"
              required
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Role</label>
            <select
              name="role"
              defaultValue={currentUser?.role || ""}
              className="w-full border px-4 py-2 rounded"
              required
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="status"
              defaultValue={currentUser?.status || "Active"}
              className="w-full border px-4 py-2 rounded"
              required
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update User" : "Add User"}
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default Users;
