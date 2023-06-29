import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Column({ nullable: true })
  fullname: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsStrongPassword()
  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  profile: string;
}
