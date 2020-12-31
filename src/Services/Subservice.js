
import http from "../http-common";


class SubDataService {
  getAll() {
    return http.get("/subscriptions");
  }

  get(id) {
    return http.get(`/subscriptions/${id}`);
  }

  create(data) {
    return http.post("/subscriptions", data);
  }

  update(id, data) {
    return http.put(`/subscriptions/${id}`, data);
  }

  delete(id) {
    return http.delete(`/subscriptions/${id}`);
  }

  deleteAll() {
    return http.delete(`/subscriptions`);
  }

  findByTitle(title) {
    return http.get(`/subscriptions?title=${title}`);
  }
}

export default new SubDataService();