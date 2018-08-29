document.addEventListener(
    'DOMContentLoaded',
    () => {
        document.querySelector('#api-btn').addEventListener('click', e => {
            axios
                .post('http://localhost:3000/api/food', {
                    title: 'Schnitzel',
                    type: 'dinner',
                    calories: 900,
                    cuisine: 'german',
                })
                .then(result => {
                    console.log(result.data)
                })
        })
    },
    false
)
