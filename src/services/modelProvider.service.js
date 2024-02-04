export class ModelProvider {
  constructor(model, req) {
    this.model = model;
    this.page = req.query.page || 1;
    this.limit = req.query.limit || 20;
    this.skip = (this.page - 1) * this.limit;
    this.userId = req.user._id;
    this.search = req.query.search || "";
    this.columns = [];
  }

  searchWith(columns) {
    this.columns = columns;
    return this;
  }

  async get() {
    const { columns, search, userId, limit, skip } = this;
    let data = null;
    let count = 0;
    let query = { auth: userId };

    if (search !== "" && columns.length > 0) {
      const regex = columns.map((column) => ({
        [column]: { $regex: new RegExp(search, "i") },
      }));
      query.$or = regex;

      data = await this.model
        .find(query)
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });
      count = await this.model.countDocuments(query).exec();
    } else {
      data = await this.model
        .find(query)
        .limit(limit)
        .skip(skip)
        .sort({ _id: -1 });
      count = await this.model.countDocuments(query).exec();
    }

    return [count, data];
  }
}
