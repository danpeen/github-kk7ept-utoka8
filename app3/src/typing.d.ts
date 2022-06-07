export {};
declare global {
  interface Window {
    __GARFISH__: boolean;
    __GARFISH_EXPORTS__: any;
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
    app1Url: string;
    app2Url: string;
    libsUrl: string;
  }
}
