import { createClient } from "contentful";
import { useState, useEffect } from "react";

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: "master",
  accessToken: import.meta.env.VITE_API_ACCESS_TOKEN,
});

const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const getData = async () => {
    try {
      const resp = await client.getEntries({
        content_type: import.meta.env.VITE_PROJECT_NAME,
      });
      const items_fields = resp.items.map((item) => {
        const { title, url, image } = item.fields;
        const id = item.sys.id;
        const img = image?.fields?.file?.url;
        return { title, url, img, id };
      });
      setProjects(items_fields);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, projects };
};

export default useFetchProjects;
