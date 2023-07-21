const prevLink = hasPrevPage ? buildPaginationLink(limit, prevPage, sort, query) : null;
const nextLink = hasNextPage ? buildPaginationLink(limit, nextPage, sort, query) : null;

function buildPaginationLink(limit, page, sort, query) {
  let link = `/products?page=${page}`;

  if (limit) {
    link += `&limit=${limit}`;
  }
  if (sort) {
    link += `&sort=${sort}`;
  }
  if (query) {
    link += `&query=${query}`;
  }

  return link;
}