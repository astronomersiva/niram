import React from 'react';
import renderer from 'react-test-renderer';
import ColorCode from '../ColorCode';

describe('<ColorCode />', () => {
  it('converts rgb array to hex code', () => {
    const tree = renderer
      .create(<ColorCode activeColor={[255, 0, 0]} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('is empty when no rgb array is passed', () => {
    const tree = renderer.create(<ColorCode activeColor={[]} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
