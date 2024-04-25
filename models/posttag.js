'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostTag extends Model {
   
    static associate(models) {
      // define association here
      PostTag.belongsTo(models.Post);
      PostTag.belongsTo(models.Tag);
    }
  }
  PostTag.init({
    postId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PostTag',
  });
  return PostTag;
};