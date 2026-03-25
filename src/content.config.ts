import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const analises = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/analises' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['regional', 'nacional', 'internacional', 'politicas']),
    region: z.string().optional(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const politicas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/politicas' }),
  schema: z.object({
    title: z.string(),
    status: z.enum(['ativa', 'em-andamento', 'encerrada']),
    excerpt: z.string(),
    legislacao: z.array(z.string()).optional(),
    progressLabel: z.string().optional(),
    progressValue: z.number().optional(),
  }),
});

export const collections = { analises, politicas };
