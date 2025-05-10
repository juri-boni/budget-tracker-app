# Changelog

## [1.0.0] - 2025-04-17

### AGGIUNTO

#### Model: `EXPENSES`
- Aggiunta funzione per calcolare la somma totale delle spese, filtrabile per:
    - **CATEGORIA**
    - **MESE**
    - **ANNO**
- La somma viene restituita nel formato:
    - Se nei query params viene fornita uan categoria il model Expenses restituirà la somma delle spese per la data Categoria. 
    - Se non viene fornita alcuna categoria:  
- Aggiunta paginazione dinamica con `offset` leggibile dai query parameters.


#### Model: `BUDGETS`
- Aggiunto controllo sulla creazione di duplicati: non è più possibile creare un budget per la stessa **categoria**, **mese** e **anno**.

#### Model: `CATEGORIES`
- Aggiunto controllo sulla creazione di categorie duplicate:
    - Il confronto è **case-sensitive**, quindi non è possibile creare sia `"home"` che `"Home"` per lo stesso utente.
