export const countAllFutureStatementsPerCategory = (
  userId: string,
  defaultCategory?: string,
) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `
    SELECT
      COALESCE("category"."color", '#b3b5b4') as color,
      COALESCE("category"."name", '${
        defaultCategory ? defaultCategory : 'Other'
      }') as category,
      CAST(COUNT(*) AS INTEGER) as quantity

    FROM "statement" "statement"

    LEFT JOIN "category" "category" ON "category"."id" = "statement"."categoryId"

    WHERE
      "statement"."finishDate" >= '${year}-${
    month < 10 ? '0' + month : month
  }-01'
    AND "statement"."userId" = '${userId}'
    GROUP BY "category"."name", "category"."color";
  `;
};

export const countAllFutureStatementsAndAmountIfHasInstallmentPlan = (
  userId: string,
) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `
    SELECT
      CAST(COUNT(*) AS INTEGER) as statements,
      COALESCE(CAST(SUM(amount) AS DOUBLE PRECISION), 0) as amount
    FROM
      statement
    WHERE
      "statement"."finishDate" > '${year}-${
    month < 10 ? '0' + month : month
  }-01'
    AND
      "statement"."userId" = '${userId}';             
  `;
};

export const countMonthlyStatementsPerCategory = (
  userId: string,
  year: number,
  month: number,
  defaultCategory?: string,
) => {
  return `
    SELECT
      COALESCE("category"."color", '#b3b5b4') as color,
      COALESCE("category"."name", '${
        defaultCategory ? defaultCategory : 'Other'
      }') AS category,
      COUNT(*) AS quantity
    from
      "statement" "statement"
      LEFT JOIN "category" "category" ON "category"."id" = "statement"."categoryId"
    WHERE
      "statement"."userId" = '${userId}'
      AND "statement"."startDate" - '${year}-${month}-01' <= 0
      AND "statement"."finishDate" - '${year}-${month}-01' >= 0
    GROUP BY
      "category"."name", "category"."color";
  `;
};

export const countTotalMonthAmount = (
  userId: string,
  year: number,
  month: number,
) => {
  return `
    SELECT
    CAST(
      TO_CHAR(
        SUM("statement"."amount" / "statement"."installment"),
        '99999999999999.00'
      ) AS DOUBLE PRECISION
    ) AS amount
    FROM
      statement
    WHERE
      "statement"."startDate" - '${year}-${month}-01' <= 0
    AND
      "statement"."finishDate" - '${year}-${month}-01' >= 0
    AND "statement"."userId" = '${userId}'
  `;
};

export const countTotalStatementsWithInstallmentPlanMonthly = (
  userId: string,
  year: number,
  month: number,
) => {
  return `
    SELECT
      COUNT(installment) as statements,
      SUM(amount) as amount
    FROM
      "statement" "statement"
    WHERE
      "statement"."installment" > 1
    AND
      "statement"."startDate" - '${year}-${month}-01' <= 0
    AND
      "statement"."finishDate" - '${year}-${month}-01' >= 0
    AND
      "statement"."userId" = '${userId}'
  `;
};

export const getStatementsPerMonth = (
  userId: string,
  year: number,
  month: number,
  limit: number,
  skip: number,
) => {
  return `
    SELECT
      statement.id,
      statement.title,
      statement.description,
      TO_CHAR("statement"."finishDate", 'yyyy-mm-dd') AS finishDate,
      TO_CHAR("statement"."startDate", 'yyyy-mm-dd') AS startDate,
      CAST(statement.amount AS DOUBLE PRECISION),
      statement.installment,
      statement."categoryId",
      category.name as "categoryName",
      category.color as "categoryColor"
    FROM
      statement
      LEFT JOIN category ON category.id = "statement"."categoryId" 
      WHERE "statement"."startDate" - '${year}-${month}-01' <= 0
      AND "statement"."finishDate" - '${year}-${month}-01' >= 0
      AND "statement"."userId" = '${userId}'
    LIMIT ${limit} OFFSET ${skip}
  `;
};
