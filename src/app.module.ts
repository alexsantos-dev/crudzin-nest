import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { dataBaseConfig } from 'database/database.config'
import { UserModule } from 'src/modules/user/user.module'

@Module({
    imports: [
        SequelizeModule.forRoot(dataBaseConfig),
        UserModule
    ]
})

export class AppModule { }