
import * as React from "react";
import * as ReactDOM from "react-dom";
import { INavigationPanelProps } from "./Components/INavigationPanelProps";
import NavigationPanel from "./Components/NavigationPanel";
import * as strings from 'NavigationPanelApplicationCustomizerStrings';
import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { ThemeProvider } from '@fluentui/react/lib/Theme';

const LOG_SOURCE: string = 'NavigationPanelApplicationCustomizer';

export interface INavigationPanelApplicationCustomizerProperties {  
  top: string;
}

export default class NavigationPanelApplicationCustomizer
  extends BaseApplicationCustomizer<INavigationPanelApplicationCustomizerProperties> {
  
  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);    
    this._renderPlaceHolders();
    return Promise.resolve();
  }

  private _onDispose(): void {    
  }

  private _renderPlaceHolders(): void {        
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top,{ onDispose: this._onDispose });
      
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      const element: React.ReactElement<INavigationPanelProps> = React.createElement(
        NavigationPanel, 
        {
          top: this.properties.top,
          inTeams: true,
          spClient: this.context.spHttpClient,
          siteUrl: this.context.pageContext.web.absoluteUrl
        });
      
      ReactDOM.render(element, this._topPlaceholder.domElement);           
    }    
  }
}

