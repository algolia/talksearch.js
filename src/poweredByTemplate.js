import bindAll from 'lodash.bindall';
import functions from 'lodash.functions';

const module = {
  render() {
    const url =
      'https://www.algolia.com/?utm_source=poweredby&utm_medium=link&utm_campaign=talksearch';
    return `
    <div class="ats-poweredBy">
      Search by 
      <a href="${url}" class="ats-poweredBy--link" target="_blank">Algolia</a>
    </div>`;
  },
};

export default bindAll(module, functions(module));
