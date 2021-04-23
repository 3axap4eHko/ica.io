import { createClient } from 'apidly';
import getConfig from 'next/config';

const { publicRuntimeConfig: { yelpBase, yelpKey } } = getConfig();

const client = createClient({ base: yelpBase });
client.use((req) => {
  req.set('Authorization', `Bearer ${yelpKey}`);
});

export default client;
