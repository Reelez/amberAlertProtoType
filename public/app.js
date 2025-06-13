window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
  try {
    await OneSignal.init({
      appId: "63ea4924-6ff5-48db-be26-6fec97dc3feb",
      notifyButton: { enable: true}
    });

    // Solicita el permiso automáticamente
    await OneSignal.User.PushSubscription.optIn();

    if (Notification.permission === "granted") {
      console.log("✅ Notificaciones activadas");
    } else {
      console.log("❌ Permiso denegado por el usuario.");
    }

  } catch (err) {
    console.error("❌ No se pudo inicializar OneSignal:", err);
  }
});