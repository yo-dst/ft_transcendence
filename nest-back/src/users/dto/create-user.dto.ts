import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	@Length(5, 25)
  	username: string;

	@IsString()
	@IsNotEmpty()
	avatarUrl: string;
}

export default CreateUserDto;