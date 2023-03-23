import { IsNotEmpty, IsString } from "class-validator";

export default class UpdateUsernameDto {
	@IsString()
	@IsNotEmpty()
	newUsername: string;
}