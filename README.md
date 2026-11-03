# Lumora - EstudAI

Plataforma desenvolvida para transformar fotos de estudos em resumos e flashcards de forma rápida e prática.

---

## Integrantes do Grupo
* Laura de Siqueira Silva 
* Raphael Mascarenhas Lima 
* Vitória Valentim de Melo Ferreira  


---

## Tecnologias
* Front-end: React, Vite, Tailwind CSS, React Router
* Back-end: Python, FastAPI, Uvicorn, Biblioteca Wikipedia-API
* Deploy: Vercel

---

## Sobre o Sistema Inteligente
Utilizamos uma API própria em FastAPI integrada com a Wikipédia. Quando o estudante fotografa o material e escolhe um tema, o sistema busca o conteúdo e gera perguntas de flashcards e resumos automáticos para ajudar na fixação da matéria.

---

## Como Executar o Projeto

### 1. Iniciar o Back-end (API)
Abra o terminal na pasta do projeto e execute:
cd backend
pip install fastapi uvicorn wikipedia pydantic
uvicorn main:app --reload

### 2. Iniciar o Front-end (React)
Abra um segundo terminal na raiz do projeto e execute:
npm install
npm run dev

---

## Links Úteis
* Deploy na Vercel (Front-end): 