#!/bin/bash
npm install
npm run build
firebase deploy --only hosting --token "$FIREBASE_TOKEN"
