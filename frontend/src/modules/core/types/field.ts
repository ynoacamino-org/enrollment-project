import { SupportedFields } from '@/modules/core/lib/field';
import type { SelectOption } from '@/modules/core/types/select';

export type SupportFieldType =
  (typeof SupportedFields)[keyof typeof SupportedFields];

type BaseField<T extends string> = {
  name: T;
  label: string;
  description?: string;
  placeholder?: string;
};

export type Field<T extends string> = BaseField<T> &
  (
    | {
        type:
          | typeof SupportedFields.EMAIL
          | typeof SupportedFields.PASSWORD
          | typeof SupportedFields.TEXTAREA
          | typeof SupportedFields.TEXT;
      }
    | {
        type: typeof SupportedFields.SELECT;
        options: SelectOption[];
      }
  );
