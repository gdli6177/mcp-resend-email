import React from 'react';

/**
 * Welcome email template
 * @param {Object} props - Template data
 * @returns {React.Component} - React component
 */
export const welcome = (props) => {
  const { firstName, product } = props;
  
  return React.createElement('div', null, [
    React.createElement('h1', null, `Welcome, ${firstName}!`),
    React.createElement('p', null, `Thank you for using ${product}. We're excited to have you on board.`),
    React.createElement('div', { style: { marginTop: '20px' } }, [
      React.createElement('p', null, 'If you have any questions, please feel free to contact our customer service team.'),
      React.createElement('p', null, 'We hope you enjoy using our service!'),
    ]),
  ]);
};

/**
 * Notification email template
 * @param {Object} props - Template data
 * @returns {React.Component} - React component
 */
export const notification = (props) => {
  const { title, message, actionUrl, actionText } = props;
  
  return React.createElement('div', null, [
    React.createElement('h1', null, title),
    React.createElement('p', null, message),
    actionUrl && actionText ? 
      React.createElement('a', 
        { 
          href: actionUrl,
          style: {
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            marginTop: '15px'
          }
        }, 
        actionText
      ) : null,
  ]);
};

/**
 * Customer service response template
 * @param {Object} props - Template data
 * @returns {React.Component} - React component
 */
export const customerService = (props) => {
  const { customerName, ticketId, responseText, agentName } = props;
  
  return React.createElement('div', null, [
    React.createElement('p', null, `Dear ${customerName},`),
    React.createElement('p', null, `Thank you for submitting your ticket (ID: ${ticketId}).`),
    React.createElement('div', { style: { margin: '20px 0', padding: '15px', borderLeft: '4px solid #ccc' } }, 
      React.createElement('p', null, responseText)
    ),
    React.createElement('p', null, 'If you have any other questions, please feel free to reply to this email.'),
    React.createElement('p', null, 'Best regards,'),
    React.createElement('p', null, `${agentName}`),
    React.createElement('p', null, 'Customer Service Team'),
  ]);
};

/**
 * Marketing email template
 * @param {Object} props - Template data
 * @returns {React.Component} - React component
 */
export const marketing = (props) => {
  const { recipientName, campaignTitle, campaignContent, ctaUrl, ctaText, unsubscribeUrl } = props;
  
  return React.createElement('div', null, [
    recipientName ? React.createElement('p', null, `Dear ${recipientName},`) : null,
    React.createElement('h1', null, campaignTitle),
    React.createElement('div', null, campaignContent),
    React.createElement('a', 
      { 
        href: ctaUrl,
        style: {
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007BFF',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          marginTop: '20px',
          fontWeight: 'bold'
        }
      }, 
      ctaText
    ),
    React.createElement('p', 
      { 
        style: { 
          marginTop: '30px', 
          fontSize: '12px',
          color: '#666'
        } 
      }, 
      [
        'If you no longer wish to receive these emails, please ',
        React.createElement('a', { href: unsubscribeUrl }, 'click here to unsubscribe'),
        '.'
      ]
    ),
  ]);
};
