import _ from 'lodash'
import faker from 'faker'
import React from 'react'
import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'

import ListItem from 'src/elements/List/ListItem'
import ListContent from 'src/elements/List/ListContent'

describe('ListItem', () => {
  common.isConformant(ListItem)
  common.rendersChildren(ListItem)

  common.propKeyOnlyToClassName(ListItem, 'active')
  common.propKeyOnlyToClassName(ListItem, 'disabled')

  describe('list', () => {
    it('omitted when rendered as `li`', () => {
      shallow(<ListItem as='li' />)
        .should.not.have.className('item')
    })
  })

  describe('value', () => {
    it('adds data attribute by default', () => {
      const value = faker.hacker.phrase()

      shallow(<ListItem value={value} />)
        .should.have.data('value', value)
    })

    it('adds attribute when rendered as `li`', () => {
      const value = faker.hacker.phrase()

      shallow(<ListItem as='li' value={value} />)
        .should.have.attr('value', value)
    })
  })

  describe('shorthand', () => {
    const baseProps = {
      content: faker.hacker.phrase(),
      description: faker.hacker.phrase(),
      header: faker.hacker.phrase(),
    }

    it('renders without wrapping ListContent', () => {
      const wrapper = shallow(<ListItem {...baseProps} />)

      wrapper.find('ListContent').should.have.lengthOf(0)
    })

    it('renders without wrapping ListContent when content passed as element', () => {
      const spy = sandbox.spy(ListContent, 'create')
      shallow(<ListItem {...baseProps} content={<div />} />)

      spy.should.not.have.been.called()
    })

    it('renders wrapping ListContent when content passed as props', () => {
      const wrapper = shallow(<ListItem content={baseProps} />)

      wrapper.find('ListContent').should.have.lengthOf(1)
    })

    _.each(baseProps, (value, key) => {
      it(`renders wrapping ListContent when icon and ${key} present`, () => {
        const wrapper = shallow(<ListItem {..._.pick(baseProps, key)} icon='user' />)

        wrapper.find('ListIcon').should.have.lengthOf(1)
        wrapper.find('ListContent').should.have.lengthOf(1)
      })

      it(`renders wrapping ListContent when image and ${key} present`, () => {
        const wrapper = shallow(<ListItem {..._.pick(baseProps, key)} image='foo.png' />)

        wrapper.find('Image').should.have.lengthOf(1)
        wrapper.find('ListContent').should.have.lengthOf(1)
      })
    })
  })
})
