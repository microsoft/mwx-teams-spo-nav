import { SPHttpClient  } from '@microsoft/sp-http';
import { INavigationPanelApplicationCustomizerProperties } from './../NavigationPanelApplicationCustomizer';

export interface INavigationPanelProps extends INavigationPanelApplicationCustomizerProperties {
  spClient: SPHttpClient;
  siteUrl: string;
  inTeams: boolean;
}