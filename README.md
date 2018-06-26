# TalkSearch.js

The easiest way to add search to your conference videos.

# What is TalkSearch.js?

TalkSearch.js is a UI helper to help you build a search interface to
display your TalkSearch records. If you don't yet have TalkSearch index for
your conference, you should contact community@algolia.com to get you started.

With TalkSearch, you have access to an Algolia index containing all your videos
data. As with any other Algolia index, you can build your own search UI on top
of it by using our InstantSearch.js library. This library contains a set of
widgets (searchbar, results, filters, pagination, etc) that you can combine and
configure to build your unique UI.

To make things easier, we packaged some default templating into TalkSearch.js.
This will give you a head start and make the initial integration much faster;
you should be able to have a working search in your website in a matter of
minutes.

_Note that you __don't have to__ use TalkSearch.js to use your TalkSearch index. It
makes the initial integration smoother, especially if you don't yet have
experience with InstantSearch.js and Algolia in general, but it is not
mandatory. See the Custom Template section for more information._

# Usage

## Include libraries

You'll need to include both the underlying InstantSearch.js library, and the
TalkSearch.js helper. Both libraries come with some CSS styling, to provide
a default styling.

```html
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.0/dist/instantsearch.min.css">
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/talksearch@0.0.8/dist/talksearch.min.css">

  <script src="https://cdn.jsdelivr.net/npm/instantsearch.js@2.8.0"></script>
  <script src="https://cdn.jsdelivr.net/npm/talksearch@0.0.8/dist/talksearch.min.js"></script>
```

_Note that we also have a [React InstantSearch][1], [Vue InstantSearch][2] and
[Angular InstantSearch][3] if you're using one of those frameworks. The
following example will assume you're using the regular [InstantSearch.js][4],
but the exact same concept will apply to any of those three libraries._

## Initialize the search

You now need to initialize the library with your TalkSearch credentials. Those
should have been handed to you by our TalkSearch team. If you don't have them,
don't hesitate to contact community@algolia.com

```javascript
const search = instantsearch({
  appId: '8J7GPSC0XN',
  apiKey: '{{PROVIDED_BY_ALGOLIA}}',
  indexName: '{{PROVIDED_BY_ALGOLIA}}'
});

search.start();
```

## Add UI widgets

InstantSearch widgets works by using HTML placeholders. You add empty `divs` to
your page, with unique `#id` and you then create widgets bound to those HTML
elements. The library will then replace each `div` with the corresponding
widget, and all widgets will be updated in real time whenever a search is made.

The bare minimum widgets you'll need are a searchbar (to input keywords) and
a place to display the results.

```html
<!-- You can put those two placeholders wherever you want in your page -->
<div id="searchbar"></div>
<div id="results"></div>
```

Once you have the placeholders, you need to add widgets inside of it. Update the
previous JavaScript snippet, and add the widgets between the initial
`instantsearch()` call and the call to `.start()`.

```javascript
const search = instantsearch(options);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbar'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#results',
    templates: {
      item: talksearch.templates.hits.item,
    },
  })
);

search.start();
```

This will give you a working search in your videos.

## Custom template

If you want to use another template than the one provided with TalkSearch.js to
display your results, then you don't really _need_ TalkSearch.js.

TalkSearch.js is just one example of how you could display your results.
Remember that underneath, we're using the `hits` widget of InstantSearch.js. If
you want to tweak the rendering, you can directly use this widget and build any
markup you want.

You don't have to use TalkSearch.js to enjoy the benefits of your TalkSearch
index. Feel free to poke at the source code and see how we built our template,
borrow ideas and code, and roll your own :)

## More widgets and customization

Because TalkSearch.js is only a layer on top of InstantSearch.js, you can use
any widget from InstantSearch.js. Here are a few examples of widgets you could
use.

### Pagination

If you have more than one page of results, you can use the pagination widget to
allow your users to navigate all the pages.

```html
<div id="pagination"></div>

<script>
search.addWidget(
  instantsearch.widgets.pagination({
    container: '#pagination',
    maxPages: 20,
    scrollTo: false,
    showFirstLast: false,
  })
);
```

Check the [pagination widget documentation][5] for more information about the
parameters and styling options.

### Menu

If you have had several conferences along the years, you can use the menu widget
to allow your users to filter by year.

```html
<div id="years"></div>

<script>
// When using the menu widget, you should pass facetingAfterDistinct to true
when instanciating instantsearch, otherwise the count displayed next to each
item of the menu will not be correct
const search = instantsearch({
  ...
  searchParameters: {
    facetingAfterDistinct: true,
  },
});

search.addWidget(
  instantsearch.widgets.menu({
    container: '#years',
    attributeName: 'conference.year',
    sortBy: ['name:desc'],
  })
);
</script>
```

The current available keys for a menu are `conference.year`, `speakers.name`

Check the [menu widget documentation][6] page for complete information about the
available parameters and styling options.

# Why TalkSearch?

As conference organizers, we spend a lot of time and effort making sure our
event will bring value to the audience. We hand-pick speakers with great content
and we love when people share their knowledge to make everyone a better
developer.

That's why we record the talks, so we can then share them with people that could
not attend in the first place. But that's hours and hours of content. Surely
there is a better way to make this content discoverable?

That's why we built TalkSearch. TalkSearch will allow your visitors to browse
all your talks and search for any topic they're interested in. It will even
search into what the speakers are actually _saying_ and jump right to the
matching moment in the video.


[1]: https://community.algolia.com/react-instantsearch/
[2]: https://community.algolia.com/vue-instantsearch/
[3]: https://community.algolia.com/angular-instantsearch/
[4]: https://community.algolia.com/instantsearch.js/
[5]: https://community.algolia.com/instantsearch.js/v2/widgets/pagination.html
[6]: https://community.algolia.com/instantsearch.js/v2/widgets/menu.html
