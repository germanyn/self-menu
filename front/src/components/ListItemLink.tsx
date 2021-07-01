import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { forwardRef, useMemo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
  }
  
  function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;
  
    const renderLink = useMemo(
      () =>
        forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => (
          <Link to={to} ref={ref} {...itemProps} />
        )),
      [to],
    );
  
    return (
        <ListItem button component={renderLink}>
            {/* { props.children } */}
        </ListItem>
    
    );
  }