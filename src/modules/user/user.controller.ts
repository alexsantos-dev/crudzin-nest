import { Body, Controller, Get, Param, Patch, Post, Res, HttpStatus, Delete } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { User } from './user.model'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: Partial<User>, @Res() res: Response): Promise<Response> {
        try {
            const allowFields = ['name', 'email', 'password']
            const validCreate = Object.keys(userData).every(field => allowFields.includes(field))
            if (!validCreate) {
                return res.status(HttpStatus.BAD_REQUEST).json({ err: 'Invalid fields' })
            } else {
                const createdUser = await this.userService.createUser(userData)
                return res.status(HttpStatus.OK).json(createdUser)
            }
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' })
        }
    }

    @Get()
    async findAllUsers(@Res() res: Response): Promise<Response> {
        try {
            const users = await this.userService.findAllUsers()
            return users.length > 0 ?
                res.status(HttpStatus.OK).json(users) :
                res.status(HttpStatus.NOT_FOUND).json({ err: 'No users found' })
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' })
        }
    }

    @Get(':id')
    async findUserById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const user = await this.userService.findUserById(id)
            return user ?
                res.status(HttpStatus.OK).json(user) :
                res.status(HttpStatus.NOT_FOUND).json({ err: 'User not found' })
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' })
        }
    }

    @Patch(':id')
    async updateUser(@Param('id') id: string, @Body() userData: Partial<User>, @Res() res: Response): Promise<Response> {
        try {
            const allowFields = ['name', 'email', 'password']
            const validUpdate = Object.keys(userData).some(field => allowFields.includes(field))
            const validUser = await this.userService.findUserById(id)
            if (validUser) {
                if (!validUpdate) {
                    return res.status(HttpStatus.BAD_REQUEST).json({ err: 'Invalid fields' })
                } else {
                    await this.userService.updateUser(id, userData)
                    return res.status(HttpStatus.OK).json({ msg: 'User updated' })
                }
            } else {
                return res.status(HttpStatus.NOT_FOUND).json({ err: 'User not found' })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' })
        }
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const validUser = await this.userService.findUserById(id)
            if (!validUser) {
                res.status(HttpStatus.NOT_FOUND).json({ err: 'User not found' })
            } else {
                await this.userService.deleteUser(id)
                return res.status(HttpStatus.NO_CONTENT).end()
            }
        } catch (error) {
            return res.status(500).json({ message: error.message || 'Internal server error' })
        }
    }
}