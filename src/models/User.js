const {getJSON, saveJSON} = require('../utils/fileHelpers');

class User {
  constructor() {
    this.saveData = saveJSON;
    this.fetchData = getJSON;
  }

  async find(id) {
    const users = this.fetchData();
    const index = users.findIndex(({id}) => id === id);
    if (index != -1) {
      return users[index];
    }
    return Promise.reject(new Error(`User with id ${id} not found`));
  }

  async create(user) {
    const users = this.fetchData();
    users.push(user);
    this.saveData(users);
    return user;
  }
};

module.exports = new User();