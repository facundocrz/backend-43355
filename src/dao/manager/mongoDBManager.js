import mongoose from "mongoose";
import dao from "../../config/dao.config.js";

await mongoose.connect(dao.mongoDB.cnxStr, dao.mongoDB.options);

class MongoDBManager {
  constructor(schema) {
    this.collection = schema;
  }

  async saveData(data) {
    try {
      const createdData = await this.collection.create(data);
      return await createdData._id;
    } catch (error) {
      throw new Error(`Error saving data to mongoDB: ${error}`);
    }
  }

  async loadData() {
    try {
      const data = await this.collection.find().lean();
      return data;
    } catch (error) {
      throw new Error(`Error loading data from mongoDB: ${error}`);
    }
  }

  async getDataById(id) {
    try {
      const data = await this.collection.findById(id).lean();
      if (!data) {
        throw new Error(`Item with id ${id} not found`);
      }
      return data;
    } catch (error) {
      throw new Error(`Error loading data from mongoDB: ${error}`);
    }
  }

  async updateById(id, updates) {
    try {
      const data = await this.collection.findOneAndUpdate(
        { _id: id },
        updates,
        { new: true }
      );
      if (!data) {
        throw new Error(`Item with id ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Error updating data from mongoDB: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedData = await this.collection.findOneAndDelete({ id });
      if (!deletedData) {
        throw new Error(`Item with id ${id} not found`);
      }
    } catch (error) {
      throw new Error(`Error deleting data from mongoDB: ${error}`);
    }
  }
}

export default MongoDBManager;
