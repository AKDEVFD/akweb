import axios from "axios";

const API_URL =
  "https://api.github.com/repos/AKDEVFD/akport/contents/reactgrid";


export async function fetchGithubImages() {
  try {
    const response = await axios.get(API_URL);

    return response.data.filter(
      (file) =>
        file.type === "file" &&
        /\.(png|jpe?g|webp)$/i.test(file.name)
    );
  } catch (error) {
    console.error("Error fetching GitHub images:", error);
    throw error;
  }
}
