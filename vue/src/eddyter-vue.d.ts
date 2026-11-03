// @eddyter/vue 1.0.4 does not ship TypeScript declarations yet.
// This shim lets strict TypeScript projects (vue-tsc) build. Remove it once
// the package includes its own types.
declare module "@eddyter/vue" {
  import type { DefineComponent, Plugin } from "vue";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const Eddyter: DefineComponent<any, any, any>;
  const EddyterPlugin: Plugin;
  export default EddyterPlugin;
}
