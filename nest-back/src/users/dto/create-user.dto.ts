import { IsEmail, IsNotEmpty, IsString } from "class-validator";

class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
  username: string;
}

export default CreateUserDto;