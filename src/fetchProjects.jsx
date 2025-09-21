import { createClient } from "contentful";

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: "master", // defaults to 'master' if not set
  accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
});

client
  .getEntries({ content_type: import.meta.env.VITE_PROJECT_NAME })
  .then((response) => console.log(response.items))
  .catch(console.error);

export default client;
