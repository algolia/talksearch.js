const search = instantsearch({
  appId: '8J7GPSC0XN',
  apiKey: '{{apiKey}}',
  indexName: '{{indexName}}',
  routing: true,
  searchParameters: {
    hitsPerPage: 21,
    facetingAfterDistinct: true,
  },
});
