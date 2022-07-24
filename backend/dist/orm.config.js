"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    name: 'ser1',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user1',
    password: 'changeme',
    database: 'tododb',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}']
};
//# sourceMappingURL=orm.config.js.map