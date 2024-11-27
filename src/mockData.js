let mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    permissions: ["Read", "Write", "Delete"],
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    permissions: ["Read"],
    status: "Inactive",
  },
  {
    id: 3,
    name: "Robert Brown",
    email: "robert@example.com",
    role: "Moderator",
    permissions: ["Read", "Write"],
    status: "Active",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "User",
    permissions: ["Read"],
    status: "Active",
  },
  {
    id: 5,
    name: "Michael Johnson",
    email: "michael@example.com",
    role: "Admin",
    permissions: ["Read", "Write", "Manage Users"],
    status: "Inactive",
  },
  {
    id: 6,
    name: "Sophia Lee",
    email: "sophia@example.com",
    role: "User",
    permissions: ["Read", "Comment"],
    status: "Active",
  },
];

export const fetchUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...mockUsers]), 1000);
  });
};

export const addUser = (user) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsers.push(user);
      resolve(user);
    }, 500);
  });
};

export const updateUser = (updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsers = mockUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      resolve(updatedUser);
    }, 500);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUsers = mockUsers.filter((user) => user.id !== id);
      resolve(id);
    }, 500);
  });
};
