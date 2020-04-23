import React from 'react';
import '../../assets/scss/style/components/Breadcrumbs.scss';

const Breadcrumb = ({ separator = '/', ...props }) => {
  let children = React.Children.toArray(props.children);

  children = children.map((child, index) => <li className="breadcrumbs__item" key={`breadcrumb_item${index}`}>{child}</li>);

  const lastIndex = children.length - 1;

  children = children.reduce((acc, child, index) => {
    const notLast = index < lastIndex;
    if (notLast) {
      acc.push(
        child,
        <li className='breadcrumbs__item breadcrumbs__item--separator' key={`breadcrumb_sep${index}`}>
          {separator}
        </li>
      );
    } else {
      acc.push(child);
    }
    return acc;
  }, []);

  return <ol className="breadcrumbs">{children}</ol>;
};

export default Breadcrumb;
