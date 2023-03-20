import { writable } from "svelte/store";
import type { UserType } from "./utils/types/User";

export const user = writable<UserType>(undefined);