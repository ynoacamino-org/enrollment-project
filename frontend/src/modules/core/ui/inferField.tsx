import type { Field } from '@/modules/core/types/field';
import { Input } from '@/modules/core/ui/input';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/core/ui/form';
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';
import { SupportedFields } from '@/modules/core/lib/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/modules/core/ui/select';
import { Textarea } from './textarea';
import { useId } from 'react';

function InferItem<
  FieldName extends string,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  ...props
}: Field<FieldName> & ControllerRenderProps<TFieldValues, TName>) {
  const id = useId();
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {(() => {
          if (props.type === SupportedFields.SELECT) {
            return (
              <Select>
                <SelectTrigger>
                  <SelectValue {...props} />
                </SelectTrigger>
                <SelectContent>
                  {props.options.map(({ value, textValue }) => (
                    <SelectItem key={`${id}-${value}`} value={value}>
                      {textValue || value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          } else if (props.type === SupportedFields.TEXTAREA) {
            return <Textarea {...props} />;
          } else {
            return <Input {...props} />;
          }
        })()}
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export { InferItem };
