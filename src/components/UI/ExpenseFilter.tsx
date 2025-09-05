import { useTranslation } from "react-i18next";

type ChartOptions = {
    start: Date;
    end: Date;
    category?: string;
    type?: string;
};

type ExpenseFilterProps = {
    chartOptions: ChartOptions;
    setChartOptions: React.Dispatch<React.SetStateAction<ChartOptions>>;
    categoryList: any[];
};

export default function ExpenseFilter({
    chartOptions,
    setChartOptions,
    categoryList
}: ExpenseFilterProps) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-row text-lg w-fit gap-10 rounded-lg border border-gray-300 px-7 py-5 justify-center items-center m-3 shadow">
            <div className="flex flex-col gap-2 w-1/2">
                <div className="w-full flex flex-col gap-1">
                    <p className="font-medium text-[16px]">{t("start_date", "Start date:")}</p>
                    <input
                        className="border border-gray-300 text-sm p-2 rounded-[5px]"
                        type="date"
                        name="startExpenseDate"
                        id="startExpenseDate"
                        defaultValue={new Date(
                            new Date().setFullYear(new Date().getFullYear(), 0, 1)
                        )
                            .toISOString()
                            .split("T")[0]}
                        onChange={(e) =>
                            setChartOptions({
                                ...chartOptions,
                                start: new Date(e.target.value),
                            })
                        }
                    />
                </div>
                <div className="w-full flex flex-col gap-1">
                    <p className="font-medium text-[16px]">{t("end_date", "End date:")}</p>
                    <input
                        className="border border-gray-300 text-sm p-2 rounded-[5px]"
                        type="date"
                        name="endExpenseDate"
                        id="endExpenseDate"
                        defaultValue={new Date(
                            new Date().setFullYear(new Date().getFullYear() + 1, 0, 1)
                        )
                            .toISOString()
                            .split("T")[0]}
                        onChange={(e) =>
                            setChartOptions({
                                ...chartOptions,
                                end: new Date(e.target.value),
                            })
                        }
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2 w-1/2">
                <div className="w-full flex flex-col gap-1">
                    <p className="font-medium text-[16px]">{t("category", "Category:")}</p>
                    <select
                        name="categoryId"
                        className="rounded border border-gray-300 text-sm p-2"
                        onChange={(e) =>
                            setChartOptions({
                                ...chartOptions,
                                category: e.target.value,
                            })
                        }
                    >
                        <option value="">{t("any", "Any")}</option>
                        {Array.isArray(categoryList) &&
                            categoryList.map((cat) => (
                                <option key={cat.name} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <p className="font-medium text-[16px]">{t("expense_type", "Expense type:")}</p>
                    <select
                        name="expenseType"
                        className="rounded border border-gray-300 text-sm p-2"
                        onChange={(e) =>
                            setChartOptions({
                                ...chartOptions,
                                type: e.target.value,
                            })
                        }
                    >
                        <option value="">{t("any", "Any")}</option>
                        <option value="one-time">{t("one_time", "One-time")}</option>
                        <option value="recurring">{t("recurring", "Recurring")}</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
