function changeRole(userId) {
    fetch(`/api/users/${userId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({role: 'premium'})
    }).then(res => {
        if (res.status === 200) {
            window.location.reload();
        } else {
            console.log(res);
        }
    });
}

function deleteUser(userId) {
    fetch(`/api/users/${userId}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            window.location.reload();
        } else {
            console.log(res);
        }
    });
}