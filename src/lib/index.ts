export interface DiscordFileData {
  file: File;
  description: string;
  spoiler: boolean;
}
export const IMAGE_MIME_TYPES = Object.freeze(['image/png', 'image/jpeg', 'image/gif']);