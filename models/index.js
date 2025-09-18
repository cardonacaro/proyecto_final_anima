const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    logging: false,
  },
);

// Requerir los modelos:
const User = require("./User");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");

// Inicializar modelos:
User.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
OrderItem.initModel(sequelize);

// Definir asociaciones:
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.belongsToMany(Product, { through: OrderItem, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: "productId" });

module.exports = {
  sequelize,
  User,
  Product,
  Order,
  OrderItem,
};





// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   process.env.DB_DATABASE, // Ej: hack_academy_db
//   process.env.DB_USERNAME, // Ej: root
//   process.env.DB_PASSWORD, // Ej: root
//   {
//     host: process.env.DB_HOST, // Ej: 127.0.0.1
//     dialect: process.env.DB_CONNECTION, // Ej: mysql
//     logging: false, // Para que no aparezcan mensajes en consola.
//   },
// );

// // Requerir todos los modelos:
// const User = require("./User");
// const Article = require("./Article");

// // Inicializar todos los modelos:
// User.initModel(sequelize);
// Article.initModel(sequelize);

// /*
//  * Luego de definir los modelos, se pueden establecer relaciones entre los
//  * mismos (usando métodos como belongsTo, hasMany y belongsToMany)...
//  *
//  * Por ejemplo, si un User está relacionado con un Article, establecerlo
//  * aquí abajo.
//  */

// module.exports = {
//   sequelize,
//   User,
//   Article,
// };
