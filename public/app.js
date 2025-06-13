window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function(OneSignal) {
  try {
    await OneSignal.init({
      appId: "63ea4924-6ff5-48db-be26-6fec97dc3feb",
    });

    const boton = document.getElementById("btnActivar");
    boton.addEventListener("click", async () => {
      try {
        const permission = await OneSignal.getNotificationPermission();
        if (permission !== "granted") {
          await OneSignal.showSlidedownPrompt();
        }

        const id = await OneSignal.getUserId();
        if (id) {
          alert("✅ Notificaciones activadas correctamente\nUser ID: " + id);
        } else {
          alert("⚠️ Permiso concedido, pero aún no estás registrado como usuario.");
        }
      } catch (e) {
        alert("❌ Error al activar notificaciones: " + e.message);
      }
    });
  } catch (err) {
    alert("❌ No se pudo inicializar OneSignal: " + err.message);
  }
});
