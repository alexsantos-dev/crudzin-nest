import { Model, Table, Column, DataType } from 'sequelize-typescript'

@Table({ timestamps: true })
export class User extends Model<User> {
    @Column({
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
    })
    id: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [2, 50],
            is: /^[\u00C0-\u017Fa-zA-Z\s]*$/
        }
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            len: [8, 100]
        }
    })
    password: string

}