# MCP Resend Email

This is an MCP Server based on the Resend API, providing convenient email sending functionality. It can be used for customer service replies, marketing emails, notification emails, and other scenarios.

## Features

- Send plain text emails
- Send HTML format emails
- Send emails with attachments
- Send customer service reply emails using predefined templates
- Send marketing emails using predefined templates
- Send welcome emails using predefined templates

## Installation

```bash
npm install
```

## Configuration

### Using Environment Variables

Create a `.env` file and set the following environment variables:

```
RESEND_API_KEY=your_resend_api_key
PORT=3001
```

### Using Command Line Arguments

You can also pass the API key via command line arguments, which is especially useful in stdio mode:

```bash
node src/server.js --api-key=your_resend_api_key
```

## Usage

### Start the Server (stdio mode)

```bash
npm start
```

Or pass the API key via command line:

```bash
npm run start:with-key
```

Remember to replace `YOUR_API_KEY` with your actual API key.

Development mode:

```bash
npm run dev
```

### Start the Server (SSE mode)

```bash
npm run start:http
```

Or in development mode:

```bash
npm run dev:http
```

### Custom Port

```bash
PORT=8080 npm run start:http
```

## Using with npx

You can start the MCP Server directly with npx, no global installation required:

```bash
npx mcp-resend-email --api-key=your_resend_api_key
```

If you want to use it in Windsurf or mcp client configuration, you can write:

```json
{
  "name": "mcp-resend-email",
  "transport": "stdio",
  "command": "npx",
  "args": ["mcp-resend-email", "--api-key=your_resend_api_key"],
  "cwd": "."
}
```

This will always use the latest published version without local installation.

## Configure Windsurf to Connect to the MCP Server

### stdio mode

Add to Windsurf configuration:

```json
{
  "mcpServers": [
    {
      "name": "mcp-resend-email",
      "transport": "stdio",
      "command": "npx",
      "args": ["mcp-resend-email", "--api-key=your_resend_api_key"],
      "cwd": "."
    }
  ]
}
```

### SSE mode

Add to Windsurf configuration:

```json
{
  "mcpServers": [
    {
      "name": "mcp-resend-email",
      "transport": "sse",
      "url": "http://localhost:3001/sse"
    }
  ]
}
```

## Available Tools

### 1. Send Plain Text Email

```
send_email
```

Parameters:
- `from`: Sender's email address
- `to`: Recipient's email address, multiple recipients can be separated by commas
- `cc`: (Optional) CC email address
- `bcc`: (Optional) BCC email address
- `replyTo`: (Optional) Reply-to email address
- `subject`: Email subject
- `text`: Plain text content of the email

### 2. Send HTML Email

```
send_html_email
```

Parameters:
- `from`: Sender's email address
- `to`: Recipient's email address
- `cc`: (Optional) CC email address
- `bcc`: (Optional) BCC email address
- `replyTo`: (Optional) Reply-to email address
- `subject`: Email subject
- `html`: HTML format content of the email

### 3. Send Email with Attachment

```
send_with_attachment
```

Parameters:
- `from`: Sender's email address
- `to`: Recipient's email address
- `subject`: Email subject
- `text`: (Optional) Plain text content of the email
- `html`: (Optional) HTML format content of the email
- `attachments`: List of attachments, each attachment includes:
  - `filename`: File name
  - `content`: File content (Base64 encoded)
  - `contentType`: File MIME type

### 4. Send Customer Service Email

```
send_customer_service_email
```

Parameters:
- `from`: Sender's email address
- `to`: Recipient's email address
- `subject`: Email subject
- `customerName`: Customer name
- `ticketId`: Ticket ID
- `responseText`: Response content
- `agentName`: Customer service agent name

### 5. Send Marketing Email

```
send_marketing_email
```

Parameters:
- `from`: Sender's email address
- `to`: Recipient's email address
- `subject`: Email subject
- `recipientName`: (Optional) Recipient name
- `campaignTitle`: Marketing campaign title
- `campaignContent`: Marketing campaign content
- `ctaUrl`: Call-to-action URL
- `ctaText`: Call-to-action text
- `unsubscribeUrl`: Unsubscribe URL

### 6. Send Welcome Email

```
send_welcome_email
```

Parameters:
- `from`: Sender's email address
- `to`: Recipient's email address
- `subject`: Email subject
- `firstName`: Recipient's first name
- `product`: Product name
- `welcomeMessage`: Welcome message
- `callToActionUrl`: Call-to-action URL
- `callToActionText`: Call-to-action text

## FAQ

**Q: How do I upgrade to the latest version?**  
A: Just run with npx again. npx will always fetch the latest version automatically.

**Q: How do I view logs or debug issues?**  
A: Logs will be printed to the terminal. For more verbose logs, set the environment variable `NODE_ENV=development`.

## Contributing

Feel free to submit issues or pull requests to help improve MCP Resend Email!

## Contact

For questions, contact the author: gdli <gtq6177@outlook.com>

## License

MIT
