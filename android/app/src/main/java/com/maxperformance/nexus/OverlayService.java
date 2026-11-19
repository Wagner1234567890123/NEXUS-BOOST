package com.maxperformance.nexus;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.PixelFormat;
import android.os.Build;
import android.os.IBinder;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.core.app.NotificationCompat;

/**
 * Serviço em primeiro plano que desenha a bolinha flutuante do MAX PERFORMANCE
 * sobre outros aplicativos (Free Fire), usando SYSTEM_ALERT_WINDOW.
 *
 * A bolinha é arrastável; ao tocar abre o painel com as funções do app.
 * O estado das funções é gravado em SharedPreferences (nexus_overlay_state).
 */
public class OverlayService extends Service {

    public static final String PREFS = "nexus_overlay_state";
    public static final String KEY_FPS = "fps";
    public static final String KEY_SLOW_WALK = "slowWalk";
    public static final String KEY_ECONOMY = "economy";
    public static final String KEY_BOOST = "boostActive";

    private static final String CHANNEL_ID = "nexus_overlay";
    private static final int NOTIFICATION_ID = 4141;
    private static volatile boolean running = false;

    private WindowManager windowManager;
    private View overlayView;
    private WindowManager.LayoutParams params;
    private LinearLayout panel;
    private TextView statusLabel;
    private Button fpsButton;
    private Button slowButton;
    private Button economyButton;
    private Button boostButton;

    public static boolean isRunning() {
        return running;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        running = true;
        createNotificationChannel();
        startForeground(NOTIFICATION_ID, buildNotification());
        windowManager = (WindowManager) getSystemService(Context.WINDOW_SERVICE);
        addOverlayView();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return START_STICKY;
    }

    private void addOverlayView() {
        LayoutInflater inflater = LayoutInflater.from(this);
        overlayView = inflater.inflate(R.layout.overlay_bubble, null);

        int type = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O
            ? WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
            : WindowManager.LayoutParams.TYPE_PHONE;

        params = new WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            type,
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                | WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        );
        params.gravity = Gravity.TOP | Gravity.START;
        params.x = 24;
        params.y = 320;

        panel = overlayView.findViewById(R.id.overlay_panel);
        statusLabel = overlayView.findViewById(R.id.overlay_status);
        fpsButton = overlayView.findViewById(R.id.overlay_btn_fps);
        slowButton = overlayView.findViewById(R.id.overlay_btn_slow);
        economyButton = overlayView.findViewById(R.id.overlay_btn_economy);
        boostButton = overlayView.findViewById(R.id.overlay_btn_boost);

        overlayView.findViewById(R.id.overlay_bubble).setOnClickListener(v -> togglePanel());
        overlayView.findViewById(R.id.overlay_btn_close).setOnClickListener(v -> stopSelf());

        fpsButton.setOnClickListener(v -> cycleFps());
        slowButton.setOnClickListener(v -> toggleFlag(KEY_SLOW_WALK, slowButton, "Boneco Lento"));
        economyButton.setOnClickListener(v -> toggleFlag(KEY_ECONOMY, economyButton, "Modo Economia"));
        boostButton.setOnClickListener(v -> toggleFlag(KEY_BOOST, boostButton, "Boost Ativo"));

        setupDrag();
        refreshButtons();
        windowManager.addView(overlayView, params);
    }

    private void setupDrag() {
        View bubble = overlayView.findViewById(R.id.overlay_bubble);
        bubble.setOnTouchListener(new View.OnTouchListener() {
            private int startX;
            private int startY;
            private float touchX;
            private float touchY;
            private boolean moved;

            @Override
            public boolean onTouch(View v, MotionEvent event) {
                switch (event.getActionMasked()) {
                    case MotionEvent.ACTION_DOWN:
                        startX = params.x;
                        startY = params.y;
                        touchX = event.getRawX();
                        touchY = event.getRawY();
                        moved = false;
                        return false;
                    case MotionEvent.ACTION_MOVE:
                        int dx = (int) (event.getRawX() - touchX);
                        int dy = (int) (event.getRawY() - touchY);
                        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
                            moved = true;
                        }
                        params.x = startX + dx;
                        params.y = startY + dy;
                        if (overlayView != null && overlayView.isAttachedToWindow()) {
                            windowManager.updateViewLayout(overlayView, params);
                        }
                        return moved;
                    case MotionEvent.ACTION_UP:
                        return moved;
                    default:
                        return false;
                }
            }
        });
    }

    private void togglePanel() {
        panel.setVisibility(panel.getVisibility() == View.VISIBLE ? View.GONE : View.VISIBLE);
        refreshButtons();
    }

    private SharedPreferences prefs() {
        return getSharedPreferences(PREFS, Context.MODE_PRIVATE);
    }

    private void cycleFps() {
        int current = prefs().getInt(KEY_FPS, 90);
        int next = current == 60 ? 90 : current == 90 ? 120 : current == 120 ? 144 : current == 144 ? 240 : 60;
        prefs().edit().putInt(KEY_FPS, next).apply();
        refreshButtons();
    }

    private void toggleFlag(String key, Button button, String label) {
        boolean next = !prefs().getBoolean(key, false);
        prefs().edit().putBoolean(key, next).apply();
        button.setText(label + ": " + (next ? "ON" : "OFF"));
        refreshButtons();
    }

    private void refreshButtons() {
        if (statusLabel == null) return;
        int fps = prefs().getInt(KEY_FPS, 90);
        boolean slow = prefs().getBoolean(KEY_SLOW_WALK, false);
        boolean economy = prefs().getBoolean(KEY_ECONOMY, false);
        boolean boost = prefs().getBoolean(KEY_BOOST, true);

        statusLabel.setText("FPS alvo " + fps + " · " + (boost ? "Boost ON" : "Boost OFF"));
        fpsButton.setText("FPS Alvo: " + fps);
        slowButton.setText("Boneco Lento: " + (slow ? "ON" : "OFF"));
        economyButton.setText("Modo Economia: " + (economy ? "ON" : "OFF"));
        boostButton.setText("Boost: " + (boost ? "ON" : "OFF"));
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "MAX PERFORMANCE Overlay",
                NotificationManager.IMPORTANCE_LOW
            );
            channel.setDescription("Mantém a bolinha flutuante ativa durante o jogo.");
            NotificationManager manager = getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }

    private Notification buildNotification() {
        Intent openApp = new Intent(this, MainActivity.class);
        openApp.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, openApp, flags);

        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("MAX PERFORMANCE ativo")
            .setContentText("Bolinha flutuante disponível sobre o jogo.")
            .setSmallIcon(android.R.drawable.ic_menu_compass)
            .setOngoing(true)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build();
    }

    @Override
    public void onDestroy() {
        running = false;
        if (overlayView != null) {
            try {
                windowManager.removeView(overlayView);
            } catch (Exception ignored) {
                // View já removida
            }
            overlayView = null;
        }
        super.onDestroy();
    }
}
