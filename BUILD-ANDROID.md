# MAX PERFORMANCE 👑 — APK Android

Projeto web (Vite + React) empacotado com **Capacitor 7** e um overlay nativo
(`SYSTEM_ALERT_WINDOW`) que mantém a bolinha flutuante visível por cima do Free Fire.

## Onde fica o APK

O APK **não é gerado dentro do AppJet** (a plataforma não compila código nativo nem
instala o Android SDK). Ele é gerado pelo GitHub Actions e fica em dois lugares:

| Onde | Nome / caminho |
| --- | --- |
| Release (link direto) | `https://github.com/Wagner1234567890123/NEXUS-BOOST/releases/tag/apk-latest` → arquivo **MAX-PERFORMANCE-v1.0.0-debug.apk** |
| Artifacts do run | Actions → run "Build Android APK" → **MAX-PERFORMANCE-debug-apk** (zip com o mesmo APK) |
| Caminho dentro do build | `android/app/build/outputs/apk/debug/app-debug.apk` |
| Caminho já renomeado | `apk/MAX-PERFORMANCE-v1.0.0-debug.apk` |

## Como gerar (3 cliques)

1. GitHub → aba **Actions**.
2. Workflow **Build Android APK** → **Run workflow** → branch `max-performance` (ou `appjet`) → **Run**.
3. Quando terminar (≈5–10 min), o APK aparece no **Release `apk-latest`** e no artifact do run.

O workflow roda também automaticamente em cada push nas branches `max-performance` e `appjet`.

## Como instalar no celular

1. Baixe `MAX-PERFORMANCE-v1.0.0-debug.apk` no celular.
2. Toque no arquivo e permita **"Instalar de fontes desconhecidas"** para o navegador/gerenciador.
3. Abra o MAX PERFORMANCE.
4. No painel da bolinha, toque em **Bolinha no jogo (APK)** e conceda **"Sobrepor outros apps"**
   (`Configurações → Apps → Acesso especial → Sobrepor outros apps`).
5. Abra o Free Fire: a bolinha continua visível e o painel liga/desliga as funções.

> É um APK **debug** (assinado com chave de debug): instala normalmente, mas não vai para a Play Store.
> Para publicar na loja é preciso gerar um APK/AAB assinado com keystore própria.

## Estrutura nativa

| Caminho | Função |
| --- | --- |
| `src/components/FloatingBubbleOverlay.tsx` | Bolinha + painel flutuante dentro do app (web e APK) |
| `src/utils/nativeOverlay.ts` | Ponte JS → plugin nativo (`NexusOverlay`) |
| `android/app/src/main/java/com/maxperformance/nexus/MainActivity.java` | Registra o plugin |
| `android/app/src/main/java/com/maxperformance/nexus/NexusOverlayPlugin.java` | Métodos `canDrawOverlays`, `requestPermission`, `show`, `hide` |
| `android/app/src/main/java/com/maxperformance/nexus/OverlayService.java` | Serviço em primeiro plano com a bolinha do sistema |
| `android/app/src/main/res/layout/overlay_bubble.xml` | Layout da bolinha + painel nativo |
| `android/app/src/main/AndroidManifest.xml` | `SYSTEM_ALERT_WINDOW`, `FOREGROUND_SERVICE`, serviço `specialUse` |
| `.github/workflows/android-apk.yml` | Compila (`assembleDebug`) e publica o APK |

## Build local (opcional, fora do AppJet)

Em uma máquina com Android SDK + JDK 21:

```bash
npm ci
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
# APK: android/app/build/outputs/apk/debug/app-debug.apk
```
