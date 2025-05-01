import express from 'express';
import dotenv from 'dotenv';
import { emailRoutes } from './routes/email.js';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());

// 路由
app.use('/api', emailRoutes);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'MCP Resend Email服务运行正常' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`MCP Resend Email服务器运行在端口 ${PORT}`);
});

// 导出MCP函数
export const mcp_functions = {
  'send-email': {
    description: '发送简单的纯文本邮件',
    parameters: {
      properties: {
        from: {
          type: 'string',
          description: '发件人邮箱地址'
        },
        to: {
          type: 'string',
          description: '收件人邮箱地址，多个收件人可用逗号分隔'
        },
        cc: {
          type: 'string',
          description: '抄送邮箱地址，多个收件人可用逗号分隔'
        },
        bcc: {
          type: 'string',
          description: '密送邮箱地址，多个收件人可用逗号分隔'
        },
        replyTo: {
          type: 'string',
          description: '回复邮箱地址'
        },
        subject: {
          type: 'string',
          description: '邮件主题'
        },
        text: {
          type: 'string',
          description: '邮件纯文本内容'
        }
      },
      required: ['from', 'to', 'subject', 'text']
    }
  },
  'send-html-email': {
    description: '发送HTML格式的邮件',
    parameters: {
      properties: {
        from: {
          type: 'string',
          description: '发件人邮箱地址'
        },
        to: {
          type: 'string',
          description: '收件人邮箱地址，多个收件人可用逗号分隔'
        },
        cc: {
          type: 'string',
          description: '抄送邮箱地址，多个收件人可用逗号分隔'
        },
        bcc: {
          type: 'string',
          description: '密送邮箱地址，多个收件人可用逗号分隔'
        },
        replyTo: {
          type: 'string',
          description: '回复邮箱地址'
        },
        subject: {
          type: 'string',
          description: '邮件主题'
        },
        html: {
          type: 'string',
          description: 'HTML格式的邮件内容'
        }
      },
      required: ['from', 'to', 'subject', 'html']
    }
  },
  'send-template-email': {
    description: '使用预定义模板发送邮件',
    parameters: {
      properties: {
        from: {
          type: 'string',
          description: '发件人邮箱地址'
        },
        to: {
          type: 'string',
          description: '收件人邮箱地址，多个收件人可用逗号分隔'
        },
        cc: {
          type: 'string',
          description: '抄送邮箱地址，多个收件人可用逗号分隔'
        },
        bcc: {
          type: 'string',
          description: '密送邮箱地址，多个收件人可用逗号分隔'
        },
        replyTo: {
          type: 'string',
          description: '回复邮箱地址'
        },
        subject: {
          type: 'string',
          description: '邮件主题'
        },
        templateName: {
          type: 'string',
          description: '模板名称，如welcome, notification等'
        },
        templateData: {
          type: 'object',
          description: '模板数据，用于填充模板中的变量'
        }
      },
      required: ['from', 'to', 'subject', 'templateName', 'templateData']
    }
  },
  'send-bulk-emails': {
    description: '批量发送邮件',
    parameters: {
      properties: {
        from: {
          type: 'string',
          description: '发件人邮箱地址'
        },
        recipients: {
          type: 'array',
          description: '收件人列表',
          items: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: '收件人邮箱地址'
              },
              data: {
                type: 'object',
                description: '个性化数据'
              }
            }
          }
        },
        subject: {
          type: 'string',
          description: '邮件主题'
        },
        templateName: {
          type: 'string',
          description: '模板名称'
        }
      },
      required: ['from', 'recipients', 'subject', 'templateName']
    }
  },
  'send-with-attachment': {
    description: '发送带附件的邮件',
    parameters: {
      properties: {
        from: {
          type: 'string',
          description: '发件人邮箱地址'
        },
        to: {
          type: 'string',
          description: '收件人邮箱地址，多个收件人可用逗号分隔'
        },
        subject: {
          type: 'string',
          description: '邮件主题'
        },
        text: {
          type: 'string',
          description: '邮件纯文本内容'
        },
        html: {
          type: 'string',
          description: 'HTML格式的邮件内容'
        },
        attachments: {
          type: 'array',
          description: '附件列表',
          items: {
            type: 'object',
            properties: {
              filename: {
                type: 'string',
                description: '文件名'
              },
              content: {
                type: 'string',
                description: '文件内容（Base64编码）'
              },
              contentType: {
                type: 'string',
                description: '文件MIME类型'
              }
            }
          }
        }
      },
      required: ['from', 'to', 'subject', 'attachments']
    }
  }
};
