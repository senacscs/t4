declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        name?: string;
        size?: string;
        class?: string;
      }, HTMLElement>;
    }
  }
}

export {};
