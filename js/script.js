const API_URL = "https://66d719d9006bfbe2e64fd766.mockapi.io/incomeexpence";

async function fetchdisplay(element, filter = "All") {
    try {
        element.innerHTML = "";
        const res = await fetch(API_URL);
        const dataDisplay = await res.json();

        const filteredData = filter === "All" ? dataDisplay : dataDisplay.filter(dplay => dplay.typeVal === filter);


        filteredData.forEach((dplay) => {

            const tr = element.appendChild(document.createElement("tr"));
            tr.className = `tr ${dplay.typeVal === "Income" ? "border-b-2 border-green-400 bg-green-50" :
                dplay.typeVal === "Essential Expense" ? "border-b-2 border-orange-400 bg-orange-50" :
                    dplay.typeVal == "Non Essential Expense" ? "border-b-2 border-red-400 bg-red-50" : "border-b-2 border-gray-400 bg-gray-50"}`;

            const td1 = tr.appendChild(document.createElement("td"));
            td1.textContent = dplay.id;
            td1.className = "td";
            const td2 = tr.appendChild(document.createElement("td"));
            td2.textContent = dplay.incomeExp;
            td2.className = "td";
            td2.id = "incomeExp";
            const td3 = tr.appendChild(document.createElement("td"));
            td3.textContent = dplay.amountVal;
            td3.className = "td";
            td3.id = "amountVal";
            const td4 = tr.appendChild(document.createElement("td"));
            td4.textContent = dplay.typeVal;
            td4.className = "td";
            td4.id = "typeVal";
            const td5 = tr.appendChild(document.createElement("td"));
            td5.className = "td flex gap-3";
            const btn = td5.appendChild(document.createElement("button"));
            const icon = btn.appendChild(document.createElement("i"));
            icon.className = "bi bi-trash text-red-700 text-xl";
            btn.addEventListener("click", async () => {
                const deleteUrl = `${API_URL}/${dplay.id}`;
                try {
                    await fetch(deleteUrl, { method: "DELETE" });
                    fetchdisplay(document.getElementById("tablebody"));
                    await updateTotals();
                } catch (err) {
                    console.error("Error deleting data", err);
                }
            });

            const edit = td5.appendChild(document.createElement("button"));
            const editIcon = edit.appendChild(document.createElement("i"));
            editIcon.className = "bi bi-pencil-square text-green-700 text-xl";



            edit.addEventListener("click", async () => {
                td2.innerHTML = "";
                td3.innerHTML = "";

                const tab2 = document.createElement("input");
                tab2.type = "text";
                tab2.value = dplay.incomeExp;
                tab2.className = "edit-input";
                tab2.innerHTML = "";
                td2.appendChild(tab2);

                const tab3 = document.createElement("input");
                tab3.type = "number";
                tab3.value = dplay.amountVal;
                tab3.className = "edit-input";
                tab3.innerHTML = "";
                td3.appendChild(tab3);

                const selectInput = document.createElement("select");
                selectInput.className = "edit-input";

                const incomeOption = document.createElement("option");
                incomeOption.value = "Income";
                incomeOption.textContent = "Income";
                const essentialExpenseOption = document.createElement("option");
                essentialExpenseOption.value = "Essential Expense";
                essentialExpenseOption.textContent = "Essential Expense";
                const nonEssentialExpenseOption = document.createElement("option");
                nonEssentialExpenseOption.value = "Non Essential Expense";
                nonEssentialExpenseOption.textContent = "Non Essential Expense";

                selectInput.appendChild(incomeOption);
                selectInput.appendChild(essentialExpenseOption);
                selectInput.appendChild(nonEssentialExpenseOption);
                selectInput.value = dplay.typeVal;
                td4.innerHTML = "";
                td4.appendChild(selectInput);

                editIcon.className = "bi bi-check-lg text-green-700 text-xl";

                edit.removeEventListener("click", this);
                edit.addEventListener("click", async () => {

                    const updatedData = {
                        incomeExp: tab2.value,
                        amountVal: tab3.value,
                        typeVal: selectInput.value
                    };


                    try {

                        const editurl = `${API_URL}/${dplay.id}`;
                        const response = await fetch(editurl, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(updatedData),
                        });

                        console.log("up", updatedData)

                        fetchdisplay(document.getElementById("tablebody"));
                        await updateTotals();
                    } catch (err) {
                        console.error("Error updating data", err);
                    }
                });
            });
        });
        await updateTotals();

    } catch (err) {
        console.error("Error fetching data", err);
        return;
    }
}

async function updateTotals() {
    let totalIncome = 0;
    let totalExpenses = 0;

    const res = await fetch(API_URL);
    const data = await res.json();

    data.forEach((item) => {
        if (item.typeVal === "Income") {
            totalIncome += Number(item.amountVal);
        } else if (item.typeVal === "Essential Expense" || item.typeVal === "Non Essential Expense") {
            totalExpenses += Number(item.amountVal);
        }
    });

    document.querySelector(".income-total").textContent = '₹ ' + totalIncome;
    document.querySelector(".expenses-total").textContent = '₹ ' + totalExpenses;
    document.querySelector(".overall-total").textContent = '₹ ' + (totalIncome - totalExpenses);
}



window.onload = async function (incomeTot) {

    const mainDiv = document.createElement("div");
    mainDiv.className = "mainDiv";
    document.body.appendChild(mainDiv);

    const title = mainDiv.appendChild(document.createElement("h2"));
    title.textContent = "Income and Expenses Calculator";
    title.className = "title";

    const display = mainDiv.appendChild(document.createElement("div"));
    display.className = "display";

    const incomeDiv = display.appendChild(document.createElement("div"));
    incomeDiv.className = "inex-Div";
    const incomePara = incomeDiv.appendChild(document.createElement("p"));
    incomePara.textContent = `Income : `;
    incomePara.className = "inexPara";
    const span1 = incomePara.appendChild(document.createElement("span"));
    span1.className = "spanPara text-green-500 income-total";

    const expensesDiv = display.appendChild(document.createElement("div"));
    expensesDiv.className = "inex-Div";
    const expensesPara = expensesDiv.appendChild(document.createElement("p"));
    expensesPara.textContent = `Expenses : `
    expensesPara.className = "inexPara";

    const span2 = expensesPara.appendChild(document.createElement("span"));
    span2.className = "spanPara text-red-500 expenses-total";



    const Total = display.appendChild(document.createElement("div"));
    Total.className = "inex-Div";
    const totalPara = Total.appendChild(document.createElement("p"));
    totalPara.textContent = `Total : `;
    totalPara.className = "inexPara";

    const span3 = totalPara.appendChild(document.createElement("span"));
    span3.className = "spanPara text-blue-500 overall-total";

    const formDiv = mainDiv.appendChild(document.createElement("div"));
    formDiv.className = "form-div ";

    const formPara = formDiv.appendChild(document.createElement("p"));
    formPara.textContent = "Give me your monthly income and Expenses."
    formPara.className = "text-2xl font-semibold pt-10 pb-3 text-center";


    const formcontrole = formDiv.appendChild(document.createElement("div"));
    formcontrole.className = "form-control";

    const form = formcontrole.appendChild(document.createElement("form"));
    form.className = "form";

    const incomeExpenses = form.appendChild(document.createElement("input"));
    incomeExpenses.type = "text";
    incomeExpenses.name = "incomeorExp";
    incomeExpenses.required = true;
    incomeExpenses.className = "dataInput";
    incomeExpenses.placeholder = "Income or Expenses Name";

    const amount = form.appendChild(document.createElement("input"));
    amount.type = "number";
    amount.name = "amount";
    amount.required = true;
    amount.className = "dataInput";
    amount.placeholder = "Amount";

    const dropDown = form.appendChild(document.createElement("select"));
    dropDown.className = "dataInput";

    const defaultOption = dropDown.appendChild(document.createElement("option"));
    defaultOption.value = "--Select--";
    defaultOption.textContent = "--Select--";
    defaultOption.disabled = true;

    const incomeOption = dropDown.appendChild(document.createElement("option"));
    incomeOption.value = "Income";
    incomeOption.textContent = "Income";

    const essentialExpenseOption = dropDown.appendChild(document.createElement("option"));
    essentialExpenseOption.value = "Essential Expense";
    essentialExpenseOption.textContent = "Essential Expense";

    const nonEssentialExpenseOption = dropDown.appendChild(document.createElement("option"));
    nonEssentialExpenseOption.value = "Non Essential Expense";
    nonEssentialExpenseOption.textContent = "Non Essential Expense";

    const addCalculate = formDiv.appendChild(document.createElement("div"));
    addCalculate.className = "addCalculate";


    const calculate = addCalculate.appendChild(document.createElement("button"));
    calculate.textContent = "Add Row";
    calculate.className = "add-calculate-button";
    calculate.addEventListener("click", async function postData() {

        if (incomeExpenses.value === "" || amount.value == "" || dropDown.value === "") {
            alert("Please fill all fields");
            return;
        }

        const fullData = {
            incomeExp: incomeExpenses.value,
            amountVal: amount.value,
            typeVal: dropDown.value,
        }

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fullData)
            })
            const data = await res.json();
            fetchdisplay(document.getElementById("tablebody"));
            await updateTotals();
        } catch (err) {
            console.error('Error:', err);
        } finally {
            incomeExpenses.value = "";
            amount.value = "";
            dropDown.value = "";
        }

    });

    const section2 = document.createElement("div");
    section2.className = "section2";
    section2.id = "section2";
    document.body.appendChild(section2);



    const filter = section2.appendChild(document.createElement("div"));
    filter.className = "filter";

    const div1 = filter.appendChild(document.createElement("div"));
    div1.className = "div-flex";
    const radio1 = div1.appendChild(document.createElement("input"));
    radio1.type = "radio";
    radio1.name = "radius";
    radio1.value = "All";
    radio1.checked = true;
    radio1.className = "radio";
    const label1 = div1.appendChild(document.createElement("label"));
    label1.textContent = "All";
    label1.className = "label";
    radio1.addEventListener("click", async () => {
        fetchdisplay(document.getElementById("tablebody"), "All");
    });

    const div2 = filter.appendChild(document.createElement("div"));
    div2.className = "div-flex";
    const radio2 = div2.appendChild(document.createElement("input"));
    radio2.type = "radio";
    radio2.name = "radius";
    radio2.value = "Income";
    radio2.className = "radio";
    const label2 = div2.appendChild(document.createElement("div"));
    label2.textContent = "Income";
    label2.className = "label";
    radio2.addEventListener("click", async () => {
        fetchdisplay(document.getElementById("tablebody"), "Income");
    });

    const div3 = filter.appendChild(document.createElement("div"));
    div3.className = "div-flex";
    const radio3 = div3.appendChild(document.createElement("input"));
    radio3.type = "radio";
    radio3.name = "radius";
    radio3.value = "Non Essential Expense";
    radio3.className = "radio";
    const label3 = div3.appendChild(document.createElement("label"));
    label3.textContent = "Non Essential Expense";
    label3.className = "label";
    radio3.addEventListener("click", async () => {
        fetchdisplay(document.getElementById("tablebody"), "Non Essential Expense");
    });

    const div4 = filter.appendChild(document.createElement("div"));
    div4.className = "div-flex";
    const radio4 = div4.appendChild(document.createElement("input"));
    radio4.type = "radio";
    radio4.name = "radius";
    radio4.value = "Essential Expense";
    radio4.className = "radio";
    const label4 = div4.appendChild(document.createElement("label"));
    label4.textContent = "Non Essential Expense";
    label4.className = "label";
    radio4.addEventListener("click", async () => {
        fetchdisplay(document.getElementById("tablebody"), "Essential Expense");
    });


    const dtiTable = section2.appendChild(document.createElement("div"));
    dtiTable.className = "dti-table";

    const table = dtiTable.appendChild(document.createElement("table"));
    table.className = "table";

    const thead = table.appendChild(document.createElement("thead"));
    const tr1 = thead.appendChild(document.createElement("tr"));
    tr1.className = "tr ";
    const th1 = tr1.appendChild(document.createElement("th"));
    th1.textContent = "S.No";
    th1.className = "th";
    const th2 = tr1.appendChild(document.createElement("th"));
    th2.textContent = "Income or Expenses";
    th2.className = "th";
    const th3 = tr1.appendChild(document.createElement("th"));
    th3.textContent = "Amount";
    th3.className = "th";
    const th4 = tr1.appendChild(document.createElement("th"));
    th4.textContent = "Type";
    th4.className = "th";
    const th5 = tr1.appendChild(document.createElement("th"));
    th5.textContent = "Action";
    th5.className = "th";

    const tbody = table.appendChild(document.createElement("tbody"));
    tbody.id = "tablebody";

    fetchdisplay(tbody);

}