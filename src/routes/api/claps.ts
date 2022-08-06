import createClapsApi from 'svelte-claps';

export const { GET, PATCH } = createClapsApi({ maxClaps: 10 });
