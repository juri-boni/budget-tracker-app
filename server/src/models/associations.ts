// src/models/associations.ts
import User from './User.model';
import Category from './Category.model';
import Expense from './Expense.model';
import Budget from './Budget.model';


// Setting up the associations
User.hasMany(Category, {
    foreignKey: 'user_id', // The foreign key in the Category model
    sourceKey: 'id', // The key in the User model being referenced
});

Category.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Category model
    targetKey: 'id', // The key in the User model being referenced
});

User.hasMany(Expense, {
    foreignKey: 'user_id', // The foreign key in the Expense model
    sourceKey: 'id', // The key in the User model being referenced
});

Expense.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Expense model
    targetKey: 'id', // The key in the User model being referenced
});

Category.hasMany(Expense, {
    foreignKey: 'category_id', // The foreign key in the Expense model
    sourceKey: 'id', // The key in the Category model being referenced
});

Expense.belongsTo(Category, {
    foreignKey: 'category_id', // The foreign key in the Expense model
    targetKey: 'id', // The key in the Category model being referenced
});

User.hasMany(Budget, {
    foreignKey: 'user_id', // The foreign key in the Budget model
    sourceKey: 'id', // The key in the User model being referenced
});

Budget.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Budget model
    targetKey: 'id', // The key in the User model being referenced
});

Category.hasMany(Budget, {
    foreignKey: 'category_id', // The foreign key in the Budget model
    sourceKey: 'id', // The key in the Category model being referenced,
    onDelete: 'CASCADE',
});

Budget.belongsTo(Category, {
    foreignKey: 'category_id', // The foreign key in the Budget model
    targetKey: 'id', // The key in the Category model being referenced
});