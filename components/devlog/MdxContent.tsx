import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import * as devRuntime from "react/jsx-dev-runtime";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import type { MDXComponents } from "mdx/types";

interface MdxContentProps {
  source: string;
  components?: MDXComponents;
}

// next-mdx-remote/rsc is archived and broken under Next 15's RSC runtime
// (github.com/hashicorp/next-mdx-remote/issues/467 — the jsx-runtime it
// pulls in resolves to a different React module instance than the one
// rendering the tree). Evaluating with @mdx-js/mdx directly, in our own
// module, lets Next's compiler apply the "react-server" export condition
// correctly to the jsx-runtime import.
const development = process.env.NODE_ENV === "development";

export async function MdxContent({ source, components }: MdxContentProps) {
  const { default: Content } = await evaluate(source, {
    ...(development ? devRuntime : runtime),
    development,
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
  });
  return <Content components={components} />;
}
