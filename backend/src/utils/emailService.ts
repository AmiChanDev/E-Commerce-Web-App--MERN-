import nodemailer from "nodemailer";
import { IOrder } from "../models/Order";

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Format currency
const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

// Format date
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Generate order items HTML
const generateOrderItemsHTML = (order: IOrder): string => {
  return order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0;">
        <strong>${item.name}</strong><br>
        <span style="color: #666; font-size: 14px;">Size: ${item.size}</span>
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: center;">
        ${item.quantity}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        ${formatCurrency(item.price)}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #e0e0e0; text-align: right;">
        <strong>${formatCurrency(item.price * item.quantity)}</strong>
      </td>
    </tr>
  `
    )
    .join("");
};

// Send order confirmation email
export const sendOrderConfirmationEmail = async (
  userEmail: string,
  userName: string,
  order: IOrder
): Promise<void> => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from:
        process.env.EMAIL_FROM || "E-Commerce Store <noreply@ecommerce.com>",
      to: userEmail,
      subject: `Order Confirmation - Order #${order._id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <!-- Header -->
          <div style="background-color: #4CAF50; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Order Confirmed! 🎉</h1>
          </div>
          
          <!-- Content -->
          <div style="background-color: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Hi <strong>${userName}</strong>,</p>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Thank you for your order! We're excited to let you know that your order has been received and is being processed.
            </p>
            
            <!-- Order Details -->
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #4CAF50; margin-top: 0; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Order Details</h2>
              
              <table style="width: 100%; margin-bottom: 15px;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">Order ID:</td>
                  <td style="padding: 8px 0; text-align: right;"><strong>#${
                    order._id
                  }</strong></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Order Date:</td>
                  <td style="padding: 8px 0; text-align: right;"><strong>${formatDate(
                    order.orderDate
                  )}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666;">Status:</td>
                  <td style="padding: 8px 0; text-align: right;">
                    <span style="background-color: #FFF3CD; color: #856404; padding: 4px 12px; border-radius: 4px; font-size: 14px; font-weight: bold;">
                      ${order.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            
            <!-- Order Items -->
            <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #4CAF50; margin-top: 0; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">Order Summary</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f5f5f5;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Product</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #ddd;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #ddd;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${generateOrderItemsHTML(order)}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 20px 12px 12px 12px; text-align: right; font-size: 18px; font-weight: bold;">
                      Total Amount:
                    </td>
                    <td style="padding: 20px 12px 12px 12px; text-align: right; font-size: 20px; font-weight: bold; color: #4CAF50;">
                      ${formatCurrency(order.totalPrice)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <!-- Footer Message -->
            <div style="background-color: #E8F5E9; padding: 20px; border-radius: 8px; border-left: 4px solid #4CAF50;">
              <p style="margin: 0; font-size: 14px; color: #2E7D32;">
                <strong>📦 What's Next?</strong><br>
                We'll send you another email when your order ships. You can track your order status anytime by logging into your account.
              </p>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center;">
              If you have any questions, feel free to contact our support team.
            </p>
            
            <p style="font-size: 14px; color: #666; text-align: center; margin-bottom: 0;">
              Thank you for shopping with us!<br>
              <strong>E-Commerce Team</strong>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
            <p style="margin: 0;">© 2025 E-Commerce Store. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">This is an automated email, please do not reply.</p>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message);
    throw new Error("Failed to send order confirmation email");
  }
};

// Test email configuration
export const testEmailConfiguration = async (): Promise<boolean> => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("✅ Email configuration is valid");
    return true;
  } catch (error: any) {
    console.error("❌ Email configuration error:", error.message);
    return false;
  }
};
