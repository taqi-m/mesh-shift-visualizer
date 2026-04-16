# Mesh Circular Shift Visualizer

A full-stack interactive web application that simulates and visualizes the circular $q$-shift operation on a 2D mesh topology.

## Overview
In parallel computing, a circular $q$-shift is a fundamental permutation operation where node $i$ transfers its data to node $(i + q) \mod p$. On a 2D mesh topology, this is achieved efficiently in two stages:
1. **Stage 1 (Row Shift)**: Each node shifts within its row by $q \mod \sqrt{p}$ positions.
2. **Stage 2 (Column Shift)**: Each node shifts within its column by $\lfloor q / \sqrt{p}\rfloor$ positions.

This application allows you to configure $p$ and $q$, and step through these two stages via animated visualizations.

## Live Deployment
- **URL**: [Insert Live Deployment URL here]

## Setup & Running Locally

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd mesh-shift-visualizer
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Technologies Used
- React (Vite)
- Tailwind CSS
- Vanilla JS (Logic)
