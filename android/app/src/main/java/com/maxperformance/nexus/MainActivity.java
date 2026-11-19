package com.maxperformance.nexus;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

/**
 * Activity principal do MAX PERFORMANCE.
 * Registra o plugin NexusOverlay, que controla a bolinha flutuante nativa
 * (SYSTEM_ALERT_WINDOW) que permanece visível durante o Free Fire.
 */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(NexusOverlayPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
