declare interface INavigationPanelApplicationCustomizerStrings {
  Title: string;
  ShowPanelButtonTitle: string;
  PanelTitle: string;
  BackNavButtonText: string;
  ForwardNavButtonText: string;
}

declare module 'NavigationPanelApplicationCustomizerStrings' {
  const strings: INavigationPanelApplicationCustomizerStrings;
  export = strings;
}
