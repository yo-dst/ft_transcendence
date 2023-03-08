import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
  if (params.id) {
    return {
      channelId: params.id
    };
  }
 
  throw error(404, 'Not found');
}) satisfies PageLoad;