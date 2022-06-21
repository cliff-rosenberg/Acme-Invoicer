const router = require('express').Router();
const { Invoice, Customer } = require('../../models');
const sequelize = require('../../config/connection');
const nodemailer = require("nodemailer");
let transporter;

(async () => {
    // this line can be used to generate a fresh Ethereal email account
    // const testAccount = await nodemailer.createTestAccount();

    // console.log(testAccount);

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ETHEREAL_EMAIL_USERNAME, // generated ethereal user
            pass: process.env.ETHEREAL_EMAIL_PASSWORD, // generated ethereal password
        },
    });
})();

function createInvoiceEmailTable(invoiceLineItems) {
    let itemRows = '';
    // let quantity = Number(invoiceRow.quantity);
    // let extendedPrice = Number(invoiceRow.extended_price);
    let totalPrice = 0;
    // totalPrice = quantity * extendedPrice;

    invoiceLineItems.forEach((invoiceRow) => {
        itemRows += `
                            <tr>
                                <td>${invoiceRow.invoice_date}</td>
                                <td>${invoiceRow.item_name}</td>
                                <td>${invoiceRow.quantity}</td>
                                <td>${invoiceRow.extended_price}</td>
                                <td>${totalPrice}</td>
                            </tr>`;
    })

    return `
    <table>
        <tr>
            <th>Invoice date</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
        ${itemRows}
    </table>`;
}

router.post("/invoice/:invoiceID", async (req, res) => {
    const invoiceID = parseInt(req.params.invoiceID);
    const invoice = await Invoice.findByPk(invoiceID);

    if(!invoice) {
        return res.sendStatus(404);
    }

    const invoiceLineItems = await sequelize.query(`SELECT * FROM invoice
                    INNER JOIN invoice_details
                    ON invoice.invoice_id = invoice_details.invoice_id
                    INNER JOIN inventory
                    ON invoice_details.inventory_id = inventory.inventory_id
                    INNER JOIN customer
                    ON customer.customer_ID = invoice.customer_ID
                    WHERE invoice.invoice_id = ?`,
        { replacements: [invoiceID], type: sequelize.QueryTypes.SELECT }
    );

    const emailHTMLBody = createInvoiceEmailTable(invoiceLineItems);

    const customerEmail = invoiceLineItems[0].email_address;
    const invoiceDate = invoice.invoice_date;

    await transporter.sendMail({
        from: '"Invoice Reminder" <noreply@acme-invoicer.com>', // sender address
        to: customerEmail, // list of receivers
        subject: `Your invoice from date: ${invoiceDate}`, // Subject line
        html: emailHTMLBody, // html body
      });

    // invoice date, item names, amount owed
    /*
            Invoice date | Item Name | Price
            1/1/2021     | Staples   | $9.99
            12/5/2020    | Coffee    | $19.99

                               Total: $29.98
     */
    const x = 1;

    res.sendStatus(201);
})

module.exports = router;
