import { ICategoriesRepository } from "../../domain/repositories/ICategoryRepository";
import CategoriesModel from "../database/models/CategoriesModel";

export default class CategoriesRepository implements ICategoriesRepository {

  async createCategory(category: CategoriesModel): Promise<boolean> {
    try {
      const newCategory = await CategoriesModel.create(category)
      if (newCategory) {
        return true
      } else {
        return false
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getCategoryByName(name: string): Promise<CategoriesModel | null> {
    try {
      const category = await CategoriesModel.findOne({ where: { name: name } });
      if (category) {
        return category.dataValues
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getCategoryById(id: string): Promise<CategoriesModel | null> {
    try {
      const category = await CategoriesModel.findByPk(id);
      if (category) {
        return category
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getAllCategories(): Promise<CategoriesModel[] | null> {
    try {
      const allCategories = await CategoriesModel.findAll();
      if (!allCategories) {
        return null
      }

      return allCategories
    } catch (error: any) {
      throw new Error(error)
    }
  }
  async updateCategory(id: string, categories: Partial<CategoriesModel>): Promise<CategoriesModel | null> {
    try {
      const category = await this.getCategoryById(id)
      if (category) {
        const updatedCategory = await category.update({ ...categories });
        return updatedCategory.dataValues
      } else {
        return null
      }
    } catch (error: any) {
      console.error('Error updating category:', error);
      throw new Error(error)
    }
  }
  async deleteCategory(id: string): Promise<boolean> {
    try {
      const category = await this.getCategoryById(id)
      if (!category) {
        return false
      }

      await category.destroy();
      return true
    } catch (error: any) {
      throw new Error(error)
    }
  }
}