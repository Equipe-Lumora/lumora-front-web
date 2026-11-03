from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import wikipedia
import uuid

wikipedia.set_lang("pt")
wikipedia.set_user_agent("LumoraEstudAI/1.0 (Estudante)")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

banco_de_dados = []

class Assunto(BaseModel):
    assunto: str

class Flashcard(BaseModel):
    nome: str
    materia: str = "Geral"
    pergunta: str
    resposta: str
    dificuldade: str = "Média"

@app.get("/api/flashcards")
def get_flashcards():
    return banco_de_dados

@app.post("/api/flashcards")
def salvar_flashcard(card: Flashcard):
    novo_card = card.model_dump()
    novo_card["id"] = str(uuid.uuid4())
    banco_de_dados.append(novo_card)
    return novo_card

@app.post("/api/flashcards/ia")
def gerar_flashcard(req: Assunto):
    try:
        termo = req.assunto.strip()
        resumo = wikipedia.summary(termo, sentences=2, auto_suggest=True)
        return {
            "titulo": termo.capitalize(),
            "pergunta": f"O que caracteriza '{termo}'?",
            "resposta": resumo,
            "dificuldade": "Média"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao gerar flashcard.")

@app.post("/api/resumo/ia")
def gerar_resumo(req: Assunto):
    try:
        termo = req.assunto.strip()
        resumo = wikipedia.summary(termo, sentences=4, auto_suggest=True)
        return {
            "titulo": termo.capitalize(),
            "resumo": resumo
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao gerar resumo.")