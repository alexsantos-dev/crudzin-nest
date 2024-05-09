import { SequelizeModuleOptions } from '@nestjs/sequelize'

export const dataBaseConfig: SequelizeModuleOptions = {
    dialect: 'sqlite',
    storage: './database/data.sqlite3',
    autoLoadModels: true,
    synchronize: true,
    logging: false,
}