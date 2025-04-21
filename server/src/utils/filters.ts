
// ****************************
//          BUDGETS
// ****************************
interface BudgetQueryParams {
    month?: string;
    year?: string;
}
export function buildBudgetWhereClause(params: BudgetQueryParams): any {
    const whereClause: any = {};
    const { month, year } = params || {};
    if (month) whereClause.month = month;
    if (year) whereClause.year = year;
    return whereClause;
}

