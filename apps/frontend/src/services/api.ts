const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const api = {
  async postLead(data: any) {
    const response = await fetch(`${API_URL}/v1/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to submit inquiry");
    return response.json();
  },

  async getTutors(query: string = "") {
    const response = await fetch(`${API_URL}/v1/tutors?${query}`);
    return response.json();
  },

  async getTutor(slug: string) {
    const response = await fetch(`${API_URL}/v1/tutors/${slug}`);
    return response.json();
  },

  async getBoards() {
    const response = await fetch(`${API_URL}/v1/content/boards`);
    return response.json();
  }
};
