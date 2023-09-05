const form = document.querySelector('#registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => {
        obj[key] = value;
    });
    await fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.status === 200) {
            window.location.replace('/login');
        } else {
            console.log(res);
        }
    });
});