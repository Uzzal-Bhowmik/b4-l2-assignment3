import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public baseQuery: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, baseQuery: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.baseQuery = baseQuery;
  }

  // Search : Partial match
  search(searchableFields: string[]) {
    const searchTerm: string = (this.baseQuery?.search as string) || "";

    this.modelQuery = this.modelQuery.find({
      $or: searchableFields.map((field: string) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    } as FilterQuery<T>);

    return this;
  }

  // Filter : Exact match
  filter(filterField: string) {
    let matchQuery = { ...this.baseQuery };

    if (matchQuery.filter) {
      matchQuery = {
        [filterField]: matchQuery.filter,
        ...matchQuery,
      };
    }

    const excludeFields = [
      "search",
      "limit",
      "sortBy",
      "sortOrder",
      "page",
      "fields",
      "filter",
    ];
    excludeFields.forEach((field) => delete matchQuery[field]);

    this.modelQuery = this.modelQuery.find(matchQuery as FilterQuery<T>);

    return this;
  }

  // Sort
  sort() {
    const sortOrder =
      this.baseQuery.sortOrder === "asc"
        ? ""
        : this.baseQuery.sortOrder === "desc"
          ? "-"
          : "";

    const sortString = sortOrder + this.baseQuery.sortBy || "";

    this.modelQuery = this.modelQuery.sort(sortString);

    return this;
  }

  // Paginate
  paginate() {
    const page = parseInt(this.baseQuery?.page as string) || 1;
    const limit = parseInt(this.baseQuery?.limit as string) || 10; // default limit 10
    const skip = (page - 1) * limit || 0;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // Fields filtering
  fields() {
    const fields =
      (this?.baseQuery?.fields as string)?.split(",").join(" ") || "-__v";

    this.modelQuery = this?.modelQuery?.select(fields);

    return this;
  }
}

export default QueryBuilder;
