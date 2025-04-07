import { Request, Response, NextFunction } from "express";
import ICategoriesController from "./interfaces/ICategoriesController";
import { CATEGORY_TYPES } from "../../types";
import IFindAllCategories from "../../app/interfaces/categories/get/IGetAllCategories";
import IFindCategoryById from "../../app/interfaces/categories/get/IGetCategoryById";
import IUpdateCategory from "../../app/interfaces/categories/patch/IUpdateCategory";
import IDeleteCategory from "../../app/interfaces/categories/delete/IDeleteCategory";
import ICreateCategory from "../../app/interfaces/categories/post/ICreateCategory";
import { inject } from "inversify";
import { BoomError } from "../../domain/entities/DomainError";
import { ErrorType } from "../../domain/interfaces/Error";
import IGetCategoryByName from "../../app/interfaces/categories/get/IGetCategoryByName";
import ICategoryMapper from "../../infraestructure/mappers/interfaces/ICategoriesMapper";
import Category from "../../domain/entities/Categories";

export default class CategoriesController implements ICategoriesController {

  constructor(
    @inject(CATEGORY_TYPES.IGetAllCategories) private findAllCategories: IFindAllCategories,
    @inject(CATEGORY_TYPES.IGetCategoryById) private findCategoryById: IFindCategoryById,
    @inject(CATEGORY_TYPES.IUpdateCategory) private updateCategory: IUpdateCategory,
    @inject(CATEGORY_TYPES.IDeleteCategory) private deleteCategory: IDeleteCategory,
    @inject(CATEGORY_TYPES.ICreateCategory) private createCategory: ICreateCategory,
    @inject(CATEGORY_TYPES.IGetCategoryByName) private findCategoryByName: IGetCategoryByName,
    @inject(CATEGORY_TYPES.ICategoryMapper) private categoryMapper: ICategoryMapper
  ) {}

  async createCategoryController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const category = req.body

    try {
      const newCategory = await this.createCategory.execute(category)
      if (!newCategory) {
        throw new BoomError({
          message: 'Failed to create category',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      res.status(201).json( { message: 'Category created'} )
    } catch (error) {
      next(error)
    }
  }

  async findByIdController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const category = await this.findCategoryById.execute(id)
      if (!category) {
        throw new BoomError({
          message: 'Failed to find category',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 404
        });
      }
      const categoryDto = this.categoryMapper.categoryToDto(category)
      res.status(200).json(categoryDto)
    } catch (error) {
      next(error)
    }
  }

  async findAllController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const categories = await this.findAllCategories.execute()
      if (!categories) {
        throw new BoomError({
          message: 'Failed to find categories',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 404
        });
      }
      const categoriesDto = this.categoryMapper.categoryToDtoList(categories)
      res.status(200).json(categoriesDto)
    } catch (error) {
      next(error)
    }
  }

  async findByNameController(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.params
      const category = await this.findCategoryByName.execute(name)
      if (!category) {
        throw new BoomError({
          message: `Failed to find ${name} category`,
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 404
        });
      }
      const categoryDto = this.categoryMapper.categoryToDto(category as Category)
      res.status(200).json(categoryDto)
    } catch (error) {
      next(error)
    }  }

  async updateCategoryController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    const categoryData = req.body
    try {
      const categoryUpdate = await this.updateCategory.execute(id, categoryData);

      if (!categoryUpdate) {
        throw new BoomError({
          message: 'Failed to update category',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }
      const categoryDto = this.categoryMapper.categoryToDto(categoryUpdate as Category)
      res.status(200).json(categoryDto)
    } catch (error) {
      next(error)
    }
  }

  async deleteCategoryController(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    try {
      const categoryDelete = await this.deleteCategory.execute(id)

      if (!categoryDelete) {
        throw new BoomError({
          message: 'Failed to delete category',
          type: ErrorType.INTERNAL_ERROR,
          statusCode: 500
        });
      }

      res.status(204).json({ message: "Category deleted" })
    } catch (error) {
      next(error)
    }
  }

}