import { z } from 'zod';

export const interestSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required'),
  industryId: z.number({ required_error: 'Industry Id is required.' }),
});
