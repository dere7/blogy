import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Post } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToMany(() => Post, (post) => post.author, { onDelete: 'CASCADE' })
  posts: Post[];
}
