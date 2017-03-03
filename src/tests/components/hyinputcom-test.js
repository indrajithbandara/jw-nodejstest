import {shallowRender} from './basereacttest';
import {HyInputCom} from '../../components/featurecoms';

describe('Shallow Rendering', function () {
  it('App\'s title should be Todos', function () {
    const app = shallowRender(HyInputCom);
    expect(app.props.children[0].type).to.equal('h1');
    expect(app.props.children[0].props.children).to.equal('Todos');
  });
});
