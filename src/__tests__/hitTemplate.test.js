/* eslint-disable import/no-commonjs */
import module from '../hitTemplate.js';
import helper from '../test-helper.js';
const mock = helper.mock(module);

describe('hitTemplate', () => {
  describe('highlight', () => {
    it('should get the highlighted key', () => {
      const input = {
        _highlightResult: {
          foo: {
            value: 'bar',
          },
        },
      };

      const actual = module.highlight(input, 'foo');

      expect(actual).toEqual('bar');
    });
    it('should default to the regular key if no highlight available', () => {
      const input = {
        foo: 'bar',
        _highlightResult: {
          notfoo: {
            value: 'baz',
          },
        },
      };

      const actual = module.highlight(input, 'foo');

      expect(actual).toEqual('bar');
    });
  });

  describe('formatNumber', () => {
    it('876 => 876', () => {
      const input = 876;

      const actual = module.formatNumber(input);

      expect(actual).toEqual('876');
    });

    describe('k number', () => {
      it('1234 => 1.23k', () => {
        const input = 1234;

        const actual = module.formatNumber(input);

        expect(actual).toEqual('1.23k');
      });
      it('41.527 => 41k', () => {
        const input = 41527;

        const actual = module.formatNumber(input);

        expect(actual).toEqual('41k');
      });
      it('741.527 => 741k', () => {
        const input = 741527;

        const actual = module.formatNumber(input);

        expect(actual).toEqual('741k');
      });
    });

    describe('m number', () => {
      it('1.234.567 => 1.23m', () => {
        const input = 1234567;

        const actual = module.formatNumber(input);

        expect(actual).toEqual('1.23m');
      });
    });
  });

  describe('renderViews', () => {
    it('should return an element with 1k views', () => {
      const input = {
        video: {
          popularity: {
            views: 1234,
          },
        },
      };
      mock('formatNumber', '1k');

      const actual = module.renderViews(input);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('getThumbnail', () => {
    it('should return the highest quality thumbnail', () => {
      const input = {
        video: {
          thumbnails: {
            high: {
              url: 'foo',
            },
          },
        },
      };

      const actual = module.getThumbnail(input);

      expect(actual).toEqual('foo');
    });
  });

  describe('renderCaption', () => {
    it('should not render anything if there is no match in the caption', () => {
      const input = {
        _snippetResult: {
          caption: {
            content: {
              matchLevel: 'none',
            },
          },
        },
      };

      const actual = module.renderCaption(input);

      expect(actual).toEqual('');
    });

    it('should not render anything if there is no snippeting', () => {
      const input = {};

      const actual = module.renderCaption(input);

      expect(actual).toEqual('');
    });

    it('should render a caption with the thumbnail as background', () => {
      const input = {
        _snippetResult: {
          caption: {
            content: {
              matchLevel: 'full',
              value: 'my_caption',
            },
          },
        },
      };
      mock('getThumbnail', 'my_url');

      const actual = module.renderCaption(input);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('renderSpeakers', () => {
    it('should return an empty string if no speakers', () => {
      const input = {};

      const actual = module.renderSpeakers(input);

      expect(actual).toEqual('');
    });

    it('should render only one speaker', () => {
      const input = {
        speakers: [{ name: 'foo' }],
      };

      const actual = module.renderSpeakers(input);

      expect(actual).toMatchSnapshot();
    });

    it('should render several speakers', () => {
      const input = {
        speakers: [{ name: 'foo' }, { name: 'bar' }],
      };

      const actual = module.renderSpeakers(input);

      expect(actual).toMatchSnapshot();
    });
  });

  describe('renderConferenceYear', () => {
    it('should render the year in an element', () => {
      const input = { conference: { year: 2018 } };

      const actual = module.renderConferenceYear(input);

      expect(actual).toMatchSnapshot();
    });

    it('should render an empty string if no year found', () => {
      const input = {};

      const actual = module.renderConferenceYear(input);

      expect(actual).toEqual('');
    });
  });

  describe('renderVideoSubtitle', () => {
    it('should only render the speaker if no year', () => {
      mock('renderSpeakers', 'Tim Carry');
      mock('renderConferenceYear', '');

      const actual = module.renderVideoSubtitle();

      expect(actual).toMatchSnapshot();
    });

    it('should only render the year if no speakers', () => {
      mock('renderSpeakers', '');
      mock('renderConferenceYear', '2018');

      const actual = module.renderVideoSubtitle();

      expect(actual).toMatchSnapshot();
    });
    it('should render both speakers and year', () => {
      mock('renderSpeakers', 'Tim Carry');
      mock('renderConferenceYear', '2018');

      const actual = module.renderVideoSubtitle();

      expect(actual).toMatchSnapshot();
    });
  });
});
