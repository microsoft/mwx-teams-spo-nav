
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

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface INavigationPanelApplicationCustomizerProperties {
  // This is an example; replace with your own property
  top: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class NavigationPanelApplicationCustomizer
  extends BaseApplicationCustomizer<INavigationPanelApplicationCustomizerProperties> {
  
  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello from ${strings.Title}:\n\n${message}`);

    // Added to handle possible changes on the existence of placeholders.
    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    // Call render method for generating the HTML elements.
    this._renderPlaceHolders();

    return Promise.resolve();
  }

  private _onDispose(): void {
    console.log('[NavigationPanelApplicationCustomizer._onDispose] Disposed custom top placeholders.');
  }

  private _renderPlaceHolders(): void {

    console.log('Available placeholders: ', this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));    

    // Handling the bottom placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top,{ onDispose: this._onDispose });
  
      // The extension should not assume that the expected placeholder is available.
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

      // const NavFabricDemoAppExampleWrapper = () => <ThemeProvider>{ element }</ThemeProvider>;  
      // ReactDOM.render(element, this._topPlaceholder.domElement); 
      
    }

    

  }


    
}

