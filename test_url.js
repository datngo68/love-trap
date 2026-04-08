const config = { senderName: 'A', receiverName: 'B', language: 'vi', themeColor: '#e11d48', autoPlayMusic: true };
const rawString = `${config.senderName}|${config.receiverName}|${config.language}|${config.themeColor}|${config.autoPlayMusic ? '1' : '0'}`;
let encoded = btoa(unescape(encodeURIComponent(rawString)));
encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
console.log('encoded:', encoded);

let decoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
const decodedStr = decodeURIComponent(escape(atob(decoded)));
console.log('decoded:', decodedStr);
console.log('split:', decodedStr.split('|'));
