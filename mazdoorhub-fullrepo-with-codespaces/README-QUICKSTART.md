# Quick Start (Dev)

## 0) Start DB & Redis (PostGIS + Redis)
```bash
docker compose -f docker-compose.dev.yml up -d
```

## 1) Backend
```bash
cd backend
cp .env.example .env
npm i
npx prisma migrate deploy
npm run start:dev
```

## 2) Mobile (Expo)
```bash
cd mobile
cp .env.example .env   # set EXPO_PUBLIC_API_BASE=http://localhost:8080 (or your LAN IP)
npm i
npx expo start
```

## 3) Admin (Next.js)
```bash
cd admin
cp .env.example .env   # set NEXT_PUBLIC_API_BASE=http://localhost:8080
npm i
npm run dev
```


---
## GitHub Codespaces Dev

1) Open this repo in **Codespaces** → it launches the Node 20 devcontainer.
2) In a terminal, start DB + Redis:
```bash
docker compose -f docker-compose.dev.yml up -d
```
3) Start **backend**:
```bash
cd backend && cp .env.example .env && npm i && npx prisma migrate deploy && npm run start:dev
```
4) Start **admin** (new terminal):
```bash
cd admin && cp .env.example .env && npm i && npm run dev
```
5) On your phone with **Expo Go**, set `EXPO_PUBLIC_API_BASE` to your Codespaces forwarded URL (e.g., `https://<codespace>-8080.app.github.dev`) in `mobile/.env`, then:
```bash
cd mobile && cp .env.example .env && npm i && npx expo start --tunnel
```


### Maps notes (Expo)
- We added a **MapShortlist** screen using `react-native-maps`.
- On Android Emulator, it works out of the box; on iOS, you may need to add a Google Maps key to `AppDelegate` if you select Google provider.
- For Expo Go, current Expo SDK supports Apple/Google providers without extra native steps; ensure location permission is granted.
