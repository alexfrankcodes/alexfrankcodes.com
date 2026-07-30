import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* an unrelated package-lock.json further up the tree makes Next infer the
     home directory as the workspace root; pin it to this project instead */
  outputFileTracingRoot: dirname(fileURLToPath(import.meta.url)),
};

export default nextConfig;
