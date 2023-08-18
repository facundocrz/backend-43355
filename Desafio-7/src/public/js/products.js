const logoutButton = document.querySelector('#logoutButton');
logoutButton.addEventListener('click', async () => {
  try {
    await fetch('/api/sessions/logout', {
      method: 'POST',
    }).then((res) => {
      if (res.status === 200) {
        window.location.replace('/login');
      } else {
        console.log(res);
      }
    });
  }
  catch (error) {
    console.log(error);
  }
});

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', event => {
      event.preventDefault();
      const action = form.getAttribute('action');
      const method = form.getAttribute('method');
      fetch(action, { method })
          .then(response => response.json())
          .then(data => {
              console.log(data);
          });
  });
});

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