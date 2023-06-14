import { z } from 'zod';

const createExamResultZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    address: z.string().optional(),
    class: z.string({
      required_error: 'Class is required',
    }),
    roll: z.string({
      required_error: 'Roll is required',
    }),
    gpa: z.string({
      required_error: 'GPA is required',
    }),
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
  }),
});

export const ExamResultValidation = {
  createExamResultZodSchema,
};
