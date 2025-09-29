// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // el nombre es obligatorio
    },
    description: {
      type: DataTypes.TEXT,
    },
    photo: {
      type: DataTypes.STRING, // solo el nombre del archivo de imagen
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false, // obligatorio
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // arranca con 0 si no se define
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Product;
};

