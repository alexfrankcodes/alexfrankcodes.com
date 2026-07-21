import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

interface MdxContentProps {
  source: string;
  components?: MDXRemoteProps["components"];
}

export function MdxContent({ source, components }: MdxContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: { dark: "github-dark", light: "github-light" },
                keepBackground: false,
              },
            ],
          ],
        },
      }}
    />
  );
}
