window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  try {
    await OneSignal.init({
      appId: "63ea4924-6ff5-48db-be26-6fec97dc3feb",
      notifyButton: { enable: false }
    });

    const boton = document.getElementById("btnActivar");

    boton.addEventListener("click", async () => {
      try {
        // Solicita suscripción
        await OneSignal.User.PushSubscription.optIn();

        // Usa el objeto Notification nativo del navegador
        const permiso = Notification.permission;

        if (permiso === "granted") {
          const userId = await OneSignal.User.getId();
          alert("✅ Notificaciones activadas\nUser ID: " + userId);
        } else {
          alert("❌ Permiso denegado por el usuario.");
        }

      } catch (error) {
        alert("❌ Error al activar notificaciones: " + error.message);
        console.error(error);
      }
    });

  } catch (initError) {
    alert("❌ No se pudo inicializar OneSignal: " + initError.message);
    console.error(initError);
  }
});