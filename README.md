# MCP Resend Email

这是一个基于Resend API的MCP Server，提供便捷的邮件发送功能。可用于客服回复、营销邮件、通知邮件等场景。

## 功能特点

- 发送纯文本邮件
- 发送HTML格式邮件
- 发送带附件的邮件
- 使用预定义模板发送客服回复邮件
- 使用预定义模板发送营销邮件
- 使用预定义模板发送欢迎邮件

## 安装

```bash
npm install
```

## 配置

### 环境变量方式

创建`.env`文件并设置以下环境变量：

```
RESEND_API_KEY=your_resend_api_key
PORT=3001
```

### 命令行参数方式

也可以通过命令行参数传递 API 密钥，这在 stdio 模式下特别有用：

```bash
node src/server.js --api-key=your_resend_api_key
```

## 使用方法

### 启动服务器（stdio模式）

```bash
npm start
```

或者使用命令行参数传递 API 密钥：

```bash
npm run start:with-key
```

记得将 `YOUR_API_KEY` 替换为你的实际 API 密钥。

开发模式：

```bash
npm run dev
```

### 启动服务器（SSE模式）

```bash
pnpm run start:http
```

或者开发模式：

```bash
pnpm run dev:http
```

### 自定义端口

```bash
PORT=8080 pnpm run start:http
```

## 配置Cursor连接到MCP服务器

在项目目录下的`.cursor/mcp.json`或全局的`~/.cursor/mcp.json`中添加以下配置：

```json
{
  "mcpServers": {
    "resend-email-stdio": {
      "command": "npm",
      "args": [
        "start"
      ],
      "env": {
        "NODE_ENV": "development"
      }
    },
    "resend-email-sse": {
      "url": "http://localhost:3001/sse"
    }
  }
}
```

## 配置Windsurf连接到MCP服务器

### stdio 模式

在 Windsurf 配置中添加：

```json
{
  "mcpServers": [
    {
      "name": "mcp-resend-email",
      "transport": "stdio",
      "command": "node",
      "args": ["/完整路径/mcp-resend-email/src/server.js", "--api-key=your_resend_api_key"],
      "cwd": "/完整路径/mcp-resend-email"
    }
  ]
}
```

### SSE 模式

在 Windsurf 配置中添加：

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

## 可用工具

### 1. 发送纯文本邮件

```
send_email
```

参数：
- `from`: 发件人邮箱地址
- `to`: 收件人邮箱地址，多个收件人可用逗号分隔
- `cc`: (可选) 抄送邮箱地址
- `bcc`: (可选) 密送邮箱地址
- `replyTo`: (可选) 回复邮箱地址
- `subject`: 邮件主题
- `text`: 邮件纯文本内容

### 2. 发送HTML邮件

```
send_html_email
```

参数：
- `from`: 发件人邮箱地址
- `to`: 收件人邮箱地址
- `cc`: (可选) 抄送邮箱地址
- `bcc`: (可选) 密送邮箱地址
- `replyTo`: (可选) 回复邮箱地址
- `subject`: 邮件主题
- `html`: HTML格式的邮件内容

### 3. 发送带附件的邮件

```
send_with_attachment
```

参数：
- `from`: 发件人邮箱地址
- `to`: 收件人邮箱地址
- `subject`: 邮件主题
- `text`: (可选) 邮件纯文本内容
- `html`: (可选) HTML格式的邮件内容
- `attachments`: 附件列表，每个附件包含：
  - `filename`: 文件名
  - `content`: 文件内容（Base64编码）
  - `contentType`: 文件MIME类型

### 4. 发送客服回复邮件

```
send_customer_service_email
```

参数：
- `from`: 发件人邮箱地址
- `to`: 收件人邮箱地址
- `subject`: 邮件主题
- `customerName`: 客户姓名
- `ticketId`: 工单编号
- `responseText`: 回复内容
- `agentName`: 客服人员姓名

### 5. 发送营销邮件

```
send_marketing_email
```

参数：
- `from`: 发件人邮箱地址
- `to`: 收件人邮箱地址
- `subject`: 邮件主题
- `recipientName`: (可选) 收件人姓名
- `campaignTitle`: 营销活动标题
- `campaignContent`: 营销活动内容
- `ctaUrl`: 行动号召链接
- `ctaText`: 行动号召文本
- `unsubscribeUrl`: 退订链接

### 6. 发送欢迎邮件

```
send_welcome_email
```

参数：
- `from`: 发件人邮箱地址
- `to`: 收件人邮箱地址
- `subject`: 邮件主题
- `firstName`: 收件人名字
- `product`: 产品名称

## 许可证

MIT
