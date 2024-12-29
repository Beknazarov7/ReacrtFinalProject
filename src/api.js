export const BASE_URL = "http://localhost:8080/api";

export const post = async (url, data) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
