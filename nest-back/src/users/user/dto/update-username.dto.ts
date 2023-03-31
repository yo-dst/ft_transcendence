import { IsNotEmpty, IsString, Length } from "class-validator";

export default class UpdateUsernameDto {
	@IsString()
	@IsNotEmpty()
	@Length(5, 25)
	newUsername: string;
}