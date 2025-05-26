# Projet Maison Intelligent 🏡🤖

## 📱 À propos

**Maison Intelligent** est une application mobile développée en **React Native** permettant de contrôler à distance les dispositifs d'une maison connectée, tels que :

- 🚪 Porte de garage  
- 🛏️ Chambres (lumières, température, etc.)  
- 🔒 Sécurité (caméras, détecteurs)  
- ⚡ Prises et appareils intelligents  

Ce projet combine **mobile**, **backend**, **IoT**, et **intelligence artificielle** pour offrir une solution complète de domotique intelligente.

---

## 🧰 Technologies utilisées

### 🎯 Frontend Mobile
- **React Native** (JavaScript/TypeScript)
- Bibliothèques UI : React Navigation, Redux, Axios, etc.

### 🔧 Backend
- **Spring Boot** (Java)
- REST API sécurisée
- Authentification JWT
- Communication avec Raspberry Pi via HTTP/MQTT

### 🧠 Intelligence Artificielle
- **Machine Learning (ML)** et **Deep Learning (DL)** pour :
  - Prédire les habitudes de l'utilisateur
  - Détecter les anomalies (intrusion, panne)
  - Reconnaissance faciale / vocale (en option)

### 💻 Serveur Domotique
- **Raspberry Pi**
  - Exécution du serveur Spring Boot
  - Gestion locale des commandes
  - Connexion aux modules ESP32 via Wi-Fi/MQTT

### 📡 Objets connectés
- **ESP32**
  - Commandes physiques (lumière, capteurs, moteurs)
  - Communication avec le Raspberry Pi
  - Réception des commandes depuis l'application mobile

---

## 🧪 Fonctionnalités principales

- 📲 Contrôle à distance de chaque pièce
- 📊 Tableau de bord des capteurs (température, humidité, sécurité)
- 🧠 Système intelligent adaptatif
- 🔔 Notifications en temps réel (alarme, ouverture de porte, etc.)
- 🛡️ Authentification sécurisée (JWT)
- 📡 Communication bidirectionnelle Raspberry Pi ↔️ ESP32

