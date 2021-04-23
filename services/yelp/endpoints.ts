import { createEndpoint } from 'apidly';

// [...document.querySelector('table').querySelectorAll('tbody tr > td:nth-child(1)')].map(e => `${e.textContent}=:${e.textContent}`).join('&')
export const businessesSearch = createEndpoint('/v3/businesses/search?term=:term&location=:location&latitude=:latitude&longitude=:longitude&radius=:radius&categories=:categories&locale=:locale&limit=:limit&offset=:offset&sort_by=:sort_by&price=:price&open_now=:open_now&open_at=:open_at&attributes=:attributes');
export const businessesDetails = createEndpoint('/v3/businesses/:id?locale=:locale');
export const businessesReviews = createEndpoint('/v3/businesses/:id/reviews?locale=:locale');

export const categoryDetails = createEndpoint('/v3/categories/:alias?locale=:locale');
