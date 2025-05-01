import express from 'express';
import { 
  sendEmail, 
  sendHtmlEmail, 
  sendTemplateEmail, 
  sendBulkEmails, 
  sendWithAttachment 
} from '../services/emailService.js';

const router = express.Router();

/**
 * 发送纯文本邮件
 */
router.post('/send-email', async (req, res) => {
  try {
    const result = await sendEmail(req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('路由处理错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 发送HTML邮件
 */
router.post('/send-html-email', async (req, res) => {
  try {
    const result = await sendHtmlEmail(req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('路由处理错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 发送模板邮件
 */
router.post('/send-template-email', async (req, res) => {
  try {
    const result = await sendTemplateEmail(req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('路由处理错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 批量发送邮件
 */
router.post('/send-bulk-emails', async (req, res) => {
  try {
    const result = await sendBulkEmails(req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('路由处理错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 发送带附件的邮件
 */
router.post('/send-with-attachment', async (req, res) => {
  try {
    const result = await sendWithAttachment(req.body);
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('路由处理错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// MCP函数处理
router.post('/mcp/:functionName', async (req, res) => {
  try {
    const { functionName } = req.params;
    let result;
    
    switch (functionName) {
      case 'send-email':
        result = await sendEmail(req.body);
        break;
      case 'send-html-email':
        result = await sendHtmlEmail(req.body);
        break;
      case 'send-template-email':
        result = await sendTemplateEmail(req.body);
        break;
      case 'send-bulk-emails':
        result = await sendBulkEmails(req.body);
        break;
      case 'send-with-attachment':
        result = await sendWithAttachment(req.body);
        break;
      default:
        return res.status(404).json({ success: false, error: `未知的函数: ${functionName}` });
    }
    
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error('MCP函数处理错误:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export { router as emailRoutes };
