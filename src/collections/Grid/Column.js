import _ from 'lodash';
import classNames from 'classnames';
import React, {Component, PropTypes} from 'react';
import numberToWord from 'src/utils/numberToWord';
import META from 'src/utils/Meta.js';

export default class Column extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
    width: PropTypes.oneOf(_.range(1, 17)),
  };

  static _meta = {
    library: META.library.semanticUI,
    name: 'Column',
    type: META.type.collection,
    parent: 'Grid',
  };

  render() {
    const classes = classNames(
      'sd-column',
      this.props.className,
      this.props.width && numberToWord(this.props.width) + ' wide',
      'column'
    );
    return (
      <div {...this.props} className={classes}>
        {this.props.children}
      </div>
    );
  }
}
