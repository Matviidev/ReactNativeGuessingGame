# Guess My Number

A small number guessing game built with Expo and React Native. You pick a number between 1 and 99, and your phone tries to guess it while you tell it whether to go higher or lower.

## Features

- Number input with inline validation (1-99)
- Opponent guesses that narrow the range with every hint
- Protection against misleading hints
- Guess log with round numbers
- Game over summary with round count and guess history
- Custom fonts, gradient background and safe area handling

## Tech Stack

- Expo SDK 57 with Expo Router
- React Native 0.86, React 19
- TypeScript
- expo-linear-gradient, expo-font, expo-symbols

## Getting Started

```bash
npm install
npm start
```

Then open the app in Expo Go, an Android emulator (`npm run android`), an iOS simulator (`npm run ios`) or the browser (`npm run web`).

## Scripts

- `npm run lint` - run ESLint
- `npm run typecheck` - run the TypeScript compiler

## License

MIT, see [LICENSE](LICENSE).
