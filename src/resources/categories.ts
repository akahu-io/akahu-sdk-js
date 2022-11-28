import { BaseResource } from "./base";
import { Category } from "../models";

/**
 * Utilities to view categories that are available to your app.
 *
 * @category Resource
 */
export class CategoriesResource extends BaseResource {
  /**
   * List all categories that the app has access to.
   *
   * {@link https://developers.akahu.nz/reference/get_categories}
   */
  public async list(): Promise<Category[]> {
    return await this._client._apiCall<Category[]>({
      path: "/categories",
      auth: { basic: true },
    });
  }

  /**
   * Get an individual category.
   *
   * {@link https://developers.akahu.nz/reference/get_categories-id}
   */
  public async get(categoryId: string): Promise<Category> {
    return await this._client._apiCall<Category>({
      path: `/categories/${categoryId}`,
      auth: { basic: true },
    });
  }
}
