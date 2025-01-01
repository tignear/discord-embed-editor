import type { APIEmbed } from "discord-api-types/v10";

export interface DiscordFileData {
  file: File;
  description: string;
  spoiler: boolean;
}
export const IMAGE_MIME_TYPES = Object.freeze(['image/png', 'image/jpeg', 'image/gif']);
export type EditorAPIEmbed = Required<Pick<APIEmbed, 'thumbnail' | 'image' | 'footer' | 'timestamp'>> & APIEmbed
export function newEmptyEmbed(): EditorAPIEmbed {
  return {
    description: '',
    author: {
      name: ''
    },
    thumbnail: {
      url: ''
    },
    image: {
      url: ''
    },
    footer: {
      text: ''
    },
    timestamp: ''
  };
}