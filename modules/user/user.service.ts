import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }

    async createUser(userData: Partial<User>): Promise<User> {
        return this.userModel.create(userData)
    }

    async findUserById(id: string): Promise<User> {
        return this.userModel.findByPk(id)
    }
}