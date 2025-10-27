# 🏠 SmartHome IoT – Maison Intelligente Connectée et Distribuée

## 📘 Présentation du projet
### 🎯 Titre du projet
**SmartHome IoT – Système de maison intelligente à architecture distribuée**  
*(ESP32, Raspberry Pi, Spring Boot Microservices, Cloud, Mobile)*

### 🌍 Objectif général
Mettre en place une solution complète de maison intelligente connectée, permettant la **surveillance**, le **contrôle** et l’**automatisation** des équipements domestiques (capteurs et actionneurs) via une **architecture IoT distribuée et modulaire**.

### 💡 Contexte
Grâce aux technologies IoT, il est désormais possible de connecter et contrôler des appareils domestiques à distance. Ce projet vise à combiner des microcontrôleurs (**ESP32**, **Arduino**) avec une **passerelle locale** (**Raspberry Pi**) et un **backend Spring Boot microservices** hébergé sur le cloud, pour créer un système **évolutif, robuste et sécurisé**.

---

## 🎯 Objectifs spécifiques
- Développer un réseau de dispositifs IoT (ESP32, Arduino, caméras, capteurs, etc.).
- Concevoir une passerelle locale (Raspberry Pi) assurant la communication entre le réseau local et le cloud.
- Créer un backend cloud basé sur Spring Boot (architecture microservices).
- Gérer les données, utilisateurs et règles automatiques via Firebase ou AWS.
- Développer une application mobile pour le contrôle à distance et le monitoring.
- Garantir la sécurité, la fiabilité et la scalabilité du système.

---

## 🧠 Architecture du système
+---------------------------------------------------------------+
| Application Mobile |
| (Android / iOS - surveillance, contrôle, notifications) |
+------------------------------↑--------------------------------+
│ (API REST / HTTPS)
+-----+-------------------------+
| Cloud / Backend Spring Boot |
| (microservices par pièce) |
+-----+-------------------------+
│ (MQTT / REST / WebSocket)
+-----------+-----------+
| Passerelle Locale (Raspberry Pi) |
| (Python – Broker MQTT + API) |
+-----------+-----------+
│ (Wi-Fi)
+----------------------+----------------------+
| Réseau local de dispositifs IoT |
| (ESP32, Arduino, caméras, capteurs, relais) |
+----------------------------------------------+

---

## 🔧 Composants du système

### 🔹 1. Dispositifs IoT (ESP32 / Arduino)
- **Capteurs** : DHT22 (température/humidité), MQ-2 (gaz/fumée), PIR (mouvement), LDR (luminosité), capteurs de sol, capteurs de porte.
- **Actionneurs** : relais (lampes, moteurs), buzzer, servo-moteur, ventilateur.
- **Caméra** : ESP32-CAM ou IP camera.
- **Communication** : Wi-Fi / MQTT vers Raspberry Pi.
- **Langages** : MicroPython / Arduino C++.

### 🔹 2. Passerelle IoT – Raspberry Pi
- Fait le pont entre les ESP32 et le Cloud.
- Exécute un **broker MQTT (Mosquitto)**.
- Script Python pour :
  - Recevoir les données des capteurs.
  - Publier les mesures vers le backend Spring Boot.
  - Transmettre les ordres du cloud vers les ESP32.
- Peut stocker temporairement les données (cache local).
- Connecté en Wi-Fi et Internet en permanence.

### 🔹 3. Backend – Spring Boot (microservices)
Hébergé sur le Cloud (**AWS**, **Firebase**, ou **Google Cloud**).  
Microservices :
- `garage-service` → gestion du garage  
- `jardin-service` → gestion du jardin / arrosage automatique  
- `salon-service` → contrôle du salon  
- `cuisine-service` → détection de gaz et incendie  
- `securite-service` → caméras et alarmes  
- `user-service` → gestion des utilisateurs et authentification (JWT)  
- `data-service` → stockage et consultation des mesures  
- `rule-engine-service` → automatisations intelligentes  
- `alert-service` → alertes et notifications  

**Communication inter-services :**
- REST API / RabbitMQ / Kafka  
- API Gateway : *Spring Cloud Gateway*  
- Service Discovery : *Eureka Server*  

### 🔹 4. Cloud / Base de données
- **Firebase Firestore**, **AWS DynamoDB**, ou **MySQL Cloud**
- Synchronisation en temps réel + sauvegarde historique
- Authentification : **Firebase Auth**

### 🔹 5. Application Mobile
- Développement : Android (Java / Kotlin) ou React Native
- **Fonctionnalités :**
  - Affichage en temps réel des mesures
  - Commande à distance (ON/OFF, alarmes, éclairage, portes)
  - Notifications push (Firebase Cloud Messaging)
  - Interface moderne avec dashboard et graphiques

---

---

## 📊 Intelligence Artificielle et Analyse Prédictive

L’IA joue un rôle clé dans l’évolution du système **SmartHome IoT**, en permettant au système de passer du contrôle réactif au contrôle prédictif.

### 🔹 Fonctions IA intégrées
- **Détection d’anomalies :** identification automatique de comportements anormaux (ex : consommation électrique inhabituelle, température incohérente).
- **Prédiction des événements :** anticipation des besoins (ex : allumer le chauffage avant que la température baisse).
- **Optimisation énergétique :** apprentissage des habitudes de l’utilisateur pour réduire la consommation.
- **Analyse comportementale :** adaptation des règles automatiques selon les routines détectées.

### 🔹 Technologies utilisées
- **TensorFlow / Scikit-learn / PyTorch** pour les modèles ML.  
- **Python ou Java MLlib** pour l’entraînement et l’inférence.  
- Intégration via le microservice `ai-service` (REST API).  
- Données d’entraînement récupérées depuis le microservice `data-service`.

### 🔹 Exemple d’usage
> “Le modèle IA prédit une hausse de température anormale dans la cuisine → le système active automatiquement la ventilation avant l’alerte incendie.”


## ⚙️ Fonctionnalités principales

### 🔸 Surveillance
- Lecture en temps réel des mesures : température, humidité, luminosité, etc.
- Suivi vidéo (flux caméra)

### 🔸 Contrôle
- Commande des appareils via application mobile
- Automatisation selon des règles prédéfinies

### 🔸 Automatisation – Exemples
- “Si humidité du sol < 30 %, activer l’arrosage.”
- “Si fumée détectée, déclencher alarme et notification.”
- “Si mouvement détecté la nuit, allumer la lumière du garage.”

### 🔸 Notifications
- Alertes : gaz, feu, intrusion, température anormale
- Historique des alertes

### 🔸 Gestion des utilisateurs
- Rôles : **Administrateur / Utilisateur**
- Sécurisation par **JWT** et **Firebase Auth**

---

## 🧩 Exigences techniques

| Catégorie | Exigence |
|------------|-----------|
| **Matériel** | ESP32, Arduino UNO, Raspberry Pi 4, capteurs divers |
| **Langages** | MicroPython / C++ (IoT), Python (Gateway), Java (Spring Boot), Kotlin / React Native (mobile) |
| **Protocole** | MQTT (local), HTTP/HTTPS (cloud) |
| **Cloud** | Firebase / AWS |
| **Architecture logicielle** | Microservices Spring Boot + Gateway + Discovery |
| **Sécurité** | HTTPS, JWT, chiffrement MQTT |
| **Temps réel** | MQTT + WebSocket |
| **Base de données** | Firestore / MySQL / MongoDB |
| **Mobile** | Interface ergonomique, notifications, contrôle en temps réel |
| **Performance** | Latence < 2 s, disponibilité > 95 % |

---

## ⚠️ Contraintes
- Connexion Internet stable requise  
- Raspberry Pi doit rester alimenté et connecté  
- Gestion de la synchronisation en cas de coupure réseau  
- Sécurité du réseau domestique et du cloud  
- Optimisation énergétique des ESP32

---

## 📦 Livrables
- Schéma d’architecture complet (matériel + logiciel)  
- Code source :
  - Firmware ESP32 / Arduino  
  - Passerelle Python (Raspberry Pi)  
  - Backend Spring Boot (microservices)  
  - Application mobile  
- Documentation technique  
- Rapport final et démonstration fonctionnelle

---

## ✅ Tests et validation

| Type de test | Description | Résultat attendu |
|---------------|--------------|------------------|
| Test MQTT | Communication ESP32 ↔ Raspberry Pi | 100 % messages reçus |
| Test Cloud | Synchronisation Raspberry ↔ Spring Boot | Données cohérentes |
| Test microservices | Communication inter-services | Réponses valides |
| Test mobile | Commande des équipements | Actionneur réactif |
| Test alerte | Détection fumée / intrusion | Notification instantanée |
| Test réseau | Reconnexion automatique | Stabilité confirmée |

---

## 🚀 Évolutions possibles
- Dashboard web (Angular / React)
- IA / Machine Learning pour la détection d’anomalies
- Commande vocale (Google Assistant / Alexa)
- Analyse énergétique
- Support multi-maisons

---

## 🧾 Conclusion
Le projet **SmartHome IoT** repose sur :
- des **devices intelligents** (ESP32 / Arduino)  
- une **passerelle locale Raspberry Pi**  
- un **backend cloud microservices Spring Boot**  
- et une **application mobile conviviale**

Cette approche garantit un système **sécurisé**, **évolutif** et **intelligent**, idéal pour des applications **domestiques** ou **industrielles**.

---

📅 **Version :** 1.0  
👨‍💻 **Auteur :** [Mohamed Amin Gana]  


