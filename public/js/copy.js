function copyCode(btn) {
    // 1. Find the parent container for this specific code block
    const container = btn.closest('.code-container');
    
    // 2. Find the <code> element specifically within that container
    const codeElement = container.querySelector('code');
    const code = codeElement.innerText;

    // 3. Write to the clipboard
    navigator.clipboard.writeText(code).then(() => {
        // Provide visual feedback
        const originalText = btn.innerText;
        btn.innerText = "Copied!";
        
        // Change button style (optional)
        btn.classList.add("copied");

        // Reset after 1.5 seconds
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove("copied");
        }, 1500);
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}