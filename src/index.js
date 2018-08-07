/* eslint-disable import/no-commonjs */
import hitTemplate from './hitTemplate';
import poweredByTemplate from './poweredByTemplate';

const TalkSearch = {
  hit: hitTemplate.render,
  poweredBy: {
    template: poweredByTemplate.render(),
  },
};

export default TalkSearch;
