import { AddItemInput, CategoryInput } from '../dto/CategoryInput'
import { CategoryDoc, categories } from '../models/Index'

export class CategoryRepository {
  constructor() {}

  async createCategory({ name, parentId, imageUrl }: CategoryInput) {
    // create a new category
    const newCategory = await categories.create({
      name,
      parentId,
      subCategory: [],
      products: [],
      imageUrl,
    })
    // parent id exist
    // update parent category with the new sub category id
    if (parentId) {
      const parentCategory = (await categories.findById(
        parentId,
      )) as CategoryDoc
      parentCategory.subCategories = [
        ...parentCategory.subCategories,
        newCategory,
      ]
      await parentCategory.save()
    }
    // return newly created category

    return newCategory
  }

  async getAllCategories(offset = 0, perPage = 100) {
    // Renamed 'categories' to 'allCategories' to avoid naming conflict
    let allCategories = await this._recursivePopulate(
      await categories
        .find({ parentId: null })
        .skip(offset)
        .limit(perPage ? perPage : 100),
    )
    return allCategories
  }

  async _recursivePopulate(
    categoriesToPopulate: CategoryDoc[],
  ): Promise<CategoryDoc[]> {
    for (let category of categoriesToPopulate) {
      // Updated to directly await the result of populate
      const populatedCategory = await category.populate({
        path: 'subCategories',
        model: 'categories',
        populate: {
          path: 'products',
          model: 'products',
        },
      })

      // Update the category with the populated data
      category.subCategories = populatedCategory.subCategories

      if (category.subCategories && category.subCategories.length > 0) {
        category.subCategories = await this._recursivePopulate(
          category.subCategories,
        )
      }
    }
    return categoriesToPopulate
  }

  async getTopCategories() {
    return categories
      .find(
        { parentId: { $ne: null } },
        {
          products: { $slice: 10 },
        },
      )
      .populate({
        path: 'products',
        model: 'products',
      })
      .sort({ displayOrder: 'descending' })
      .limit(10)
  }

  async getCategoryById(id: string, offset = 0, perPage?: number) {
    return categories
      .findById(id, {
        products: { $slice: [offset, perPage ? perPage : 100] },
      })
      .populate({
        path: 'products',
        model: 'products',
      })
  }

  async updateCategory({ id, name, displayOrder, imageUrl }: CategoryInput) {
    let category = (await categories.findById(id)) as CategoryDoc
    category.name = name
    category.displayOrder = displayOrder
    category.imageUrl = imageUrl
    return category.save()
  }

  async deleteCategory(id: string) {
    return categories.deleteOne({ _id: id })
  }

  async addItem({ id, products }: AddItemInput) {
    let category = (await categories.findById(id)) as CategoryDoc
    category.products = [...category.products, ...products]
    return category.save()
  }

  async removeItem({ id, products }: AddItemInput) {
    let category = (await categories.findById(id)) as CategoryDoc
    const excludeProducts = category.products.filter(
      (item) => !products.includes(item),
    )
    category.products = excludeProducts
    return category.save()
  }
}
