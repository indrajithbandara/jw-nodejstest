import TestUtils from 'react-addons-test-utils';

export function shallowRender(Component){
  const renderer=TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}
