import { z } from 'zod';
import { columnMeta } from 'src/config/columnMeta';
import { ColumnType } from './dataTypes';

const generateOrderSchema = () => {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  for(const [key, meta] of Object.entries(columnMeta)) {
    const type = meta.type as ColumnType;
    let fieldSchema: z.ZodTypeAny;

    switch (type) {
      case 'string': 
        fieldSchema = z.string();
        break;
      case 'number':
        fieldSchema = z.number();
        break;
      default:
        fieldSchema = z.any();
    }

    if (meta.nullable) {
      fieldSchema = fieldSchema.nullable();
    }
    
    schemaShape[key] = fieldSchema;
  }
  return z.object(schemaShape)
};

const orderSchema = generateOrderSchema();

export const APIResponseSchema = z.union([
  z.object({
    status: z.literal("success"),
    data: z.object({
      context: z.object({
        order: z.array(orderSchema)
      })
    })
  }),
  z.object({
    status: z.literal("error"),
    message: z.string()
  })
]);