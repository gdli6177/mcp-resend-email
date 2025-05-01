import { FastMCP } from 'fastmcp';
import { z } from 'zod';
import dotenv from 'dotenv';
import { Resend } from 'resend';

// 处理命令行参数
const args = process.argv.slice(2);
const transportType = args.find(arg => arg.startsWith('--transport='))
  ? args.find(arg => arg.startsWith('--transport=')).split('=')[1]
  : 'stdio';

// 从命令行参数获取 API 密钥
const apiKeyArg = args.find(arg => arg.startsWith('--api-key='));
let apiKey;

if (apiKeyArg) {
  apiKey = apiKeyArg.split('=')[1];
} else {
  // 如果命令行参数中没有 API 密钥，则尝试从环境变量中获取
  dotenv.config();
  apiKey = process.env.RESEND_API_KEY;
}

if (!apiKey) {
  console.error('Error: RESEND_API_KEY is required. Please provide it via command line argument (--api-key=YOUR_KEY) or environment variable.');
  process.exit(1);
}

// Initialize Resend client
const resend = new Resend(apiKey);

// Create MCP server
const server = new FastMCP({
  name: 'mcp-resend-email',
  description: 'MCP server for sending emails via Resend API',
  version: '1.0.0',
});

// Tool to send simple text email
server.addTool({
  name: 'send_email',
  description: 'Sends a simple plain text email',
  parameters: z.object({
    from: z.string().describe('Sender email address'),
    to: z.string().describe('Recipient email address, comma-separated for multiple recipients'),
    cc: z.string().optional().describe('CC email addresses, comma-separated for multiple recipients'),
    bcc: z.string().optional().describe('BCC email addresses, comma-separated for multiple recipients'),
    replyTo: z.string().optional().describe('Reply-to email address'),
    subject: z.string().describe('Email subject'),
    text: z.string().describe('Plain text content of the email')
  }),
  execute: async (params) => {
    try {
      const { from, to, cc, bcc, replyTo, subject, text } = params;
      
      const { data, error } = await resend.emails.send({
        from,
        to,
        cc,
        bcc,
        reply_to: replyTo,
        subject,
        text,
      });
      
      if (error) {
        return `Failed to send email: ${error.message || 'Unknown error'}`;
      }
      
      return `Email sent successfully, ID: ${data.id}`;
    } catch (error) {
      console.error('Failed to send email:', error);
      return `Failed to send email: ${error.message || 'Unknown error'}`;
    }
  }
});

// Tool to send HTML email
server.addTool({
  name: 'send_html_email',
  description: 'Sends an email with HTML content',
  parameters: z.object({
    from: z.string().describe('Sender email address'),
    to: z.string().describe('Recipient email address, comma-separated for multiple recipients'),
    cc: z.string().optional().describe('CC email addresses, comma-separated for multiple recipients'),
    bcc: z.string().optional().describe('BCC email addresses, comma-separated for multiple recipients'),
    replyTo: z.string().optional().describe('Reply-to email address'),
    subject: z.string().describe('Email subject'),
    html: z.string().describe('HTML content of the email')
  }),
  execute: async (params) => {
    try {
      const { from, to, cc, bcc, replyTo, subject, html } = params;
      
      const { data, error } = await resend.emails.send({
        from,
        to,
        cc,
        bcc,
        reply_to: replyTo,
        subject,
        html,
      });
      
      if (error) {
        return `Failed to send HTML email: ${error.message || 'Unknown error'}`;
      }
      
      return `HTML email sent successfully, ID: ${data.id}`;
    } catch (error) {
      console.error('Failed to send HTML email:', error);
      return `Failed to send HTML email: ${error.message || 'Unknown error'}`;
    }
  }
});

// Tool to send email with attachments
server.addTool({
  name: 'send_with_attachment',
  description: 'Sends an email with attachments',
  parameters: z.object({
    from: z.string().describe('Sender email address'),
    to: z.string().describe('Recipient email address, comma-separated for multiple recipients'),
    subject: z.string().describe('Email subject'),
    text: z.string().optional().describe('Plain text content of the email'),
    html: z.string().optional().describe('HTML content of the email'),
    attachments: z.array(
      z.object({
        filename: z.string().describe('Filename of the attachment'),
        content: z.string().describe('Base64 encoded content of the attachment'),
        contentType: z.string().describe('MIME type of the attachment')
      })
    ).describe('List of attachments')
  }),
  execute: async (params) => {
    try {
      const { from, to, subject, text, html, attachments } = params;
      
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        text,
        html,
        attachments: attachments.map(attachment => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType,
        })),
      });
      
      if (error) {
        return `Failed to send email with attachment: ${error.message || 'Unknown error'}`;
      }
      
      return `Email with attachment sent successfully, ID: ${data.id}`;
    } catch (error) {
      console.error('Failed to send email with attachment:', error);
      return `Failed to send email with attachment: ${error.message || 'Unknown error'}`;
    }
  }
});

// Tool to send customer service email using a template
server.addTool({
  name: 'send_customer_service_email',
  description: 'Sends an email using the customer service template',
  parameters: z.object({
    from: z.string().describe('Sender email address'),
    to: z.string().describe('Recipient email address'),
    subject: z.string().describe('Email subject'),
    customerName: z.string().describe('Customer\'s name'),
    ticketId: z.string().describe('Ticket ID'),
    responseText: z.string().describe('Response content'),
    agentName: z.string().describe('Customer service agent\'s name')
  }),
  execute: async (params) => {
    try {
      const { from, to, subject, customerName, ticketId, responseText, agentName } = params;
      
      // Create HTML template
      const html = `
        <div>
          <p>Dear ${customerName},</p>
          <p>Thank you for contacting our customer service. This is in reference to your ticket #${ticketId}.</p>
          <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #ccc;">
            ${responseText}
          </div>
          <p>If you have any further questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br>${agentName}<br>Customer Service</p>
        </div>
      `;
      
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      
      if (error) {
        return `Failed to send customer service email: ${error.message || 'Unknown error'}`;
      }
      
      return `Customer service email sent successfully, ID: ${data.id}`;
    } catch (error) {
      console.error('Failed to send customer service email:', error);
      return `Failed to send customer service email: ${error.message || 'Unknown error'}`;
    }
  }
});

// Tool to send marketing email using a template
server.addTool({
  name: 'send_marketing_email',
  description: 'Sends an email using the marketing email template',
  parameters: z.object({
    from: z.string().describe('Sender email address'),
    to: z.string().describe('Recipient email address'),
    subject: z.string().describe('Email subject'),
    recipientName: z.string().optional().describe('Recipient\'s name'),
    campaignTitle: z.string().describe('Marketing campaign title'),
    campaignContent: z.string().describe('Marketing campaign content'),
    ctaUrl: z.string().describe('Call-to-action URL'),
    ctaText: z.string().describe('Call-to-action text'),
    unsubscribeUrl: z.string().describe('Unsubscribe URL')
  }),
  execute: async (params) => {
    try {
      const { from, to, subject, recipientName, campaignTitle, campaignContent, ctaUrl, ctaText, unsubscribeUrl } = params;
      
      // Create HTML template
      let html = '<div>';
      
      if (recipientName) {
        html += `<p>Dear ${recipientName},</p>`;
      }
      
      html += `
        <h1>${campaignTitle}</h1>
        <div>${campaignContent}</div>
        <a href="${ctaUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 4px; margin-top: 20px; font-weight: bold;">
          ${ctaText}
        </a>
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          If you no longer wish to receive these emails, please 
          <a href="${unsubscribeUrl}">click here to unsubscribe</a>.
        </p>
      </div>
      `;
      
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      
      if (error) {
        return `Failed to send marketing email: ${error.message || 'Unknown error'}`;
      }
      
      return `Marketing email sent successfully, ID: ${data.id}`;
    } catch (error) {
      console.error('Failed to send marketing email:', error);
      return `Failed to send marketing email: ${error.message || 'Unknown error'}`;
    }
  }
});

// Tool to send welcome email
server.addTool({
  name: 'send_welcome_email',
  description: 'Sends an email using the welcome email template',
  parameters: z.object({
    from: z.string().describe('Sender email address'),
    to: z.string().describe('Recipient email address'),
    subject: z.string().describe('Email subject'),
    firstName: z.string().describe('Recipient\'s first name'),
    product: z.string().describe('Product name')
  }),
  execute: async (params) => {
    try {
      const { from, to, subject, firstName, product } = params;
      
      // Create HTML template
      const html = `
        <div>
          <h1>Welcome, ${firstName}!</h1>
          <p>Thank you for using ${product}. We're excited to have you on board.</p>
          <div style="margin-top: 20px;">
            <p>If you have any questions, please feel free to contact our customer service team.</p>
            <p>We hope you enjoy using our service!</p>
          </div>
        </div>
      `;
      
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });
      
      if (error) {
        return `Failed to send welcome email: ${error.message || 'Unknown error'}`;
      }
      
      return `Welcome email sent successfully, ID: ${data.id}`;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return `Failed to send welcome email: ${error.message || 'Unknown error'}`;
    }
  }
});

// Start the server
if (transportType === 'http') {
  server.start({
    transportType: 'sse',
    sse: {
      endpoint: '/sse',
      port: process.env.PORT || 3001
    }
  });
  console.log(`MCP Server started in SSE mode on port ${process.env.PORT || 3001}`);
} else {
  server.start({
    transportType: 'stdio'
  });
  console.log('MCP Server started in STDIO mode');
}

// Export the server instance
export default server;
