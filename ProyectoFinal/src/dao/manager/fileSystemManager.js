import fs from "fs";
import dotenv from "../../config/dotenv.config.js";

class FileSystemManager {
  constructor(path) {
    this.path = `${dotenv.fileSystemPath}/${path}`;
  }

  async saveData(data) {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data), "utf-8");
    } catch (error) {
      throw new Error(`Error saving data to ${this.path}: ${error}`);
    }
  }

  async loadData() {
    try {
      const data = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error loading data from ${this.path}: ${error}`);
    }
  }

  async getDataById(id) {
    try {
      const data = await this.loadData();
      const item = data.find((p) => p.id === id);
      if (!item) {
        throw new Error(`Item with id ${id} not found`);
      }
      return item;
    } catch (error) {
      throw new Error(`Error loading data from ${this.path}: ${error}`);
    }
  }

  async updateById(id, updates) {
    try {
      const data = await this.loadData();
      const itemIndex = data.findIndex((p) => p.id === id);
      if (itemIndex === -1) {
        throw new Error(`Item with id ${id} not found`);
      }
      const updatedItem = { ...data[itemIndex], ...updates };
      data[itemIndex] = updatedItem;
      await this.saveData(data);
    } catch (error) {
      throw new Error(`Error updating data from ${this.path}: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const data = await this.loadData();
      const itemIndex = data.findIndex((p) => p.id === id);
      if (itemIndex === -1) {
        throw new Error(`Item with id ${id} not found`);
      }
      data.splice(itemIndex, 1);
      await this.saveData(data);
    } catch (error) {
      throw new Error(`Error deleting data from ${this.path}: ${error}`);
    }
  }
}

export default FileSystemManager;
