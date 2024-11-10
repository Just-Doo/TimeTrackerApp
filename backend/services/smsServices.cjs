const msgModule = require('coolsms-node-sdk').default

const apiKey = process.env.COOLSMS_APIKEY;
const apiSecret = process.env.COOLSMS_APISECRET;
const messageService = new msgModule(apiKey, apiSecret);

// Function to send SMS
const sendSMS = async (to, from, text) => {
    const message = {
        text, // Message content
        to,   // Recipient's phone number
        from  // Sender's phone number
    };

    try {
        // Send the message
        const response = await messageService.sendMany([message]);
        console.log('Message sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to send message:', error);
        throw error;
    }
};

module.exports = sendSMS;
