import { LocalAuthProvider, defineConfig } from "tinacms";
import {
  TinaUserCollection,
  UsernamePasswordAuthJSProvider,
} from "tinacms-authjs/dist/tinacms";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const config = defineConfig({
  contentApiUrlOverride: "/api/tina/gql", // ensure this value is provided depending on your hosting solution
  authProvider: isLocal
    ? new LocalAuthProvider()
    : new UsernamePasswordAuthJSProvider(),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      TinaUserCollection,
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },{
            type: "string",
            name: "description",
            label: "Description",
          },{
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },{
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            ui: {
              dateFormat: "DD MMMM YYYY"
            },
          },{
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});

export default config;