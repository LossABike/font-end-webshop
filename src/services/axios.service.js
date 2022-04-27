import createHttp from "./http.service";
class ContactService {
  constructor() {
    this.http = createHttp("/api/shop");
  }
  
  async sendCart(data) {
    return (await this.http.post("/", data)).data;
  }
  async getAllItems(data) {
    return (await this.http.get("/items", data)).data;
  }
  async addItems(data) {
    return (await this.http.post("/admin/add", data)).data;
  }
  async deleteItem(id) {
    return (await this.http.delete(`/admin/delete/${id}`)).data;
  }
  async updateItem(id,data) {
    return (await this.http.put(`/admin/update/${id}`,data)).data;
  }

}
export default new ContactService();
