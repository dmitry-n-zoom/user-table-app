//Файл, содержащий функции для работы с API пользователей
const BASE_URL = "https://dummyjson.com";

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/filter?key=lastName&value=${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.users;
  } catch (error) {
    console.error("Failed to search users:", error);
    throw error;
  }
};
