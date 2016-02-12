import React, { Component } from 'react'
import { render } from 'react-dom'
import stardust, { Grid } from 'stardust'

import ComponentDoc from 'docs/app/Components/ComponentDoc/ComponentDoc'
import DocsMenu from 'Components/Sidebar/Sidebar'
import style from './Style'

class DocsApp extends Component {
  state = { menuSearch: '' };

  render() {
    const components = Object.keys(stardust)
      .sort()
      .map(name => <ComponentDoc key={name} name={name} />)

    return (
      <div style={style.container}>
        <div style={style.menu}>
          <DocsMenu />
        </div>
        <div style={style.main}>
          <Grid className='padded'>
            <Grid.Column>
              {components}
            </Grid.Column>
          </Grid>
        </div>
      </div>
    )
  }
}

render(<DocsApp />, document.getElementById('root'))
