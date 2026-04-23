# AI Research Workflow Lab

AI Research Workflow Lab is a lightweight learning project for exploring how modern LLM APIs can support practical research and software engineering workflows.

The project is intentionally small in scope. It is not a general AI assistant, a training platform, or a production SaaS system. The goal is to build a clean and usable lab tool that demonstrates prompt design, workflow orchestration, structured output, and experiment comparison in one coherent product.

## Business Scenario

This project is designed for students and individual learners who want to:

- summarize research papers more efficiently
- understand unfamiliar code repositories faster
- compare prompts and model parameters in a controlled way

Instead of treating these as separate demos, the platform uses one shared workflow idea:

`Input -> Task Config -> Prompt Template -> Model Call -> Structured Output -> Run Record -> Result Comparison`

That common workflow is the main design concept of the project.

## Core Features

### 1. Paper Summarizer

The Paper Summarizer helps users turn pasted academic text into structured research notes.

Typical output sections include:

- title
- short summary
- research problem
- methodology
- dataset or subject
- metrics
- main contributions
- limitations
- possible research gap
- keywords

### 2. Repo Explainer

The Repo Explainer helps users understand an existing repository from pasted context such as a repo tree, README content, or selected source files.

Typical output sections include:

- project overview
- main modules
- module responsibilities
- likely entry points
- important files to read first
- suggested reading order
- architecture notes
- technologies used
- possible risks or messy areas

### 3. Prompt Experiment Panel

The Prompt Experiment Panel provides a small environment for testing prompt and parameter variations on the same input.

It is designed to support:

- prompt comparison
- temperature comparison
- side-by-side output review
- run history storage
- manual preference marking

## Functional Design

Version 1 is planned as a small full-stack web application with:

- a React + TypeScript frontend
- a FastAPI backend
- SQLite for local run history
- one model provider by default, with room for future provider expansion

The backend is structured around reusable layers such as:

- schemas for validated input and task configuration
- services for workflow orchestration
- providers for model integration
- database modules for run history
- utilities and shared core configuration

The frontend is designed as a lightweight lab-style interface with dedicated pages for:

- Home
- Paper Summarizer
- Repo Explainer
- Prompt Lab
- History
- Settings

## Design Principles

- lightweight and manageable for one developer
- engineering-first and modular
- learning-oriented and easy to read
- small in version 1, but extensible later

## Current Status

The repository currently includes the initial backend and frontend scaffold:

- FastAPI backend structure under `backend/`
- React + TypeScript + Vite frontend under `frontend/`
- Tailwind CSS for frontend styling
- basic frontend routing and page skeletons for the main modules

## Future Direction

Planned follow-up work includes:

- real backend API endpoints for each task
- shared workflow engine implementation
- model provider abstraction
- local run history persistence
- frontend forms, result rendering, and comparison panels
