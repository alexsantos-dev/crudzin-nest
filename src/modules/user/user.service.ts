import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './user.model'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
    ) { }

    async createUser(userData: Partial<User>): Promise<User> {
        try {
            const userCreated = await this.userModel.create(userData)
            return userCreated
        } catch (error) {
            throw error
        }
    }

    async findUserById(id: string): Promise<User> {
        try {
            const user = await this.userModel.findByPk(id)
            return user
        } catch (error) {
            throw error
        }
    }

    async findAllUsers(): Promise<User[]> {
        try {
            const users = await this.userModel.findAll()
            return users
        } catch (error) {
            throw error
        }
    }

    async updateUser(id: string, userData: Omit<Partial<User>, 'id'>): Promise<[number]> {
        try {
            return await this.userModel.update(userData, {
                where: { id },
            })
        } catch (error) {
            throw error
        }
    }

    async deleteUser(id: string): Promise<number> {
        try {
            const rowsDeleted = await this.userModel.destroy({ where: { id } })
            return rowsDeleted
        } catch (error) {
            throw error
        }
    }
}