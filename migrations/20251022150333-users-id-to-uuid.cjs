'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Add new UUID column
    await queryInterface.addColumn('users', 'uuid', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'), // requires pgcrypto
      allowNull: false,
    });

    await queryInterface.sequelize.query(`
      UPDATE users SET uuid = gen_random_uuid() WHERE uuid IS NULL;
    `);

    await queryInterface.removeColumn('users', 'id');

    await queryInterface.sequelize.query(`
      ALTER TABLE users ADD PRIMARY KEY (id);
    `);
  },

  async down(queryInterface, Sequelize) {
    throw new Error('Cannot safely revert UUID conversion');
  },
};
