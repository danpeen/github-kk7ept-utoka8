/// <reference types="react" />

declare module "app1/shared-components" {
  export type PropsCom1 = {
    name: string;
    age: number;
  };
  export const Com1: (props: PropsCom1) => JSX.Element;
  export default Com1;
}
