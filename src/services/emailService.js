import { Resend } from 'resend';
import dotenv from 'dotenv';
import * as templates from '../templates/index.js';

// 加载环境变量
dotenv.config();

// 初始化Resend客户端
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 发送纯文本邮件
 * @param {Object} options - 邮件选项
 * @returns {Promise} - 发送结果
 */
export const sendEmail = async (options) => {
  try {
    const { from, to, cc, bcc, replyTo, subject, text } = options;
    
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
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('发送邮件失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 发送HTML邮件
 * @param {Object} options - 邮件选项
 * @returns {Promise} - 发送结果
 */
export const sendHtmlEmail = async (options) => {
  try {
    const { from, to, cc, bcc, replyTo, subject, html } = options;
    
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
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('发送HTML邮件失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 发送模板邮件
 * @param {Object} options - 邮件选项
 * @returns {Promise} - 发送结果
 */
export const sendTemplateEmail = async (options) => {
  try {
    const { from, to, cc, bcc, replyTo, subject, templateName, templateData } = options;
    
    // 获取模板
    const Template = templates[templateName];
    
    if (!Template) {
      throw new Error(`模板 ${templateName} 不存在`);
    }
    
    const { data, error } = await resend.emails.send({
      from,
      to,
      cc,
      bcc,
      reply_to: replyTo,
      subject,
      react: Template(templateData),
    });
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('发送模板邮件失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 批量发送邮件
 * @param {Object} options - 邮件选项
 * @returns {Promise} - 发送结果
 */
export const sendBulkEmails = async (options) => {
  try {
    const { from, recipients, subject, templateName } = options;
    
    // 获取模板
    const Template = templates[templateName];
    
    if (!Template) {
      throw new Error(`模板 ${templateName} 不存在`);
    }
    
    // 准备批量发送数据
    const emails = recipients.map(recipient => ({
      from,
      to: recipient.email,
      subject,
      react: Template(recipient.data),
    }));
    
    // 使用批量发送API
    const { data, error } = await resend.batch.send(emails);
    
    if (error) {
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('批量发送邮件失败:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 发送带附件的邮件
 * @param {Object} options - 邮件选项
 * @returns {Promise} - 发送结果
 */
export const sendWithAttachment = async (options) => {
  try {
    const { from, to, cc, bcc, replyTo, subject, text, html, attachments } = options;
    
    const { data, error } = await resend.emails.send({
      from,
      to,
      cc,
      bcc,
      reply_to: replyTo,
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
      throw error;
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('发送带附件的邮件失败:', error);
    return { success: false, error: error.message };
  }
};
