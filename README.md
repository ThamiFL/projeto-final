# 🔧🔩 Conciliação de Desenhos Técnicos x Jobbook via IA

> Projeto desenvolvido para o desafio proposto pela **Wilson Sons** 🚢 — Projeto 01: _Conciliação de Planilhas e Desenhos via IA_

---

## 🎯 O Problema

No processo atual, a conferência entre a lista de materiais presente nos **desenhos técnicos** (disciplina de tubulação) e o **jobbook** 📋 — planilha de materiais importados enviada pelo projetista — é feita **manualmente**.

Um responsável precisa:

- 🔍 Abrir cada desenho
- 📐 Localizar a tabela de materiais (BOM)
- ✍️ Cruzar item a item com a planilha

Esse processo é **lento**, **repetitivo** e sujeito a **erro humano**, especialmente em desenhos com dezenas de itens. ⏳❌

---

## 💡 A Solução

Uma aplicação web que automatiza essa conferência de ponta a ponta, usando **Inteligência Artificial** 🤖✨

1. 📤 O usuário faz upload do PDF do desenho técnico e informa o ID do desenho
2. 🖼️ A automação converte a página relevante em imagem
3. 🧠 A IA (Google Gemini) **extrai** a tabela de materiais do desenho — código (PartID), quantidade e descrição de cada item
4. 📊 A automação busca, na planilha do jobbook, todos os itens relacionados a esse desenho
5. ⚖️ Uma segunda etapa de IA **compara** as duas listas usando o PartID como chave
6. ✅❌ O resultado aparece na tela: itens **ok**, **faltando no jobbook**, ou com **quantidade divergente**

---

## 🏗️ Arquitetura

🌐 Site (Lovable)
↓
🪝 Webhook (Make)
↓
📄➡️🖼️ Conversão PDF → Imagem (PDF.co)
↓
🤖 Extração via IA (Gemini)
↓
📊 Busca no Jobbook (Google Sheets)
↓
🤖 Comparação via IA (Gemini)
↓
📬 Resposta ao site (JSON)

| Camada                     | Tecnologia              |
| -------------------------- | ----------------------- |
| 🎨 Front-end               | Lovable                 |
| ⚙️ Automação / Back-end    | Make                    |
| 🧠 Inteligência Artificial | Google Gemini           |
| 📑 Conversão de arquivos   | PDF.co                  |
| 📋 Fonte de dados          | Google Sheets (Jobbook) |

---

## ⭐ Principais Funcionalidades

- 📤 Upload de desenho técnico em PDF direto pelo navegador
- 🤖 Extração automática da lista de materiais via IA — sem digitação manual
- 🔗 Comparação automática com o jobbook por código de material (PartID)
- 🔢 Verificação de quantidade item a item
- 📈 Resumo visual com totais (ok / faltando / divergente)
- 📝 Detalhamento completo de cada item comparado
- ⏳ Feedback visual durante o processamento

---

## 🎯 Escopo

Conforme definido no desafio, esta prova de conceito foi limitada à disciplina de **tubulação** 🔧, utilizando uma amostra de desenhos técnicos reais e uma versão atualizada da planilha do jobbook — respeitando as restrições de confidencialidade do material fornecido. 🔒

---

## 🔗 Link da Aplicação

👉 **[https://draw-analyze.lovable.app]**

---

<p align="center">Feito com 🧡 e bastante persistência 🚀</p>
