const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo Raza
    sequelize.define('Raza', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            get() {
                return this.getDataValue('id') + 300;
            }
        },
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        height: {
            type: DataTypes.STRING,
            allowNull: false
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lifeSpan: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
};
