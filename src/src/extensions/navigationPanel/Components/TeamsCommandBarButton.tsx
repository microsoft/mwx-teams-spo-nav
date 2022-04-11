import * as React from "react";
import { IButtonProps, CommandBarButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import { IContextualMenuItemStyles } from '@fluentui/react/lib/ContextualMenu';
import { getTheme, concatStyleSets } from '@fluentui/react/lib/Styling';

export default class TeamsCommandBarButton extends React.Component<IButtonProps> { 

  private _theme = getTheme();
  private _props = null;  

  private _itemStyles: Partial<IContextualMenuItemStyles> = {      
    icon: { color: this._theme.palette.purple },
    iconHovered: { color: this._theme.palette.purpleDark },
    splitButtonDivider: { color: this._theme.palette.purple },
    
  };

  constructor(props: IButtonProps) {    
    super(props);
    this._props = props;
  }

  private _getCommandBarButtonStyles = memoizeFunction(
    (originalStyles: IButtonStyles | undefined): Partial<IContextualMenuItemStyles> => {
      if (!originalStyles) {
        return this._itemStyles;
      }

      return concatStyleSets(originalStyles, this._itemStyles);
    },
  );

  public render(): JSX.Element { 
    return <CommandBarButton {...this._props} styles={this._getCommandBarButtonStyles(this._props.styles)} />;
  }
}