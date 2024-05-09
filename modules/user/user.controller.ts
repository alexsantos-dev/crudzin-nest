import { Body, Controller, Get, Param, Post, Res, HttpStatus, NotFoundException } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { User } from './user.model'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User> {
        return this.userService.createUser(userData)
    }

    @Get(':id')
    async findUserById(@Param('id') id: string, @Res() res: Response): Promise<Response> {
        try {
            const user = await this.userService.findUserById(id)
            if (!user) throw new NotFoundException(`User with id ${id} not found`)

            return res.status(HttpStatus.OK).json(user)
        } catch (error) {
            const status = error instanceof NotFoundException ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR
            return res.status(status).json({ message: error.message || 'Internal server error' })
        }
    }

}