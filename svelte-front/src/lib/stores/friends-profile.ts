import type { Profile } from "$lib/types/profile";
import { writable } from "svelte/store";

export const friendsProfile = writable<Profile[]>([]);