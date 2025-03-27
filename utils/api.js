import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// Hàm đăng nhập
export const login = async (email, password) => {
  try {
    const response = await api.get(`/users?email=${email}&password=${password}`);
    if (response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Lỗi khi đăng nhập:", error);
    throw error;
  }
};

// Hàm đăng ký tài khoản
export const register = async (userData) => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await api.get(`/users?email=${userData.email}`);
    if (existingUser.data.length > 0) {
      throw new Error("Email đã được sử dụng.");
    }

    // Gửi request đăng ký
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    throw error;
  }
};

// Hàm lấy thông tin user theo ID
export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi lấy user với ID ${id}:`, error);
    throw error;
  }
};

// API admin
// Lấy danh sách users
export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy users:", error);
    throw error;
  }
};

// Cập nhật thông tin user (admin chỉnh sửa)
export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Lỗi khi cập nhật user với ID ${id}:`, error);
    throw error;
  }
};

// Xóa user theo ID
export const deleteUserById = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Lỗi khi xóa user:", error);
    throw error;
  }
};
export default api;
