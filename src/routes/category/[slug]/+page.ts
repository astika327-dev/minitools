// src/routes/category/[slug]/+page.ts
import { toolGroups } from '$lib/tools';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  const category = toolGroups.find(group => group.slug === params.slug);

  if (!category) {
    throw error(404, 'Category not found');
  }

  return {
    category
  };
};
