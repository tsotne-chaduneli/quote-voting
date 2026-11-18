function safeText(text: string){
    return text.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
export default safeText;