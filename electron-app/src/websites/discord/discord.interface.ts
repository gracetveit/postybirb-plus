import { DefaultFileOptions } from '../../submission/submission-part/interfaces/default-options.interface';

export interface DiscordOptions extends DefaultFileOptions {
  spoiler: boolean;
  useTitle: boolean;
}
