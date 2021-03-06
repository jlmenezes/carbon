import React from 'react';
import { shallow, mount } from 'enzyme';
import ConfigurableItemRow from './configurable-item-row';
import Checkbox from './../../checkbox';
import Icon from './../../icon';
import { WithDrag, WithDrop } from './../../drag-and-drop';
import DraggableContext from './../../drag-and-drop/draggable-context';
import { rootTagTest } from './../../../utils/helpers/tags/tags-specs';

describe('ConfigurableItemRow', () => {
  let wrapper
  const onChange = () => { }

  describe('classNames', () => {
    beforeEach(() => {
      wrapper = shallow(<ConfigurableItemRow className='my-custom-class-name' rowIndex={ 1 } />);
      wrapper.instance().context = { dragAndDropActiveIndex: 1 }
    })

    it('adds the className to the row', () => {
      expect(wrapper.find('.my-custom-class-name').length).toEqual(1);
    })

    describe('when the dragAndDropActiveIndex is the same as the rowIndex', () =>{
      beforeEach(() => {
        wrapper.setProps({rowIndex: 1})
      });
      it('adds configurable-item-row--dragged to the classes', () => {
        expect(wrapper.find('.configurable-item-row--dragged').length).toEqual(1);
      });
    });

    describe('when the dragAndDropActiveIndex is the same as the rowIndex', () =>{
      beforeEach(() => {
        wrapper.setProps({rowIndex: 2})
      });
      it('does not add configurable-item-row--dragged to the classes', () => {
        expect(wrapper.find('.configurable-item-row--dragged').length).toEqual(0);
      });
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRow data-element='bar' data-role='baz' rowIndex={ 1 } />
        );
      });
      it('includes the correct component, element and role data tags', () => {
        rootTagTest(wrapper, 'configurable-item-row', 'bar', 'baz');
      });
    });
  });

  describe('onChange', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRow onChange={onChange} rowIndex={ 1 } />
      );
    });
    it('passes the onChange prop through to the Checkbox onChange prop', () => {
      expect(wrapper.find(Checkbox).props().onChange).toEqual(onChange);
    });
  });

  describe('enabled', () => {
    describe('when the row is enabled', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRow enabled={true} rowIndex={ 1 } />
        );
      });

      it('sets the Checkbox value to true', () => {
        expect(wrapper.find(Checkbox).props().value).toBeTruthy();
      });
    });

    describe('when the row is not enabled', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRow enabled={false} rowIndex={ 1 } />
        );
      });

      it('sets the Checkbox value to false', () => {
        expect(wrapper.find(Checkbox).props().value).toBeFalsy();
      });
    });
  });

  describe('locked', () => {
    describe('when the row is locked', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRow locked={true} rowIndex={ 1 } />
        );
      });

      it('sets the Checkbox as disabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeTruthy();
      });
    });

    describe('when the row is not locked', () => {
      beforeEach(() => {
        wrapper = shallow(
          <ConfigurableItemRow locked={false} rowIndex={ 1 } />
        );
      });

      it('does not set the Checkbox as disabled', () => {
        expect(wrapper.find(Checkbox).props().disabled).toBeFalsy();
      });
    });
  });

  describe('name', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRow name='Foo' rowIndex={ 1 } />
      );
    });

    it('sets the Checkbox label prop', () => {
      expect(wrapper.find(Checkbox).props().label).toEqual('Foo')
    });
  });

  describe('rowIndex', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRow rowIndex={2} />
      );
    });
    it('sets the index prop on the WithDrop component', () => {
      expect(wrapper.find(WithDrop).props().index).toEqual(2)
    });
  });

  describe('icon', () => {
    beforeEach(() => {
      wrapper = mount(
        <DraggableContext onDrag={() => {}}>
          <ConfigurableItemRow name='Foo' rowIndex={ 1 } />
        </DraggableContext>
      );
    });

    it('renders a drag vertical icon wrapped in WithDrag', () => {
      wrapper.update(); // this is required because the _draggableNode ref is initially undefined.
      const withDrag = wrapper.find(WithDrag);
      const row = wrapper.find(ConfigurableItemRow);
      expect(withDrag.length).toEqual(1);
      expect(withDrag.find(Icon).props().type).toEqual('drag_vertical');
      expect(withDrag.props().draggableNode()).toEqual(row.instance()._listItem)
    });
  });

  describe('list item markup', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ConfigurableItemRow name='Foo' rowIndex={ 1 } />
      );
    });

    it('renders an <li> wrapped in WithDrop', () => {
      const withDrop = wrapper.find(WithDrop);
      expect(withDrop.length).toEqual(1);
      expect(withDrop.find('li').length).toEqual(1);
    });
  });
});
