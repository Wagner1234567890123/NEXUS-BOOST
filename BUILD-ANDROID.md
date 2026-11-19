# MAX PERFORMANCE 👑 — build do APK Android

Projeto web (Vite + React) empacotado com **Capacitor 7** e um overlay nativo
(`SYSTEM_ALERT_WINDOW`) que mantém a bolinha flutuante visível por cima do Free Fire.

## Estrutura

| Caminho | Função |
| --- | --- |
| `src/components/FloatingBubbleOverlay.tsx` | Bolinha + painel flutuante dentro do app (web e APK) |
| `src/utils/nativeOverlay.ts` | Ponte JS → plugin nativo (`NexusOverlay`) |
| `android/app/src/main/java/com/maxperformance/nexus/OverlayService.java` | Serviço em primeiro plano que desenha a bolinha sobre outros apps |
| `android/app/src/main/java/com/maxperformance/nexus/NexusOverlayPlugin.java` | Plugin Capacitor: permissão, iniciar e parar overlay |
| `android/app/src/main/res/layout/overlay_bubble.xml` | Layout da bolinha e do painel nativo |
| `.github/workflows/android-apk.yml` | Compila `assembleDebug` e publica o APK como artifact |

## Gerar o APK (GitHub Actions, sem instalar Android SDK)

1. Abra o repositório no GitHub → aba **Actions**.
2. Selecione **Build Android APK** → **Run workflow** → branch `max-performance`.
3. Ao terminar (~5–8 min), abra o run e baixe **Artifacts → MAX-PERFORMANCE-debug-apk**.
4. No celular, instale o `.apk` (é preciso permitir "instalar de fontes desconhecidas").

O workflow também roda automaticamente a cada push em `max-performance`.

## Usar a bolinha durante o Free Fire

1. Abra o MAX PERFORMANCE no celular e toque na bolinha → **Ativar bolinha no jogo**.
2. Autorize **Exibir sobre outros apps** (Configurações → Apps → MAX PERFORMANCE → Sobrepor outros apps).
3. Abra o Free Fire: a bolinha "MP" fica por cima do jogo, arrastável.
4. Toque nela para abrir o painel: FPS alvo (60/90/120/144/240), Boneco Lento,
   Modo Economia, Boost e **Fechar Bolinha**.

## Build local (opcional, requer Android SDK + JDK 21)

```bash
npm install
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
# APK em android/app/build/outputs/apk/debug/app-debug.apk
```

## Versão web

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # gera dist/
```
