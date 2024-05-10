import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }

    async createUser(userData: Omit<User, 'id'>): Promise<User> {
        return await this.userModel.create(userData)
    }

    async findUserById(id: string): Promise<User> {
        const user = await this.userModel.findByPk(id)
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userModel.findAll()
        if (users.length === 0) {
            throw new NotFoundException('No users found')
        }
        return users
    }

    async updateUser(id: string, userData: Omit<Partial<User>, 'id'>): Promise<[number, User[]]> {
        const user = await this.findUserById(id)
        if (user) {
            const [rowsUpdated, upadatedUsers] = await this.userModel.update(userData, {
                where: { id },
                returning: true
            })
            return [rowsUpdated, upadatedUsers]
        }
    }

    async deleteUser(id: string): Promise<number> {
        const user = await this.findUserById(id)
        if (user) {
            const rowsDeleted = await this.userModel.destroy({ where: { id } })
            return rowsDeleted
        }
    }
}