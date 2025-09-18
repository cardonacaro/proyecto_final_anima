const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: DataTypes.ENUM("en_proceso", "entregado", "cancelado"),
          defaultValue: "en_proceso",
        },
      },
      {
        sequelize,
        modelName: "order",
        tableName: "orders",
      },
    );
    return Order;
  }
}

module.exports = Order;
