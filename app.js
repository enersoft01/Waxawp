document.getElementById('subscription-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const plan = document.getElementById('plan').value;

    try {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ plan })
        });
        const result = await response.json();
        document.getElementById('time-left').innerText = `Heures restantes : ${result.hours_left}`;
    } catch (error) {
        console.error('Erreur lors de la souscription', error);
    }
});

document.getElementById('message-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const numbers = document.getElementById('numbers').value.split(',');
    const message = document.getElementById('message').value;
    const files = document.getElementById('file').files;

    const formData = new FormData();
    formData.append('message', message);
    numbers.forEach(number => formData.append('numbers', number.trim()));
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    try {
        const response = await fetch('/api/send_message', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message', error);
    }
});
