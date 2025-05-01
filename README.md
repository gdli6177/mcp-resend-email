# MCP Resend Email

[English Version](./README.en.md)

这是一个基于Resend API的MCP Server，提供便捷的邮件发送功能。可用于客服回复、营销邮件、通知邮件等场景。

## 功能特点

- 发送纯文本邮件
- 发送HTML格式邮件
- 发送带附件的邮件
- 使用预定义模板发送客服回复邮件
- 使用预定义模板发送营销邮件
- 使用预定义模板发送欢迎邮件

## 使用方法

### 在各种 MCP Client 中使用

#### Windsurf 配置

在 Windsurf 配置文件中添加：

```json
{
  "mcpServers": {
    "mcp-resend-email": {
      "command": "npx",
      "args": ["mcp-resend-email", "--api-key=你的API密钥"]
    }
  }
}
```

#### Cursor 配置

在项目目录下的 `.cursor/mcp.json` 或全局的 `~/.cursor/mcp.json` 中添加：

```json
{
  "mcpServers": {
    "mcp-resend-email": {
      "command": "npx",
      "args": ["mcp-resend-email", "--api-key=你的API密钥"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

#### Claude 配置

在 Claude 的 MCP 配置中添加：

```json
{
  "servers": [
    {
      "name": "mcp-resend-email",
      "command": "npx mcp-resend-email --api-key=你的API密钥"
    }
  ]
}
```

这样可以自动拉取最新版，无需本地安装。

## 配置Windsurf连接到MCP服务器

### stdio 模式

在 Windsurf 配置中添加：

```json
{
  "mcpServers": {
    "mcp-resend-email": {
      "command": "npx",
      "args": ["mcp-resend-email", "--api-key=你的API密钥"]
    }
  }
}
```

### SSE 模式

在 Windsurf 配置中添加：

```json
{
  "mcpServers": {
    "mcp-resend-email": {
      "transport": "sse",
      "url": "http://localhost:3001/sse"
    }
  }
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
- `welcomeMessage`: 欢迎消息
- `callToActionUrl`: 行动号召链接
- `callToActionText`: 行动号召文本

## 常见问题

**问：如何升级到最新版本？**  
答：只需再次使用 npx 运行即可。npx 会自动获取最新版本。

**问：如何获取 Resend API Key？**  
答：您可以通过在 [Resend 官网](https://resend.com) 注册账号来获取 Resend API Key。注册后，在您的控制面板中导航到 API Keys 部分创建新的 API 密钥。更多信息，请访问 [Resend 文档](https://resend.com/docs/api-keys/introduction)。

## 许可证

MIT
