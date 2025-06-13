window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  try {
    await OneSignal.init({
      appId: "63ea4924-6ff5-48db-be26-6fec97dc3feb",
      notifyButton: {
        enable: false
      }
    });

    const boton = document.getElementById("btnActivar");

    boton.addEventListener("click", async () => {
      try {
        // Solicita permiso y activa notificaciones
        await OneSignal.User.PushSubscription.optIn();

        // Espera brevemente para que se cargue el estado
        setTimeout(async () => {
          try {
            const permiso = OneSignal.Notification?.permission;

            if (!permiso) {
              alert("⚠️ No se pudo obtener el estado del permiso. Intenta de nuevo.");
              return;
            }

            if (permiso === "granted") {
              const userId = await OneSignal.User.getId();
              alert("✅ Notificaciones activadas\nUser ID: " + userId);
            } else {
              alert("❌ Permiso denegado por el usuario.");
            }
          } catch (e2) {
            alert("❌ Error al verificar permiso: " + e2.message);
          }
        }, 500); // pequeña espera para asegurar acceso a estado

      } catch (err) {
        alert("❌ Error al activar notificaciones: " + err.message);
        console.error(err);
      }
    });

  } catch (initError) {
    alert("❌ No se pudo inicializar OneSignal: " + initError.message);
    console.error(initError);
  }
});