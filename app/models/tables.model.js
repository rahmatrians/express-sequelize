module.exports = (sequelize, Sequelize) => {
    const Kategori = sequelize.define("kategori", {
        id: {
            // type: Sequelize.UUID,
            // defaultValue: Sequelize.fn('uuid_generate_v4'),
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    const Buku = sequelize.define("buku", {
        id: {
            // type: Sequelize.UUID,
            // defaultValue: Sequelize.fn('uuid_generate_v4'),
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    Kategori.hasMany(Buku, {
        foreignKey: 'kategoris_id'
    });

    return { Kategori, Buku };
};