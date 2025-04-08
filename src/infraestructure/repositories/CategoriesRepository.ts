import { inject, injectable } from "inversify";
import Category from "../../domain/entities/Categories";
import { ICategoriesRepository } from "../../domain/repositories/ICategoryRepository";
import { CATEGORY_TYPES } from "../../types";
import CategoriesModel from "../database/models/CategoriesModel";
import ICategoryMapper from "../mappers/interfaces/ICategoriesMapper";

@injectable()
export default class CategoriesRepository implements ICategoriesRepository {

  private categoriesMapper: ICategoryMapper;

  constructor(@inject(CATEGORY_TYPES.ICategoryMapper) categoriesMapper: ICategoryMapper) {
    this.categoriesMapper = categoriesMapper
  }


  async createCategory(category: Category): Promise<boolean> {
    try {
      const categoryModel = this.categoriesMapper.categoryToModel(category)
      const newCategory = await CategoriesModel.create(categoryModel.dataValues)
      if (newCategory) {
        return true
      } else {
        return false
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getCategoryByName(name: string): Promise<Category | null> {
    try {
      const categoryModel = await CategoriesModel.findOne({ where: { name: name } });
      if (categoryModel) {
        const category = this.categoriesMapper.modelToCategory(categoryModel.dataValues)
        return category
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const categoryModel = await CategoriesModel.findByPk(id);
      if (categoryModel) {
        const category = this.categoriesMapper.modelToCategory(categoryModel.dataValues)
        return category
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getCategoryByIdInSystem(id: string): Promise<CategoriesModel | null> {
    try {
      const categoryModel = await CategoriesModel.findByPk(id);
      if (categoryModel) {
        return categoryModel
      } else {
        return null
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getAllCategories(): Promise<Category[] | null> {
    try {
      const allCategoriesModel = await CategoriesModel.findAll();
      if (!allCategoriesModel) {
        return null;
      }
      const allCategories = this.categoriesMapper.modelToCategoryList(allCategoriesModel.map(category => category.dataValues));
      return allCategories;
      } catch (error: any) {
      throw new Error(error);
    }
  }


  async updateCategory(id: string, categories: Partial<Category>): Promise<Category | null> {
    try {
      const categoryById = await this.getCategoryByIdInSystem(id);
      if (!categoryById) return null;

      const categoryToModel = this.categoriesMapper.partialCategoryToModel(categories);

      const updatedCategory = await categoryById.update({
        ...categoryToModel.dataValues
      });

      return this.categoriesMapper.modelToCategory(updatedCategory.dataValues);
    } catch (error: any) {
      console.error('Error updating category:', error);
      throw new Error(error);
    }
  }


  async deleteCategory(id: string): Promise<boolean> {
    try {
      const category = await this.getCategoryById(id)
      if (!category) {
        return false
      }
      const categoryModel = this.categoriesMapper.categoryToModel(category)
      await categoryModel.destroy();
      return true
    } catch (error: any) {
      throw new Error(error)
    }
  }
}