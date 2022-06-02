export {};
declare global {
  interface Window {
    __GARFISH__: boolean;
    __GARFISH_EXPORTS__: any;
    app1Url: string;
    app2Url: string;
  }
}
