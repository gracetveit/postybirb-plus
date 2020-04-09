import { FurifficOptions } from './furiffic.interface';

export const FURIFFIC_DEFAULT_FILE_SUBMISSION_OPTIONS: FurifficOptions = {
  tags: {
    extendDefault: true,
    value: [],
  },
  description: {
    overwriteDefault: false,
    value: '',
  },
  rating: null,
  useThumbnail: true,
  autoScale: true,
};
