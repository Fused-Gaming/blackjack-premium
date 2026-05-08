/// <reference types="vite/client" />

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.sass' {
  const content: { [className: string]: string };
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_COMMIT_SHA: string;
  readonly VITE_BUILD_TIME: string;
  readonly VITE_BRANCH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
