export {};
declare global {
  interface Window {
    __GARFISH__: boolean;
    __GARFISH_EXPORTS__: any;
    app2Url: string;
    libsUrl: string;
  }
}

export type PropsCom1 = {
  name: string;
  age: number;
};
