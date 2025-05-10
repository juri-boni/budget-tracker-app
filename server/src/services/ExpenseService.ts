import { Op, where, literal } from "sequelize";
import sequelize from "../config/dbConfig";
import Expense  from "../models/Expense.model";
import Category from "../models/Category.model";

interface ExpenseFilters {
    month?: string | null;
    year?: string | null;
}

// ****************************
//          EXPENSES
// ****************************

/**
 * Calcola la somma totale delle spese per ogni categoria, opzionalmente filtrando per mese e anno.
 *
 * @param {ExpenseFilters} params - Oggetto contenente i filtri opzionali:
 *  - `month`: (string) mese (1–12) da cui estrarre le spese.
 *  - `year`: (string) anno da cui estrarre le spese.
 *
 * @returns {Promise<{ category_id: number, total_amount: string }[]>}
 * Restituisce un array di oggetti contenenti:
 *  - `category_id`: ID della categoria.
 *  - `total_amount`: somma totale delle spese (come stringa, per compatibilità con il tipo DECIMAL).
 *
 * @example
 * const totals = await calcExpensesPerCategory({ month: "04", year: "2025" });
 * // returns [
 * //   { category_id: 1, total_amount: "200.50" },
 * //   { category_id: 3, total_amount: "89.00" }
 * // ]
 */
export async function calcExpensesPerCategory(params: ExpenseFilters): Promise<object>{
  
    const whereClause: any = {};
    const {month, year} = params || {};
  
    if (month) {
      // Se ci sono già altre condizioni AND, le manteniamo, altrimenti inizializziamo l'array
      whereClause[Op.and] = whereClause[Op.and] || [];
      whereClause[Op.and].push(
        where(
          literal(`EXTRACT(MONTH FROM "date")`), //literal permette di scrivere raw SQL
          parseInt(month)
        )
      );
    }
  
    if (year) {
      whereClause[Op.and] = whereClause[Op.and] || [];
      whereClause[Op.and].push(
        where(
          literal(`EXTRACT(YEAR FROM "date")`),
          parseInt(year)
        )
      );
    }
  
    // Estraiamo solamente la somma delle spese gruppate per Categoria e filtrare in base ai parametri ricevuti
    const summedAmount = await Expense.findAll({
      attributes: [
        [sequelize.col("Category.id"), "category_id"],
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_amount']
      ],
      where: whereClause,
      include: [
        {
          model: Category,
          attributes: [],
        }
      ],
      group: ['Category.id'],
      raw: true, // Restituisce un oggetto appiattito
    });
  
    return summedAmount;
}
