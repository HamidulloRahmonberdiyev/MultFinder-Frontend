const API_BASE_URL = "https://apimultifinder.unicrm.org/api";

export const filmsAPI = {
  async getFilms({ title = "", page = 1, perPage = 12 } = {}) {
    try {
      const params = new URLSearchParams();
      
      if (title.trim()) {
        params.append("title", title.trim());
      }
      
      params.append("page", page.toString());
      params.append("per_page", perPage.toString());
      
      const response = await fetch(`${API_BASE_URL}/films?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      }
      
      const data = await response.json();
      
      let filmsData = [];
      if (data.success && data.data && Array.isArray(data.data)) {
        filmsData = data.data;
      } else if (Array.isArray(data)) {
        filmsData = data;
      } else if (data.films && Array.isArray(data.films)) {
        filmsData = data.films;
      } else if (data.results && Array.isArray(data.results)) {
        filmsData = data.results;
      }
      
      const pagination = {
        totalPages: data.pagination?.total_pages || data.pagination?.totalPages || data.total_pages || 1,
        totalItems: data.pagination?.total || data.pagination?.total_items || data.total || filmsData.length,
      };
      
      return {
        success: true,
        data: filmsData,
        pagination,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
        pagination: { totalPages: 1, totalItems: 0 },
      };
    }
  },

  async getFilmById(id) {
    try {
      if (!id) {
        throw new Error("ID topilmadi");
      }

      const response = await fetch(`${API_BASE_URL}/films/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Multfilm topilmadi");
        }
        throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      }
      
      const data = await response.json();
      
      let filmData = null;
      if (data.success && data.data) {
        filmData = data.data;
      } else if (data.id || data.title) {
        filmData = data;
      } else {
        throw new Error("Ma'lumotlar formati noto'g'ri");
      }
      
      return {
        success: true,
        data: filmData,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }
  },

  async searchFilms(name) {
    try {
      if (!name || !name.trim()) {
        return {
          success: true,
          data: [],
        };
      }

      const response = await fetch(
        `${API_BASE_URL}/search/films?name=${encodeURIComponent(name)}`
      );
      
      const data = await response.json();
      
      if (data.success && data.data) {
        return {
          success: true,
          data: data.data,
        };
      }
      
      return {
        success: true,
        data: [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        data: [],
      };
    }
  },
};

