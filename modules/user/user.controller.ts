import { Body, Controller, Get, Param, Post, Res, HttpStatus, NotFoundException } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { User } from './user.model'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: Omit<User, 'id'>, @Res() res: Response): Promise<Response> {
        try {
            const allowFields = ['name', 'email', 'password']
            const isValidUpdate = Object.keys(userData).every(field => allowFields.includes(field))

            if (!isValidUpdate) {
                return res.status(HttpStatus.BAD_REQUEST).json({ err: 'Invalid fields' })
            }

            const createdUser = await this.userService.createUser(userData)
            if (createdUser) {
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
            if (users) return res.status(HttpStatus.OK).json(users)
        } catch (error) {
            const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR
            return res.status(status).json({ message: error.message || 'Internal server error' })
        }
    }

    @Get(':id')
    async findUserById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const user = await this.userService.findUserById(id)
            if (user) return res.status(HttpStatus.OK).json(user)
        } catch (error) {
            const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR
            return res.status(status).json({ message: error.message || 'Internal server error' })
        }
    }

}